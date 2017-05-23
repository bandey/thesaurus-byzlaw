import { 
  KEYWORD_LOADLIST_SUCCESS, 
  KEYWORD_LOADLIST_FAILURE, 
  KEYWORD_SELECT,
  KEYWORD_CLEAR
} from './KeywordsActions';

const initialState = { 
  keywordsList: [],
  keyword: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case KEYWORD_LOADLIST_SUCCESS:
      return Object.assign({}, state, { keywordsList: action.keywordsList });

    case KEYWORD_LOADLIST_FAILURE:
      return Object.assign({}, state, { keywordsList: [], keyword: null });

    case KEYWORD_SELECT:
      return Object.assign({}, state, { keyword: action.keyword });

    case KEYWORD_CLEAR:
      return Object.assign({}, state, { keywordsList: [], keyword: null });

    default:
      return state;
  }
};
