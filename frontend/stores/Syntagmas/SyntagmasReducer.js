import { 
  SYNTAGMA_LOADLIST_SUCCESS, 
  SYNTAGMA_LOADLIST_FAILURE, 
  SYNTAGMA_SELECT,
  SYNTAGMA_CLEAR
} from './SyntagmasActions';

const initialState = { 
  syntagmasList: [],
  syntagma: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SYNTAGMA_LOADLIST_SUCCESS:
      return Object.assign({}, state, { syntagmasList: action.syntagmasList });

    case SYNTAGMA_LOADLIST_FAILURE:
      return Object.assign({}, state, { syntagmasList: [], syntagma: null });
    
    case SYNTAGMA_SELECT:
      return Object.assign({}, state, { syntagma: action.syntagma });
    
    case SYNTAGMA_CLEAR:
      return Object.assign({}, state, { syntagmasList: [], syntagma: null });

    default:
      return state;
  }
};
