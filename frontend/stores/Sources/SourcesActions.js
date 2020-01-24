import callGet from '../utils/api-get';

import { showAdditionsBoard, hideAdditionsBoard } from '../Ambience/AmbienceActions';
import { loadKeywordsList, clearKeywordsList } from '../Keywords/KeywordsActions';

import arrayFind from 'array.prototype.find'; // polyfill for IE

// Export Constants
export const SOURCE_LOADLIST_SUCCESS = 'SOURCE_LOADLIST_SUCCESS';
export const SOURCE_LOADLIST_FAILURE = 'SOURCE_LOADLIST_FAILURE';
export const SOURCE_SELECT = 'SOURCE_SELECT';

export function loadSourcesList(language) {
  return dispatch => {
    callGet('/' + language + '/sources')
      .then(data => dispatch(loadSourcesListSuccess(data)))
      .catch(err => dispatch(loadSourcesListFailure()));
  }
};

export function loadSourcesListSuccess(resultsList) {
  return { type: SOURCE_LOADLIST_SUCCESS, sourcesList: resultsList }
};

export function loadSourcesListFailure() {
  return { type: SOURCE_LOADLIST_FAILURE }
};

export function selectSourceAlone(source) {
  return { type: SOURCE_SELECT, source: source }
};

export function selectSource(source, language) {
  return dispatch => {
    dispatch(selectSourceAlone(source));
    if (source) {
      dispatch(loadKeywordsList(source._id, language));
      dispatch(hideAdditionsBoard());
    } else {
      dispatch(clearKeywordsList());
      dispatch(showAdditionsBoard());
    }
  }
};

export function reloadSourcesList(language) {
  return (dispatch, getState) => {
    callGet('/' + language + '/sources')
      .then(data => {
        dispatch(loadSourcesListSuccess(data)); // refresh list of sources

        const oldSource = getState().sources.source;
        if (oldSource) { // if any source is currently selected
          let newSource = arrayFind(data, record => record._id === oldSource._id);
          if (newSource) {
            dispatch(selectSourceAlone(newSource)); // refresh selected source
          } else {
            dispatch(selectSource(null)); // clear selected source and all child lists
          }
        }
      })
      .catch(err => {
        dispatch(loadSourcesListFailure());
        dispatch(selectSource(null)); // clear selected source and all child lists
      });
  }
};
