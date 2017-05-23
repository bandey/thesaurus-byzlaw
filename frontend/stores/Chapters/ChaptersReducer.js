import { 
  CHAPTER_LOADLIST_SUCCESS, 
  CHAPTER_LOADLIST_FAILURE, 
  CHAPTER_SELECT,
  CHAPTER_CLEAR
} from './ChaptersActions';

const initialState = { 
  chaptersList: [],
  chapter: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHAPTER_LOADLIST_SUCCESS:
      return Object.assign({}, state, { chaptersList: action.chaptersList });

    case CHAPTER_LOADLIST_FAILURE:
      return Object.assign({}, state, { chaptersList: [], chapter: null });

    case CHAPTER_SELECT:
      return Object.assign({}, state, { chapter: action.chapter });

    case CHAPTER_CLEAR:
      return Object.assign({}, state, { chaptersList: [], chapter: null });

    default:
      return state;
  }
};
