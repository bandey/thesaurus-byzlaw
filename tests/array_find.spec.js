var test = require('tape-catch'); // use tape-catch in common test cases
// var test = require('tape'); // use pure tape in case of unexpected exeption to locate it source

// 'npm test' in package.json pipes output to tap-notify and tap-dot => output must be raw tap
// 'node tests/test.js' => output can be decorated by tap-diff
if (!process.env.npm_package_name) { // was launched not from 'npm run'
  var tapDiff = require('tap-diff');
  test.createStream().pipe(tapDiff()).pipe(process.stdout);
}

import arrayFind from 'array.prototype.find'; // polyfill for IE

var data = [
  { _id: 1, font: 'modern', name: 'greek' },
  { _id: 2, font: 'modern', name: 'latin' },
  { _id: 3, font: 'modern', name: 'slavic' },
];

var oldSource = { _id: 2, font: 'modern', name: 'latin' };

test('Array.find()', function (t) {
  t.plan(1);
  var newSource = arrayFind(data, record => record._id === oldSource._id);
  t.deepEqual(newSource, oldSource, 'find correct result');
});