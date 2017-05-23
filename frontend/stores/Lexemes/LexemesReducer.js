import { 
  LEXEME_LOADLIST_SUCCESS, 
  LEXEME_LOADLIST_FAILURE, 
  LEXEME_SELECT,
  LEXEME_CLEAR
} from './LexemesActions';

const initialState = { 
  lexemesList: [],
  lexeme: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LEXEME_LOADLIST_SUCCESS:
      return Object.assign({}, state, { lexemesList: action.lexemesList });

    case LEXEME_LOADLIST_FAILURE:
      return Object.assign({}, state, { lexemesList: [], lexeme: null });

    case LEXEME_SELECT:
      return Object.assign({}, state, { lexeme: action.lexeme });
    
    case LEXEME_CLEAR:
      return Object.assign({}, state, { lexemesList: [], lexeme: null });

    default:
      return state;
  }
};
