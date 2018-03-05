import React from 'react';

class TextBlock extends React.PureComponent {
  render() {
    if (!this.props.children) {
      return null;
    }

    return (
      <span className={this.props.font}>
        {this.props.children}
      </span>
    );
  }
};

TextBlock.propTypes = {
  children: React.PropTypes.string,
  font: React.PropTypes.string
};

TextBlock.defaultProps = {
  font: 'fontModern'
};

export default TextBlock;