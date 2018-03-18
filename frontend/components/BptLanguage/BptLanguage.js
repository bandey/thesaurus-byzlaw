import styles from './styles.css';

import i18n from '../../i18n/i18n'; // initialized in main

import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

class BptLanguage extends React.PureComponent {
  _selectLanguage(i18next, newLang) {
    if ((newLang) && (i18next.language !== newLang) && (i18n.languages.includes(newLang))) {
      console.log('BptLanguage: Change lang');
      i18next.changeLanguage(newLang);
      this.props.onChange(newLang); // to reload list of sources and lexemes in store
    }
  }

  componentDidMount() {
    console.log('BptLanguage: DidMount ' + this.props.language);
    this._selectLanguage(this.props.i18n, this.props.language); // this.props.i18n is i18next
  }

  componentDidUpdate(prevProps) {
    console.log('BptLanguage: DidUpdate ' + this.props.i18n.language + '->' + this.props.language);
    this._selectLanguage(this.props.i18n, this.props.language); // this.props.i18n is i18next
  }

  render() {
    const t = this.props.t;

    return (
      <Dropdown id="languageSelector" className={styles.dropDownButton}>
        <Dropdown.Toggle bsStyle="info" block>
          <Glyphicon glyph="globe" />&nbsp; {t('Language')} &nbsp;
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.dropDownList}>
          <LinkContainer to="/en">
            <MenuItem eventKey="en">english</MenuItem>
          </LinkContainer>
          <LinkContainer to="/ru">
            <MenuItem eventKey="ru">русский</MenuItem>
          </LinkContainer>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
};

export default BptLanguage;