var test = require('tape-catch'); // use tape-catch in common test cases
// var test = require('tape'); // use pure tape in case of unexpected exeption to locate it source

// 'npm test' in package.json pipes output to tap-notify and tap-dot => output must be raw tap
// 'node tests/test.js' => output can be decorated by tap-diff
if (!process.env.npm_package_name) { // was launched not from 'npm run'
  var tapDiff = require('tap-diff');
  test.createStream().pipe(tapDiff()).pipe(process.stdout);
}

var sinon = require('sinon');

var BptSource = require('../../models/BptSource');

var conf = require('../../config/config.js');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // to avoid warning about deprecation

test('models/BptSource', function (t) { // Simply show title message
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

  exemplar = new BptSource();
  exemplar.validate(function (err) {
    t.ok(err, 'return err on empty input');
  });

  exemplar = new BptSource({ name_en: 'latin', lang: 'fontLat', posit: 1 });
  exemplar.validate(function (err) {
    t.ok(err, 'return err on incomplete input');
  });

  exemplar = new BptSource({ name_en: 'latin', name_ru: 'латинский', lang: 'fontLat', posit: 1 });
  exemplar.validate(function (err) {
    t.error(err, 'return no err on normal input');
  });
});  

test('.getListOverall', { skip: true }, function (t) { // requires Mongoose connection
  t.plan(4);

  BptSource.getListOverall(function (err, records) {
    t.error(err, 'return no err');
    t.ok(records, 'return not null');
    t.equal(typeof records, 'object', 'return object');
    t.ok(records.length > 0, 'array length is positive');
  });
});

test('.getListForLang', { skip: false }, function (t) {
  t.test('..test', function (t) {
    t.plan(4);

    var dataRaw = [ // emulates raw data from DB
      { _id: 1, posit: 1, lang: 'fontLat', name_en: 'latin', name_ru: 'латинский' },
      { _id: 2, posit: 2, lang: 'fontLat', name_en: 'slavic', name_ru: 'славянский' },
    ];
    var dataEn = [ // data filtered for en language
      { _id: 1, lang: 'fontLat', name: 'latin' },
      { _id: 2, lang: 'fontLat', name: 'slavic' },
    ];
    var dataRu = [ // data filtered for ru language
      { _id: 1, lang: 'fontLat', name: 'латинский' },
      { _id: 2, lang: 'fontLat', name: 'славянский' },
    ];

    sinon.stub(BptSource, 'getListOverall').callsFake(function (cb) {
      t.pass('call getListOverall');
      return cb(null, dataRaw); // return emulation of data from DB
    });

    BptSource.getListForLang('en')
      .then(function (records) {
        t.deepEqual(records, dataEn, 'result en array is correct');
      })
      .catch(function (err) {
        t.error(err, 'return no err for en');
      });

    BptSource.getListForLang('ru')
      .then(function (records) {
        t.deepEqual(records, dataRu, 'result ru array is correct');
      })
      .catch(function (err) {
        t.error(err, 'return no err for ru');
      });
  });
  
  t.test('..teardown', function (t) {
    BptSource.getListOverall.restore(); // remove sinon.stub
    t.end();
  });
});
