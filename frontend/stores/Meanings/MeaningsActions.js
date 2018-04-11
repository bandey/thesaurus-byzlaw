import callGet from '../utils/api-get';

import { loadOptionsOfLexemeList, clearOptionsOfLexemeList } from '../OptionsOfLexeme/OptionsOfLexemeActions';

import arrayFind from 'array.prototype.find'; // polyfill for IE

// Export Constants
export const MEANING_LOADLIST_SUCCESS = 'MEANING_LOADLIST_SUCCESS';
export const MEANING_LOADLIST_FAILURE = 'MEANING_LOADLIST_FAILURE';
export const MEANING_SELECT = 'MEANING_SELECT';
export const MEANING_CLEAR = 'MEANING_CLEAR';

export function loadMeaningsList(parent_id, language) {
  return dispatch => {
    callGet('/' + language + '/meanings?parent_id=' + (parent_id || 0))
      .then(data => dispatch(loadMeaningsListSuccess(data)))
      .catch(err => dispatch(loadMeaningsListFailure()));
  }
};

export function loadMeaningsListSuccess(resultsList) {
  return { type: MEANING_LOADLIST_SUCCESS, meaningsList: resultsList }
};

export function loadMeaningsListFailure() {
  return { type: MEANING_LOADLIST_FAILURE }
};

export function selectMeaningAlone(meaning) {
  return { type: MEANING_SELECT, meaning: meaning }
};

export function selectMeaning(meaning, language) {
  return dispatch => {
    dispatch(selectMeaningAlone(meaning));
    if (meaning) {
      dispatch(loadOptionsOfLexemeList(meaning._id, language));
    } else {
      dispatch(clearOptionsOfLexemeList());
    }
  }
};

export function clearMeaningsListAlone() {
  return { type: MEANING_CLEAR }
};

export function clearMeaningsList() {
  return dispatch => {
    dispatch(clearMeaningsListAlone());
    dispatch(clearOptionsOfLexemeList());
  }
};

export function reloadMeaningsList(language) {
  return (dispatch, getState) => {
    const parentLexeme = getState().lexemes.lexeme;
    if (!parentLexeme) {
      return; // it is unnecessary to reload meanings in this case
    }

    callGet('/' + language + '/meanings?parent_id=' + (parentLexeme._id || 0))
      .then(data => {
        dispatch(loadMeaningsListSuccess(data)); // refresh list of meanings

        const oldMeaning = getState().meanings.meaning;
        if (oldMeaning) { // if any meaning is currently selected
          let newMeaning = arrayFind(data, record => record._id === oldMeaning._id);
          if (newMeaning) {
            dispatch(selectMeaningAlone(newMeaning)); // refresh selected meaning
          } else {
            dispatch(selectMeaning(null)); // clear selected meaning and all child lists
          }
        }
      })
      .catch(err => {
        dispatch(loadMeaningsListFailure());
        dispatch(selectMeaning(null)); // clear selected meaning and all child lists
      });
  }
};
