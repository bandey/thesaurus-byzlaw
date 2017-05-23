import { loadChaptersList, clearChaptersList } from '../Chapters/ChaptersActions';
import { loadLexemesList, clearLexemesList } from '../Lexemes/LexemesActions';

// Export Constants
export const OPTION_OF_KEYWORD_LOADLIST_SUCCESS = 'OPTION_OF_KEYWORD_LOADLIST_SUCCESS';
export const OPTION_OF_KEYWORD_LOADLIST_FAILURE = 'OPTION_OF_KEYWORD_LOADLIST_FAILURE';
export const OPTION_OF_KEYWORD_SELECT = 'OPTION_OF_KEYWORD_SELECT';
export const OPTION_OF_KEYWORD_CLEAR = 'OPTION_OF_KEYWORD_CLEAR';

export function loadOptionsOfKeywordList(parent_id, language) {
  return { 
    type: OPTION_OF_KEYWORD_LOADLIST_SUCCESS,
    optionsOfKeywordList: [
      { _id: 1, name: 'lexemes', lang: 'fontLatin', keyword_id: parent_id },
      { _id: 2, name: 'chapters', lang: 'fontLatin', keyword_id: parent_id }
    ] 
  }
};

export function selectOptionOfKeywordAlone(optionOfKeyword) {
  return { type: OPTION_OF_KEYWORD_SELECT, optionOfKeyword: optionOfKeyword }
};

export function selectOptionOfKeyword(optionOfKeyword, language) {
  return dispatch => {
    dispatch(selectOptionOfKeywordAlone(optionOfKeyword));
    if (optionOfKeyword) {
      if (optionOfKeyword._id == 2) {
        dispatch(loadChaptersList(optionOfKeyword.keyword_id, language));
      } else if (optionOfKeyword._id == 1) {
        dispatch(loadLexemesList(optionOfKeyword.keyword_id, language));
      } else {
        dispatch(clearChaptersList());
        dispatch(clearLexemesList());
      }
    } else {
      dispatch(clearChaptersList());
      dispatch(clearLexemesList());
    }
  }
};

export function clearOptionsOfKeywordListAlone() {
  return { type: OPTION_OF_KEYWORD_CLEAR }
};

export function clearOptionsOfKeywordList() {
  return dispatch => {
    dispatch(clearOptionsOfKeywordListAlone());
    dispatch(clearChaptersList());
    dispatch(clearLexemesList());
  }
};
