import callGet from '../utils/api-get';

// import { loadOptionsOfKeywordList, clearOptionsOfKeywordList } from '../OptionsOfKeyword/OptionsOfKeywordActions';
import { loadLexemesList, clearLexemesList } from '../Lexemes/LexemesActions';

// Export Constants
export const KEYWORD_LOADLIST_SUCCESS = 'KEYWORD_LOADLIST_SUCCESS';
export const KEYWORD_LOADLIST_FAILURE = 'KEYWORD_LOADLIST_FAILURE';
export const KEYWORD_SELECT = 'KEYWORD_SELECT';
export const KEYWORD_CLEAR = 'KEYWORD_CLEAR';

export function loadKeywordsList(parent_id, language) {
  return dispatch => {
    callGet('/' + language + '/keywords?parent_id=' + (parent_id || 0))
      .then(data => dispatch(loadKeywordsListSuccess(data)))
      .catch(err => dispatch(loadKeywordsListFailure()));
  }
};

export function loadKeywordsListSuccess(resultsList) {
  return { type: KEYWORD_LOADLIST_SUCCESS, keywordsList: resultsList }
};

export function loadKeywordsListFailure() {
  return { type: KEYWORD_LOADLIST_FAILURE }
};

export function selectKeywordAlone(keyword) {
  return { type: KEYWORD_SELECT, keyword: keyword }
};

export function selectKeyword(keyword, language) {
  return dispatch => {
    dispatch(selectKeywordAlone(keyword));
    if (keyword) {
      // dispatch(loadOptionsOfKeywordList(keyword._id, language));
      dispatch(loadLexemesList(keyword._id, language));
    } else {
      // dispatch(clearOptionsOfKeywordList());
      dispatch(clearLexemesList());
    }
  }
};

export function clearKeywordsListAlone() {
  return { type: KEYWORD_CLEAR }
};

export function clearKeywordsList() {
  return dispatch => {
    dispatch(clearKeywordsListAlone());
    // dispatch(clearOptionsOfKeywordList());
    dispatch(clearLexemesList());
  }
};
