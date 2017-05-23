import { 
  OPTION_OF_LEXEME_LOADLIST_SUCCESS, 
  OPTION_OF_LEXEME_LOADLIST_FAILURE, 
  OPTION_OF_LEXEME_SELECT,
  OPTION_OF_LEXEME_CLEAR
} from './OptionsOfLexemeActions';

const initialState = { 
  optionsOfLexemeList: [],
  optionOfLexeme: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPTION_OF_LEXEME_LOADLIST_SUCCESS:
      return Object.assign({}, state, { optionsOfLexemeList: action.optionsOfLexemeList });
    
    case OPTION_OF_LEXEME_LOADLIST_FAILURE:
      return Object.assign({}, state, { optionsOfLexemeList: [], optionOfLexeme: null });
    
    case OPTION_OF_LEXEME_SELECT:
      return Object.assign({}, state, { optionOfLexeme: action.optionOfLexeme });
    
    case OPTION_OF_LEXEME_CLEAR:
      return Object.assign({}, state, { optionsOfLexemeList: [], optionOfLexeme: null });

    default:
      return state;
  }
};
