import { loadFormsList, clearFormsList } from '../Forms/FormsActions';
import { loadSyntagmasList, clearSyntagmasList } from '../Syntagmas/SyntagmasActions';

// Export Constants
export const OPTION_OF_LEXEME_LOADLIST_SUCCESS = 'OPTION_OF_LEXEME_LOADLIST_SUCCESS';
export const OPTION_OF_LEXEME_LOADLIST_FAILURE = 'OPTION_OF_LEXEME_LOADLIST_FAILURE';
export const OPTION_OF_LEXEME_SELECT = 'OPTION_OF_LEXEME_SELECT';
export const OPTION_OF_LEXEME_CLEAR = 'OPTION_OF_LEXEME_CLEAR';

export function loadOptionsOfLexemeList(parent_id, language) {
  return { 
    type: OPTION_OF_LEXEME_LOADLIST_SUCCESS, 
    optionsOfLexemeList: [
      { _id: 1, name: 'wordforms', font: 'modern', keyword_id: parent_id },
      { _id: 2, name: 'syntagmas', font: 'modern', keyword_id: parent_id }
    ]
  }
};

export function selectOptionOfLexemeAlone(optionOfLexeme) {
  return { type: OPTION_OF_LEXEME_SELECT, optionOfLexeme: optionOfLexeme }
};

export function selectOptionOfLexeme(optionOfLexeme, language) {
  return dispatch => {
    dispatch(selectOptionOfLexemeAlone(optionOfLexeme));
    if (optionOfLexeme) {
      if (optionOfLexeme._id == 1) {
        dispatch(loadFormsList(optionOfLexeme.keyword_id, language));
      } else if (optionOfLexeme._id == 2) {
        dispatch(loadSyntagmasList(optionOfLexeme.keyword_id, language));
      } else {
        dispatch(clearFormsList());
        dispatch(clearSyntagmasList());
      }
    } else {
      dispatch(clearFormsList());
      dispatch(clearSyntagmasList());
    }
  }
};

export function clearOptionsOfLexemeListAlone() {
  return { type: OPTION_OF_LEXEME_CLEAR }
};

export function clearOptionsOfLexemeList() {
  return dispatch => {
    dispatch(clearOptionsOfLexemeListAlone());
    dispatch(clearFormsList());
    dispatch(clearSyntagmasList());
  }
};
