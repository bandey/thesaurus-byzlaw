import TextBlock from '../TextBlock/TextBlock';

import Panel from 'react-bootstrap/lib/Panel';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import React from 'react';
import { translate } from 'react-i18next';

class BptEntity extends React.PureComponent {
  generateClickHandler(item) {
    return e => {
      e.preventDefault();
      this.props.onItemClick(item);
    }
  }

  render() {
    if (!this.props.itemsList.length) {
      return null;
    }

    const t = this.props.t;

    if (this.props.item) {
      let item = this.props.item

      let annexBlock = item.annex ? 
          (<TextBlock font="modern">{" — " + item.annex}</TextBlock>) : null;

      let panelHeader = (
        <div>
          <TextBlock font="modern">{t(this.props.caption) + " : "}</TextBlock>
          <TextBlock font={item.font}>{item.name}</TextBlock>
          {annexBlock}
        </div>
      );

      return (
        <a href='/' onClick={this.generateClickHandler(null)}>
          <Panel bsStyle="info" header={panelHeader} />
        </a>
      );
    };

    let listHeader = (
      <div>
        <TextBlock font="modern">{t(this.props.caption)}</TextBlock>
      </div>
    );

    let listItems = this.props.itemsList.map(item => {
      let annexBlock = item.annex ? 
          (<TextBlock font="modern">{" — " + item.annex}</TextBlock>) : null;

      return (
        <NavItem key={item._id} href='/' onClick={this.generateClickHandler(item)}>
          <TextBlock font={item.font}>{item.name}</TextBlock>
          {annexBlock}
        </NavItem>
      );
    });

    return (
      <div>
        <Panel bsStyle="primary" header={listHeader}>
          <Nav bsStyle="pills" stacked>
            {listItems}
          </Nav>
        </Panel>
      </div>
    );
  }
};

BptEntity.propTypes = {
  caption: React.PropTypes.string.isRequired,
  itemsList: React.PropTypes.arrayOf(React.PropTypes.object),
  item: React.PropTypes.shape({
    font: React.PropTypes.string,
    name: React.PropTypes.string,
    annex: React.PropTypes.string
  }),
  onItemClick: React.PropTypes.func,
  t: React.PropTypes.func,
};

let waitLoading = false; // try true after refactoring of i18next.addResources
if (typeof window === 'undefined') {
  waitLoading = false; // waiting is not needed on server side
}

export default translate(['common'], { wait: waitLoading })(BptEntity);
