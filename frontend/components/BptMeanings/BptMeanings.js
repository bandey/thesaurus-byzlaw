import TextBlock from '../TextBlock/TextBlock';

import Panel from 'react-bootstrap/lib/Panel';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import styles from './styles.css';

import React from 'react';
import { translate } from 'react-i18next';

class BptMeanings extends React.PureComponent {
  render() {
    if (!this.props.itemsList.length) {
      return null;
    }

    const t = this.props.t;

    let listHeader = (
      <div>
        <TextBlock font="modern">{t('Meanings')}</TextBlock>
      </div>
    );

    let listItems = this.props.itemsList.map(item => (
      <div key={item._id} className={styles.MeaningRow}>
        <TextBlock font={item.font}>{item.name}</TextBlock>
      </div>
    ));

    return (
      <Panel bsStyle="default" header={listHeader}>
        {listItems}
      </Panel>
    );
  }
};

BptMeanings.propTypes = {
  itemsList: React.PropTypes.arrayOf(React.PropTypes.object),
  t: React.PropTypes.func,
};

let waitLoading = false; // try true after refactoring of i18next.addResources
if (typeof window === 'undefined') {
  waitLoading = false; // waiting is not needed on server side
}

export default translate(['common'], { wait: waitLoading })(BptMeanings);
