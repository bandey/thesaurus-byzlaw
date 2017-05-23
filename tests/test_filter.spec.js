var test = require('tape-catch'); // use tape-catch in common test cases
// var test = require('tape'); // use pure tape in case of unexpected exeption to locate it source

// 'npm test' in package.json pipes output to tap-notify and tap-dot => output must be raw tap
// 'node tests/test.js' => output can be decorated by tap-diff
if (!process.env.npm_package_name) { // was launched not from 'npm run'
  var tapDiff = require('tap-diff');
  test.createStream().pipe(tapDiff()).pipe(process.stdout);
}

var funk = function (parentId) {
  var filter;
  if (parentId) {
    if (/\D/.test(parentId)) {
      return 'E';
    }
    filter = parseInt(parentId, 10);
  } else {
    filter = '{}';
  }
  return filter;
};

test('Filter', function (t) {
  t.equal(funk(), '{}', '()');
  t.equal(funk(''), '{}', '""');
  t.equal(funk(' '), 'E', '" "');
  t.equal(funk('true'), 'E', '"true"');
  t.equal(funk('false'), 'E', '"false"');
  t.equal(funk('null'), 'E', '"null"');
  t.equal(funk('0'), 0, '"0"');
  t.equal(funk('-1'), 'E', '"-1"');
  t.equal(funk('1'), 1, '"1"');
  t.equal(funk('-1.5'), 'E', '"-1.5"');
  t.equal(funk('1.5'), 'E', '"1.5"');
  t.equal(funk('NaN'), 'E', '"NaN"');
  t.equal(funk('ab'), 'E', '"ab"');
  t.equal(funk('a1'), 'E', '"a1"');
  t.equal(funk('1a'), 'E', '"1a"');
  t.end();
});
