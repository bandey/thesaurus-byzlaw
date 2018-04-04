import callGet from '../utils/api-get';

import { loadExamplesList, clearExamplesList } from '../Examples/ExamplesActions';

// Export Constants
export const SYNTAGMA_LOADLIST_SUCCESS = 'SYNTAGMA_LOADLIST_SUCCESS';
export const SYNTAGMA_LOADLIST_FAILURE = 'SYNTAGMA_LOADLIST_FAILURE';
export const SYNTAGMA_SELECT = 'SYNTAGMA_SELECT';
export const SYNTAGMA_CLEAR = 'SYNTAGMA_CLEAR';

export function loadSyntagmasList(parent_id, language) {
  return dispatch => {
    callGet('/' + language + '/syntagmas?parent_id=' + (parent_id || 0))
      .then(data => dispatch(loadSyntagmasListSuccess(data)))
      .catch(err => dispatch(loadSyntagmasListFailure()));
  }
};

export function loadSyntagmasListSuccess(resultsList) {
  return { type: SYNTAGMA_LOADLIST_SUCCESS, syntagmasList: resultsList }
};

export function loadSyntagmasListFailure() {
  return { type: SYNTAGMA_LOADLIST_FAILURE }
};

export function selectSyntagmaAlone(syntagma) {
  return { type: SYNTAGMA_SELECT, syntagma: syntagma }
};

export function selectSyntagma(syntagma, language) {
  return dispatch => {
    dispatch(selectSyntagmaAlone(syntagma));
    if (syntagma) {
      dispatch(loadExamplesList(syntagma._id, language));
    } else {
      dispatch(clearExamplesList());
    }
  }
};

export function clearSyntagmasListAlone() {
  return { type: SYNTAGMA_CLEAR }
};

export function clearSyntagmasList() {
  return dispatch => {
    dispatch(clearSyntagmasListAlone());
    dispatch(clearExamplesList());
  }
};
