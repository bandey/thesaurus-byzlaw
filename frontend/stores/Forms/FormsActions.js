import callGet from '../utils/api-get';

// import { loadNextsList, clearNextsList } from '../Nexts/NextsActions';

// Export Constants
export const FORM_LOADLIST_SUCCESS = 'FORM_LOADLIST_SUCCESS';
export const FORM_LOADLIST_FAILURE = 'FORM_LOADLIST_FAILURE';
export const FORM_SELECT = 'FORM_SELECT';
export const FORM_CLEAR = 'FORM_CLEAR';

export function loadFormsList(parent_id, language) {
  return dispatch => {
    callGet('/' + language + '/forms?parent_id=' + (parent_id || 0))
      .then(data => dispatch(loadFormsListSuccess(data)))
      .catch(err => dispatch(loadFormsListFailure()));
  }
};

export function loadFormsListSuccess(resultsList) {
  return { type: FORM_LOADLIST_SUCCESS, formsList: resultsList }
};

export function loadFormsListFailure() {
  return { type: FORM_LOADLIST_FAILURE }
};

export function selectFormAlone(form) {
  return { type: FORM_SELECT, form: form }
};

export function selectForm(form, language) {
  return dispatch => {
    dispatch(selectFormAlone(form));
    if (form) {
      // dispatch(loadNextsList(form._id, language));
    } else {
      // dispatch(clearNextsList());
    }
  }
};

export function clearFormsListAlone() {
  return { type: FORM_CLEAR }
};

export function clearFormsList() {
  return dispatch => {
    dispatch(clearFormsListAlone());
    // dispatch(clearNextsList());
  }
};
