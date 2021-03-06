import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

import emblem from './emblem.png';

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
          <Modal.Title>{t('$Thesaurus title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}}>
          <img 
            src={emblem} 
            alt={t('Double-headed eagle')}
            width="140px"
            height="175px"
            className="hidden-xs"
            style={{float:'left'}}
          />
          <p><b>{t('Demoversion')}</b></p>
          <p>{t('$Research project')}</p>
          <p><a href={t('$Site url')} target="_blank">{t('$Site short url')}</a></p>
          <p>{t('$Leader and Developer')}</p>
          <p>{t('$RAS-IWH')}</p>
          <p>{t('$Moscow Year')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={this.handleClose}>{t('Continue')}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

let waitLoading = false; // try true after refactoring of i18next.addResources
if (typeof window === 'undefined') {
  waitLoading = false; // waiting is not needed on server side
}

export default translate(['common'], { wait: waitLoading })(InfoBoard);