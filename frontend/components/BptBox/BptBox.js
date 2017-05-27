import { selectSource } from '../../stores/Sources/SourcesActions';
import { selectKeyword } from '../../stores/Keywords/KeywordsActions';
import { selectOptionOfKeyword } from '../../stores/OptionsOfKeyword/OptionsOfKeywordActions';
import { selectChapter } from '../../stores/Chapters/ChaptersActions';
import { selectLexeme } from '../../stores/Lexemes/LexemesActions';
import { selectOptionOfLexeme } from '../../stores/OptionsOfLexeme/OptionsOfLexemeActions';
import { selectForm } from '../../stores/Forms/FormsActions';
import { selectSyntagma } from '../../stores/Syntagmas/SyntagmasActions';
import { reloadSourcesList } from '../../stores/Sources/SourcesActions';

import BptLanguage from '../BptLanguage/BptLanguageTranslation';
import BptEntity from '../BptEntity/BptEntity';
import BptChoice from '../BptChoice/BptChoiceTranslation';
import BptChapter from '../BptChapter/BptChapter';

import styles from './styles.css';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import React from 'react';
import { connect as connectReactRedux } from 'react-redux';
import { translate } from 'react-i18next';

class BptBox extends React.PureComponent {
  constructor(props) {
    super(props);
    // This binding is necessary to make 'this' work in the callback
    this.clickSource = this.clickSource.bind(this);
    this.clickKeyword = this.clickKeyword.bind(this);
    this.clickOptionOfKeyword = this.clickOptionOfKeyword.bind(this);
    this.clickChapter = this.clickChapter.bind(this);
    this.clickLexeme = this.clickLexeme.bind(this);
    this.clickOptionOfLexeme = this.clickOptionOfLexeme.bind(this);
    this.clickForm = this.clickForm.bind(this);
    this.clickSyntagma = this.clickSyntagma.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }

  // componentDidMount() {
  //   this.props.dispatch(loadSourcesList(this.props.params.language));
  // }

  clickSource(source) {
    this.props.dispatch(selectSource(source, this.props.params.language));
  }

  clickKeyword(keyword) {
    this.props.dispatch(selectKeyword(keyword, this.props.params.language));
  }

  clickOptionOfKeyword(option) {
    this.props.dispatch(selectOptionOfKeyword(option, this.props.params.language));
  }

  clickChapter(chapter) {
    this.props.dispatch(selectChapter(chapter, this.props.params.language));
  }

  clickLexeme(lexeme) {
    this.props.dispatch(selectLexeme(lexeme, this.props.params.language));
  }

  clickOptionOfLexeme(option) {
    this.props.dispatch(selectOptionOfLexeme(option, this.props.params.language));
  }

  clickForm(form) {
    this.props.dispatch(selectForm(form, this.props.params.language));
  }

  clickSyntagma(syntagma) {
    this.props.dispatch(selectSyntagma(syntagma, this.props.params.language));
  }

  onChangeLanguage(language) {
    this.props.dispatch(reloadSourcesList(language));
  }

  render() {
    const t = this.props.t;

    return (
      <div className="bptBox">
        <Row className={styles.headerRow}>
          <Col md={9} componentClass='header'>
            <h1 className="h4">{t('Thesaurus Byzantine Law and Acts')}</h1>
          </Col>
          <Col md={3} className={styles.LanguageCol}>
            <BptLanguage language={this.props.params.language} onChange={this.onChangeLanguage} />
          </Col>
        </Row>
        <BptEntity caption="Source" itemsList={this.props.sourcesList} item={this.props.source} onItemClick={this.clickSource} />
        <BptEntity caption="Keyword" itemsList={this.props.keywordsList} item={this.props.keyword} onItemClick={this.clickKeyword} />
        <BptChoice caption="Choice" itemsList={this.props.optionsOfKeywordList} item={this.props.optionOfKeyword} onItemClick={this.clickOptionOfKeyword} />
        <BptEntity caption="Chapter" itemsList={this.props.chaptersList} item={this.props.chapter} onItemClick={this.clickChapter} />
        <BptEntity caption="Lexeme" itemsList={this.props.lexemesList} item={this.props.lexeme} onItemClick={this.clickLexeme} />
        <BptChoice caption="Choice" itemsList={this.props.optionsOfLexemeList} item={this.props.optionOfLexeme} onItemClick={this.clickOptionOfLexeme} />
        <BptEntity caption="Wordform" itemsList={this.props.formsList} item={this.props.form} onItemClick={this.clickForm} />
        <BptEntity caption="Syntagma" itemsList={this.props.syntagmasList} item={this.props.syntagma} onItemClick={this.clickSyntagma} />
        <BptChapter content={this.props.contentOfChapter.content} cont_lang={this.props.contentOfChapter.cont_lang} />
      </div> 
    );
  }
};

let filterStore = function (state) {
  // state: { sources: Object, keywords: Object, routing: Object }
  return { 
    sourcesList: state.sources.sourcesList,
    source: state.sources.source,
    keywordsList: state.keywords.keywordsList,
    keyword: state.keywords.keyword,
    optionsOfKeywordList: state.optionsOfKeyword.optionsOfKeywordList,
    optionOfKeyword: state.optionsOfKeyword.optionOfKeyword,
    chaptersList: state.chapters.chaptersList,
    chapter: state.chapters.chapter,
    lexemesList: state.lexemes.lexemesList,
    lexeme: state.lexemes.lexeme,
    optionsOfLexemeList: state.optionsOfLexeme.optionsOfLexemeList,
    optionOfLexeme: state.optionsOfLexeme.optionOfLexeme,
    formsList: state.forms.formsList,
    form: state.forms.form,
    syntagmasList: state.syntagmas.syntagmasList,
    syntagma: state.syntagmas.syntagma,
    contentOfChapter: state.contentOfChapter.contentOfChapter
  }
};

let waitLoading = false; // try true after refactored to i18next.addResources
if (typeof window === 'undefined') {
  waitLoading = false; // waiting is not needed on server side
}

export default translate(['common'], { wait: waitLoading })(connectReactRedux(filterStore)(BptBox));