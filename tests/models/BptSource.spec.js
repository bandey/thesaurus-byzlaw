var test = require('tape-catch'); // use tape-catch in common test cases
// var test = require('tape'); // use pure tape in case of unexpected exeption to locate it source

// 'npm test' in package.json pipes output to tap-notify and tap-dot => output must be raw tap
// 'node tests/test.js' => output can be decorated by tap-diff
if (!process.env.npm_package_name) { // was launched not from 'npm run'
  var tapDiff = require('tap-diff');
  test.createStream().pipe(tapDiff()).pipe(process.stdout);
}

// var sinon = require('sinon');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // to avoid warning about deprecation

var BptSource = require('./../../models/BptSource');

test('models/BptSource', function (troot) {
  troot.test('model validations', function (t) {
    t.plan(3);

    var exemplar;

    exemplar = new BptSource();
    exemplar.validate(function (err) {
      t.ok(err, 'return err on empty input');
    });

    exemplar = new BptSource({ lang: 'fontLat', posit: 1 });
    exemplar.validate(function (err) {
      t.ok(err, 'return err on wrong input');
    });

    exemplar = new BptSource({ name: 'латинский', lang: 'fontLat', posit: 1 });
    exemplar.validate(function (err) {
      t.error(err, 'return no err on normal input');
    });
  });  
});