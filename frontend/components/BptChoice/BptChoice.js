import TextBlock from '../TextBlock/TextBlock';

import Panel from 'react-bootstrap/lib/Panel';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import React from 'react';

class BptChoice extends React.PureComponent {
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
      let panelHeader = (
        <div>
          <TextBlock font="modern">{t(this.props.caption) + " : "}</TextBlock>
          <TextBlock font={this.props.item.font}>
            {t(this.props.item.name)}
          </TextBlock>
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

    let listItems = this.props.itemsList.map(item => (
      <NavItem key={item._id} href='/' onClick={this.generateClickHandler(item)}>
        <TextBlock font={item.font}>
          {t(item.name)}
        </TextBlock>
      </NavItem>
    ));

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

BptChoice.propTypes = {
  caption: React.PropTypes.string.isRequired,
  itemsList: React.PropTypes.arrayOf(React.PropTypes.object),
  item: React.PropTypes.shape({
    font: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
  onItemClick: React.PropTypes.func,
  t: React.PropTypes.func,
};

export default BptChoice;