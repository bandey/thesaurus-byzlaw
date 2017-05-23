import Panel from 'react-bootstrap/lib/Panel';

import React from 'react';

class BptChapter extends React.PureComponent {
  render() {
    if (!this.props.content) {
      return null;
    }

    return (
      <Panel bsStyle="default">
        <span className={this.props.cont_lang}>
          {this.props.content}
        </span>
      </Panel>
    );
  }
};

BptChapter.propTypes = {
  content: React.PropTypes.string,
  cont_lang: React.PropTypes.string
};

BptChapter.defaultProps = {
  cont_lang: 'fontLatin'
};

export default BptChapter;