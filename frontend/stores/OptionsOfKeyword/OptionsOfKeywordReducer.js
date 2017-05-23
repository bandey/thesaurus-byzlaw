import { 
  OPTION_OF_KEYWORD_LOADLIST_SUCCESS, 
  OPTION_OF_KEYWORD_LOADLIST_FAILURE, 
  OPTION_OF_KEYWORD_SELECT,
  OPTION_OF_KEYWORD_CLEAR
} from './OptionsOfKeywordActions';

const initialState = { 
  optionsOfKeywordList: [],
  optionOfKeyword: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPTION_OF_KEYWORD_LOADLIST_SUCCESS:
      return Object.assign({}, state, { optionsOfKeywordList: action.optionsOfKeywordList });

    case OPTION_OF_KEYWORD_LOADLIST_FAILURE:
      return Object.assign({}, state, { optionsOfKeywordList: [], optionOfKeyword: null });

    case OPTION_OF_KEYWORD_SELECT:
      return Object.assign({}, state, { optionOfKeyword: action.optionOfKeyword });

    case OPTION_OF_KEYWORD_CLEAR:
      return Object.assign({}, state, { optionsOfKeywordList: [], optionOfKeyword: null });

    default:
      return state;
  }
};
