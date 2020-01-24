import TextBlock from '../TextBlock/TextBlock';

import Panel from 'react-bootstrap/lib/Panel';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import React from 'react';
import { translate } from 'react-i18next';

class AdditionsBoard extends React.PureComponent {
  render() {
    if (!this.props.visible) {
      return null;
    }

    const t = this.props.t;

    const additionsHeader = (
      <div>
        <TextBlock font="modern">{t('Additions')}</TextBlock>
      </div>
    );

    const additionsItems = [
      (
        <NavItem key={1} href={t('$Lexicon url')}>
          <TextBlock font="modern">{t('$Lexicon name')}</TextBlock>
        </NavItem>
      ),
    ];

    return (
      <Panel header={additionsHeader}>
        <Nav bsStyle="pills" stacked>
          {additionsItems}
        </Nav>
      </Panel>
    );
  }
};

AdditionsBoard.propTypes = {
  visible: React.PropTypes.bool,
  t: React.PropTypes.func,
};

let waitLoading = false; // try true after refactoring of i18next.addResources
if (typeof window === 'undefined') {
  waitLoading = false; // waiting is not needed on server side
}

export default translate(['common'], { wait: waitLoading })(AdditionsBoard);
