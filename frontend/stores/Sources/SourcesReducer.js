import { 
  SOURCE_LOADLIST_SUCCESS, 
  SOURCE_LOADLIST_FAILURE, 
  SOURCE_SELECT 
} from './SourcesActions';

const initialState = { 
  sourcesList: [],
  source: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SOURCE_LOADLIST_SUCCESS:
      return Object.assign({}, state, { sourcesList: action.sourcesList });

    case SOURCE_LOADLIST_FAILURE:
      return Object.assign({}, state, { sourcesList: [] });

    case SOURCE_SELECT:
      return Object.assign({}, state, { source: action.source });

    default:
      return state;
  }
};
