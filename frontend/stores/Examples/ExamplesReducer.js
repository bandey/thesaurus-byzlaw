import { 
  EXAMPLE_LOADLIST_SUCCESS, 
  EXAMPLE_LOADLIST_FAILURE, 
  EXAMPLE_SELECT,
  EXAMPLE_CLEAR
} from './ExamplesActions';

const initialState = { 
  examplesList: [],
  example: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_LOADLIST_SUCCESS:
      return Object.assign({}, state, { examplesList: action.examplesList });

    case EXAMPLE_LOADLIST_FAILURE:
      return Object.assign({}, state, { examplesList: [], example: null });
    
    case EXAMPLE_SELECT:
      return Object.assign({}, state, { example: action.example });
    
    case EXAMPLE_CLEAR:
      return Object.assign({}, state, { examplesList: [], example: null });

    default:
      return state;
  }
};
