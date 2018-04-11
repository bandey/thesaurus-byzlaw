var test = require('tape-catch'); // use tape-catch in common test cases
// var test = require('tape'); // use pure tape in case of unexpected exeption to locate it source

// 'npm test' in package.json pipes output to tap-notify and tap-dot => output must be raw tap
// 'node tests/test.js' => output can be decorated by tap-diff
if (!process.env.npm_package_name) { // was launched not from 'npm run'
  var tapDiff = require('tap-diff');
  test.createStream().pipe(tapDiff()).pipe(process.stdout);
}

// var sinon = require('sinon');

var BptMeaning = require('../../models/BptMeaning');

var conf = require('../../config/config.js');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // to avoid warning about deprecation

test('models/BptMeaning', function (t) { // Simply show title message
  t.end();
});

// After mongoose.connect script does not exit after all tests without this onFinish handler
test.onFinish(function () { 
  process.exit(0);
});

test('.setup Mongoose', { skip: true }, function (t) { // setup Mongoose connection
  mongoose.connection.on('error', function (err) {
    t.end(err);
    process.exit(0);
  });

  mongoose.connection.once('open', function () {
    t.end(); // OK
  });

  mongoose.connect(conf.get('dbConnect'), { autoIndex: conf.get('dbAutoIndex') });
});

test('.model validations', { skip: false }, function (t) {
  t.plan(3);

  var exemplar;

  exemplar = new BptMeaning();
  exemplar.validate(function (err) {
    t.ok(err, 'return err on empty input');
  });

  exemplar = new BptMeaning({ posit: 1, name_en: 'lex' });
  exemplar.validate(function (err) {
    t.ok(err, 'return err on incomplete input');
  });

  exemplar = new BptMeaning({ parent_id: 1, posit: 1, font: 'modern', name_en: 'lex', name_ru: 'закон' });
  exemplar.validate(function (err) {
    t.error(err, 'return no err on normal input');
  });
});  
