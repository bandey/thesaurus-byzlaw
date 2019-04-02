import Modal from 'react-bootstrap/lib/Modal';

import React from 'react';
import { translate } from 'react-i18next';

class InfoBoard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: true,
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    const t = this.props.t;

    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Thesaurus Byzantine Law and Acts')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('Thesaurus Byzantine Law and Acts')}</Modal.Body>
      </Modal>
    );
  }
};

let waitLoading = false; // try true after refactoring of i18next.addResources
if (typeof window === 'undefined') {
  waitLoading = false; // waiting is not needed on server side
}

export default translate(['common'], { wait: waitLoading })(InfoBoard);