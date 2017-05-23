import callGet from '../utils/api-get';

// Export Constants
export const CONTENT_OF_CHAPTER_LOAD_SUCCESS = 'CONTENT_OF_CHAPTER_LOAD_SUCCESS';
export const CONTENT_OF_CHAPTER_LOAD_FAILURE = 'CONTENT_OF_CHAPTER_LOAD_FAILURE';
export const CONTENT_OF_CHAPTER_CLEAR = 'CONTENT_OF_CHAPTER_CLEAR';

export function loadContentOfChapter(chapter_id, language) {
  return dispatch => {
    callGet('/' + language + '/chapters/' + chapter_id)
      .then(data => dispatch(loadContentOfChapterSuccess(data)))
      .catch(err => dispatch(loadContentOfChapterFailure()));
  }
};

export function loadContentOfChapterSuccess(data) {
  return { type: CONTENT_OF_CHAPTER_LOAD_SUCCESS, contentOfChapter: data }
};

export function loadContentOfChapterFailure() {
  return { type: CONTENT_OF_CHAPTER_LOAD_FAILURE }
};

export function clearContentOfChapter() {
  return { type: CONTENT_OF_CHAPTER_CLEAR }
};
