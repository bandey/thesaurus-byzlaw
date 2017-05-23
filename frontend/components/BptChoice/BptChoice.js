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
    if (this.props.itemsList.length < 1) {
      return null;
    }

    const t = this.props.t;

    if (this.props.item) {
      let panelHeader = (
        <div>
          <span className="fontLatin">{t(this.props.caption)} : </span>
          <span className={this.props.item.lang}>
            {t(this.props.item.name)}
          </span>
        </div>
      );

      return (
        <a href='/' onClick={this.generateClickHandler(null)}>
          <Panel bsStyle="info" header={panelHeader} />
        </a>
      );
    };

    let listHeader = (
      <span className="fontLatin">{t(this.props.caption)}</span>
    );

    let listItems = this.props.itemsList.map(item => (
      <NavItem key={item._id} href='/' onClick={this.generateClickHandler(item)}>
        <span className={item.lang}>
          {t(item.name)}
        </span>
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
    lang: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
  onItemClick: React.PropTypes.func,
  t: React.PropTypes.func,
};

export default BptChoice;