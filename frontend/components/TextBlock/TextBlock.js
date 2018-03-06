import React from 'react';

class TextBlock extends React.PureComponent {
  render() {
    if (!this.props.children) {
      return null;
    }

    let fontClass = 'fontModern';
    if (this.props.font === 'medieval') {
      fontClass = 'fontMedieval';
    } else if (this.props.font !== 'modern') {
      fontClass = this.props.font;
    };

    return (
      <span className={fontClass}>{this.props.children}</span>
    );
  }
};

TextBlock.propTypes = {
  children: React.PropTypes.string,
  font: React.PropTypes.string
};

TextBlock.defaultProps = {
  font: 'modern'
};

export default TextBlock;