import callGet from '../utils/api-get';

import { loadContentOfChapter, clearContentOfChapter } from '../ContentOfChapter/ContentOfChapterActions';

// Export Constants
export const CHAPTER_LOADLIST_SUCCESS = 'CHAPTER_LOADLIST_SUCCESS';
export const CHAPTER_LOADLIST_FAILURE = 'CHAPTER_LOADLIST_FAILURE';
export const CHAPTER_SELECT = 'CHAPTER_SELECT';
export const CHAPTER_CLEAR = 'CHAPTER_CLEAR';

export function loadChaptersList(parent_id, language) {
  return dispatch => {
    callGet('/' + language + '/chapters/of/keyword/' + parent_id)
      .then(data => dispatch(loadChaptersListSuccess(data)))
      .catch(err => dispatch(loadChaptersListFailure()));
  }
};

export function loadChaptersListSuccess(resultsList) {
  return { type: CHAPTER_LOADLIST_SUCCESS, chaptersList: resultsList }
};

export function loadChaptersListFailure() {
  return { type: CHAPTER_LOADLIST_FAILURE }
};

export function selectChapterAlone(chapter) {
  return { type: CHAPTER_SELECT, chapter: chapter }
};

export function selectChapter(chapter, language) {
  return dispatch => {
    dispatch(selectChapterAlone(chapter));
    if (chapter) {
      dispatch(loadContentOfChapter(chapter._id, language));
    } else {
      dispatch(clearContentOfChapter());
    }
  }
};

export function clearChaptersListAlone() {
  return { type: CHAPTER_CLEAR }
};

export function clearChaptersList() {
  return dispatch => {
    dispatch(clearChaptersListAlone());
    dispatch(clearContentOfChapter());
  }
};
