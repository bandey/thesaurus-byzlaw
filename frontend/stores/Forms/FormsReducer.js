import { 
  FORM_LOADLIST_SUCCESS, 
  FORM_LOADLIST_FAILURE, 
  FORM_SELECT,
  FORM_CLEAR
} from './FormsActions';

const initialState = { 
  formsList: [],
  form: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FORM_LOADLIST_SUCCESS:
      return Object.assign({}, state, { formsList: action.formsList });

    case FORM_LOADLIST_FAILURE:
      return Object.assign({}, state, { formsList: [], form: null });

    case FORM_SELECT:
      return Object.assign({}, state, { form: action.form });

    case FORM_CLEAR:
      return Object.assign({}, state, { formsList: [], form: null });

    default:
      return state;
  }
};
