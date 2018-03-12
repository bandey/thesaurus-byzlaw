var express = require('express');
var conf = require('../config/config.js');
var debug = require('debug')('serv:app');
var logger = require('morgan');
var path = require('path');
var compression = require('compression');
var favicon = require('serve-favicon');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

var i18next = require('i18next');
var i18nMiddleware = require('i18next-express-middleware');
var i18nFSBackend = require('i18next-node-fs-backend');

// DB connect
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // to avoid warning about deprecation
if (conf.get('dbDebug')) {
  mongoose.set('debug', true);
}
mongoose.connection.on('error', function (err) {
  console.error('Mongo connection ERR', err);
  process.exit();
});
mongoose.connection.once('open', function () {
  debug('Mongo connection OK');
});
// options.server.socketOptions = options.replset.socketOptions = { keepAlive: 120 };
mongoose.connect(conf.get('dbConnect'), { autoIndex: conf.get('dbAutoIndex') });

var app = express();

// Security setup
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// i18n setup
i18next.use(i18nMiddleware.LanguageDetector).use(i18nFSBackend).init({
  debug: conf.get('i18nDebug'),
  whitelist: ['en', 'ru'], // allowed languages
  detection: { // settings for LanguageDetector
    order: ['path', 'header'], // order and from where user language should be detected
    lookupFromPathIndex: 0, // index of chunk from path
  },
  ns: [ // namespaces - separate json files
    'common'
  ],
  defaultNS: 'common',
  backend: { // settings for FSBackend
    loadPath: './frontend/i18n/locales/{{lng}}/{{ns}}.json',
    jsonIndent: 2
  },
}, function (err, t) { // callback after init
  if (err) {
    debug(String(err));
    process.exit();
  }
  debug('i18next init OK');
});

// Middlewares
if (conf.get('log') !== 'none') {
  app.use(logger(conf.get('log')));
}

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
app.use(compression({ threshold: '5kb' })); // compress answers more than 5kb
app.use(express.static(path.join(__dirname, '../public')));

// Mount i18n moddleware
app.use(i18nMiddleware.handle(i18next, {
  // ignoreRoutes: ["/locales"],
  removeLngFromUrl: true, // remove language chunk from path for next middlewares
}), function (req, res, next) { // my middleware after i18next
  debug('Lang: ' + req.language + ' ' + req.i18nextLookupName);
  if (req.language != 'dev') { // allowed language detected
    if (req.i18nextLookupName == 'path') { // taken from path => ok
      return next();
    } else { // taken from header => redirect
      return res.redirect(307, '/' + req.language + req.originalUrl);
    }
  } else { // allowed language not detected
    return res.redirect(307, '/en' + req.originalUrl);
  }
});

// Routers
app.use('/', require('../routes/index'));
app.use('/sources', require('../routes/sources'));
app.use('/keywords', require('../routes/keywords'));
app.use('/chapters', require('../routes/chapters'));
app.use('/lexemes', require('../routes/lexemes'));
app.use('/forms', require('../routes/forms'));
app.use('/syntagmas', require('../routes/syntagmas'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  if ((err.status != 404) || (conf.get('env') !== 'production')) {
    // in production dont pollute log with 404 stacktraces
    console.error(err);
  }

  res.status(err.status || 500);

  if (req.accepts('html')) {
    return res.render('error', {
      message: err.message,
      error: conf.get('env') === 'development' ? err : {}
    });
  } else {
    return res.json({
      message: err.message
    });
  }
});

module.exports = app;