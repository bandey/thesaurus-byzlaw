import callGet from '../utils/api-get';

import { loadKeywordsList, clearKeywordsList } from '../Keywords/KeywordsActions';

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
    } else {
      dispatch(clearKeywordsList());
    }
  }
};
