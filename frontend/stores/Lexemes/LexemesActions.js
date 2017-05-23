import callGet from '../utils/api-get';

import { loadOptionsOfLexemeList, clearOptionsOfLexemeList } from '../OptionsOfLexeme/OptionsOfLexemeActions';

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
      dispatch(loadOptionsOfLexemeList(lexeme._id, language));
    } else {
      dispatch(clearOptionsOfLexemeList());
    }
  }
};

export function clearLexemesListAlone() {
  return { type: LEXEME_CLEAR }
};

export function clearLexemesList() {
  return dispatch => {
    dispatch(clearLexemesListAlone());
    dispatch(clearOptionsOfLexemeList());
  }
};
