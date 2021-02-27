import callGet from '../utils/api-get';

import { loadMeaningsList, clearMeaningsList } from '../Meanings/MeaningsActions';
import { loadOptionsOfLexemeList, clearOptionsOfLexemeList } from '../OptionsOfLexeme/OptionsOfLexemeActions';

import arrayFind from 'array.prototype.find'; // polyfill for IE

// Export Constants
export const LEXEME_LOADLIST_SUCCESS = 'LEXEME_LOADLIST_SUCCESS';
export const LEXEME_LOADLIST_FAILURE = 'LEXEME_LOADLIST_FAILURE';
export const LEXEME_SELECT = 'LEXEME_SELECT';
export const LEXEME_CLEAR = 'LEXEME_CLEAR';

export function loadLexemesList(parent_id, language) {
  return dispatch => {
    callGet('/' + language + '/lexemes?parent_id=' + (parent_id || 0))
      .then(data => dispatch(loadLexemesListSuccess(data)))
      .catch(err => dispatch(loadLexemesListFailure()));
  }
};

export function loadLexemesListSuccess(resultsList) {
  return { type: LEXEME_LOADLIST_SUCCESS, lexemesList: resultsList }
};

export function loadLexemesListFailure() {
  return { type: LEXEME_LOADLIST_FAILURE }
};

export function selectLexemeAlone(lexeme) {
  return { type: LEXEME_SELECT, lexeme: lexeme }
};

export function selectLexeme(lexeme, language) {
  return dispatch => {
    dispatch(selectLexemeAlone(lexeme));
    if (lexeme) {
      dispatch(loadMeaningsList(lexeme._id, language));
      dispatch(loadOptionsOfLexemeList(lexeme._id, language));
    } else {
      dispatch(clearMeaningsList());
    }
  }
};

export function clearLexemesListAlone() {
  return { type: LEXEME_CLEAR }
};

export function clearLexemesList() {
  return dispatch => {
    dispatch(clearLexemesListAlone());
    dispatch(clearMeaningsList());
  }
};

export function reloadLexemesList(language) {
  return (dispatch, getState) => {
    const parentKeyword = getState().keywords.keyword;
    // const optionOfKeyword = getState().optionsOfKeyword.optionOfKeyword;
    // if ((!parentKeyword) || (!optionOfKeyword) || (optionOfKeyword.name !== 'lexemes')) {
    if (!parentKeyword) {
      return; // it is unnecessary to reload lexemes in this case
    }

    callGet('/' + language + '/lexemes?parent_id=' + (parentKeyword._id || 0))
      .then(data => {
        dispatch(loadLexemesListSuccess(data)); // refresh list of lexemes

        const oldLexeme = getState().lexemes.lexeme;
        if (oldLexeme) { // if any lexeme is currently selected
          let newLexeme = arrayFind(data, record => record._id === oldLexeme._id);
          if (newLexeme) {
            dispatch(selectLexemeAlone(newLexeme)); // refresh selected lexeme
          } else {
            dispatch(selectLexeme(null)); // clear selected lexeme and all child lists
          }
        }
      })
      .catch(err => {
        dispatch(loadLexemesListFailure());
        dispatch(selectLexeme(null)); // clear selected lexeme and all child lists
      });
  }
};
