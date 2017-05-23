import { 
  CONTENT_OF_CHAPTER_LOAD_SUCCESS, 
  CONTENT_OF_CHAPTER_LOAD_FAILURE,
  CONTENT_OF_CHAPTER_CLEAR
} from './ContentOfChapterActions';

const initialState = { 
  contentOfChapter: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTENT_OF_CHAPTER_LOAD_SUCCESS:
      return Object.assign({}, state, { contentOfChapter: action.contentOfChapter });

    case CONTENT_OF_CHAPTER_LOAD_FAILURE:
      return Object.assign({}, state, { contentOfChapter: {} });

    case CONTENT_OF_CHAPTER_CLEAR:
      return Object.assign({}, state, { contentOfChapter: {} });

    default:
      return state;
  }
};
