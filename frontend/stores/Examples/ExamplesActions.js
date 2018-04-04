import callGet from '../utils/api-get';

// import { loadNextsList, clearNextsList } from '../Nexts/NextsActions';

// Export Constants
export const EXAMPLE_LOADLIST_SUCCESS = 'EXAMPLE_LOADLIST_SUCCESS';
export const EXAMPLE_LOADLIST_FAILURE = 'EXAMPLE_LOADLIST_FAILURE';
export const EXAMPLE_SELECT = 'EXAMPLE_SELECT';
export const EXAMPLE_CLEAR = 'EXAMPLE_CLEAR';

export function loadExamplesList(parent_id, language) {
  return dispatch => {
    callGet('/' + language + '/examples?parent_id=' + (parent_id || 0))
      .then(data => dispatch(loadExamplesListSuccess(data)))
      .catch(err => dispatch(loadExamplesListFailure()));
  }
};

export function loadExamplesListSuccess(resultsList) {
  return { type: EXAMPLE_LOADLIST_SUCCESS, examplesList: resultsList }
};

export function loadExamplesListFailure() {
  return { type: EXAMPLE_LOADLIST_FAILURE }
};

export function selectExampleAlone(example) {
  return { type: EXAMPLE_SELECT, example: example }
};

export function selectExample(example, language) {
  return dispatch => {
    dispatch(selectExampleAlone(example));
    if (example) {
      // dispatch(loadNextsList(example._id, language));
    } else {
      // dispatch(clearNextsList());
    }
  }
};

export function clearExamplesListAlone() {
  return { type: EXAMPLE_CLEAR }
};

export function clearExamplesList() {
  return dispatch => {
    dispatch(clearExamplesListAlone());
    // dispatch(clearNextsList());
  }
};
