import TextBlock from '../TextBlock/TextBlock';

import Panel from 'react-bootstrap/lib/Panel';

import React from 'react';

class BptChapter extends React.PureComponent {
  render() {
    if (!this.props.content) {
      return null;
    }

    return (
      <Panel bsStyle="default">
        <TextBlock font={this.props.font}>
          {this.props.content}
        </TextBlock>
      </Panel>
    );
  }
};

BptChapter.propTypes = {
  content: React.PropTypes.string,
  font: React.PropTypes.string
};

BptChapter.defaultProps = {
  font: 'modern'
};

export default BptChapter;