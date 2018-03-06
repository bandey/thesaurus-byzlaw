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

import BptChoice from './../../../frontend/components/BptChoice/BptChoice';

import NavItem from 'react-bootstrap/lib/NavItem';

// Special mock class to replace Panel imported in BptChoice
class MockPanel extends React.PureComponent {
  render() {
    return (<div>{this.props.children}</div>);
  }
};

// We replace Panel with mock only for demonstration (original Panel works well)
BptChoice.__Rewire__('Panel', MockPanel);
// BptChoice.__ResetDependency__('Panel');

test('frontend/components/BptChoice', (troot) => {
  troot.test('.render content', (t) => {
    t.plan(5);

    let calledCounter = 0;
    const i18nT = (s) => { // simplest stub
      calledCounter++;
      return s; // it can have more complex logic
    };

    const optionsList = [
      { _id: 1, name: 'first', font: 'modern' },
      { _id: 2, name: 'second', font: 'modern' }
    ];
    const optionItem = null;

    const selectOption = (option) => {
      t.pass('click on item calls onItemClick');
    };

    let rendered = shallow(<BptChoice t={i18nT} caption="Choice" itemsList={optionsList} item={optionItem} onItemClick={selectOption} />);
    // console.log(rendered.debug());

    let panel = rendered.find(MockPanel);
    t.ok(panel.exists(), 'contain Panel');
    t.equal(panel.prop('bsStyle'), 'primary', 'with correct bsStyle');

    t.ok(calledCounter, 'i18n.t() was called'); // sinon.stub gives more control

    let navItems = rendered.find(NavItem);
    t.equal(navItems.length, 2, 'count of NavItems is correct');
    navItems.first().simulate('click', { preventDefault: () => {} });
  });
});