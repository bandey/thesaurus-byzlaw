import { 
  MEANING_LOADLIST_SUCCESS, 
  MEANING_LOADLIST_FAILURE, 
  MEANING_SELECT,
  MEANING_CLEAR
} from './MeaningsActions';

const initialState = { 
  meaningsList: [],
  meaning: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MEANING_LOADLIST_SUCCESS:
      return Object.assign({}, state, { meaningsList: action.meaningsList });

    case MEANING_LOADLIST_FAILURE:
      return Object.assign({}, state, { meaningsList: [], meaning: null });
    
    case MEANING_SELECT:
      return Object.assign({}, state, { meaning: action.meaning });
    
    case MEANING_CLEAR:
      return Object.assign({}, state, { meaningsList: [], meaning: null });

    default:
      return state;
  }
};
