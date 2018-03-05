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

import TextBlock from './../../../frontend/components/TextBlock/TextBlock';

test('frontend/components/TextBlock', (troot) => {
  troot.test('.render empty content', (t) => {
    t.plan(1);

    let rendered = shallow(<TextBlock />);
    // console.log(rendered.debug());

    t.ok(rendered.isEmptyRender(), 'is empty');
  });

  troot.test('.render content with empty font', (t) => {
    t.plan(3);

    let rendered = shallow(<TextBlock>Hello</TextBlock>);
    // console.log(rendered.debug());

    let span = rendered.find('span');
    t.ok(span.exists(), 'contain span');
    t.ok(span.hasClass('fontModern'), 'with correct class');
    t.equal(span.text(), 'Hello', 'with correct text');
  });

  troot.test('.render content with modern font', (t) => {
    t.plan(3);

    let rendered = shallow(<TextBlock font='modern'>Hello</TextBlock>);
    // console.log(rendered.debug());

    let span = rendered.find('span');
    t.ok(span.exists(), 'contain span');
    t.ok(span.hasClass('fontModern'), 'with correct class');
    t.equal(span.text(), 'Hello', 'with correct text');
  });

  troot.test('.render content with medieval font', (t) => {
    t.plan(3);

    let rendered = shallow(<TextBlock font='mediaval'>Hello</TextBlock>);
    // console.log(rendered.debug());

    let span = rendered.find('span');
    t.ok(span.exists(), 'contain span');
    t.ok(span.hasClass('fontMedieval'), 'with correct class');
    t.equal(span.text(), 'Hello', 'with correct text');
  });

  troot.test('.render content with other font', (t) => {
    t.plan(3);

    let rendered = shallow(<TextBlock font='fontLat'>Hello</TextBlock>);
    // console.log(rendered.debug());

    let span = rendered.find('span');
    t.ok(span.exists(), 'contain span');
    t.ok(span.hasClass('fontLat'), 'with correct class');
    t.equal(span.text(), 'Hello', 'with correct text');
  });
});