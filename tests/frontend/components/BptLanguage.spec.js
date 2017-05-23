var test = require('tape-catch'); // use tape-catch in common test cases
// var test = require('tape'); // use pure tape in case of unexpected exeption to locate it source

// 'npm test' in package.json pipes output to tap-notify and tap-dot => output must be raw tap
// 'node tests/test.js' => output can be decorated by tap-diff
if (!process.env.npm_package_name) { // was launched not from 'npm run'
  var tapDiff = require('tap-diff');
  test.createStream().pipe(tapDiff()).pipe(process.stdout);
}

// var sinon = require('sinon');

// BEG jsdom
var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
// END jsdom

import React from 'react';
import { shallow, mount } from 'enzyme';

import BptLanguage from './../../../frontend/components/BptLanguage/BptLanguage';

import Dropdown from 'react-bootstrap/lib/Dropdown';

test('frontend/components/BptLanguage', (troot) => {
  troot.test('render content', (t) => {
    t.plan(6);

    let language = 'en';

    const i18n = {
      language: language,
      changeLanguage: (newLang) => {}
    };

    let calledCounter = 0;
    const i18nT = (s) => { // simplest stub
      calledCounter++;
      return s; // it can have more complex logic
    };

    let rendered = shallow(<BptLanguage language={language} i18n={i18n} t={i18nT} />);
    // console.log(rendered.debug());

    let dropDown = rendered.find(Dropdown);
    t.ok(dropDown.exists(), 'contain Dropdown');
    t.equal(dropDown.prop('id'), 'languageSelector', 'with correct id');
    t.ok(dropDown.hasClass('components-BptLanguage-dropDownList'), 'with correct class'); // css-modules

    t.ok(calledCounter, 'i18n.t() was called'); // sinon.stub gives more control

    let glyphIcon = rendered.find('Glyphicon');
    t.ok(glyphIcon.exists(), 'contain Glyphicon');
    t.equal(glyphIcon.prop('glyph'), 'globe', 'with globe icon');
  });

  troot.test('mounting with props.language differed from i18n.language', (t) => {
    t.plan(1);

    let language = 'en';
    let languageNew = 'ru';

    const i18n = {
      language: language,
      changeLanguage: (newLang) => {
        if (newLang === languageNew) {
          t.pass('calls i18n.changeLanguage()');
        }
      }
    };

    const i18nT = (s) => s;

    let rendered = mount(<BptLanguage language={languageNew} i18n={i18n} t={i18nT} />);
    // console.log(rendered.debug());
    // componentDidMount => i18next.changeLanguage
  });

  troot.test('changing props.language', (t) => {
    t.plan(1);

    let language = 'en';
    let languageNew = 'ru';

    const i18n = {
      language: language,
      changeLanguage: (newLang) => {
        if (newLang === languageNew) {
          t.pass('calls i18n.changeLanguage()');
        }
      }
    };

    const i18nT = (s) => s;

    let rendered = mount(<BptLanguage language={language} i18n={i18n} t={i18nT} />);
    // console.log(rendered.debug());

    rendered.setProps({ language: languageNew }); // => componentDidUpdate => i18next.changeLanguage

    // Is unmounting of rendered necessary?
    // rendered.unmount(); // call unmount() in this context cause error
    // troot.test('teardown', (t) => {...}) // may be try to move unmount() into another test task
  });
});