var test = require('tape-catch'); // use tape-catch in common test cases
// var test = require('tape'); // use pure tape in case of unexpected exeption to locate it source

// 'npm test' in package.json pipes output to tap-notify and tap-dot => output must be raw tap
// 'node tests/test.js' => output can be decorated by tap-diff
if (!process.env.npm_package_name) { // was launched not from 'npm run'
  var tapDiff = require('tap-diff');
  test.createStream().pipe(tapDiff()).pipe(process.stdout);
}

// var sinon = require('sinon');

import React from 'react';
import { shallow } from 'enzyme';

import BptChapter from './../../../frontend/components/BptChapter/BptChapter';

test('frontend/components/BptChapter', (troot) => {
  troot.test('render content', (t) => {
    t.plan(5);

    let rendered = shallow(<BptChapter content='Hello' />);
    // console.log(rendered.debug());

    let panel = rendered.find('Panel');
    t.ok(panel.exists(), 'contain Panel');
    t.equal(panel.prop('bsStyle'), 'default', 'with correct bsStyle');

    let span = rendered.find('span');
    t.ok(span.exists(), 'contain span');
    t.ok(span.hasClass('fontLatin'), 'with correct class');
    t.equal(span.text(), 'Hello', 'with correct text');
  });
});