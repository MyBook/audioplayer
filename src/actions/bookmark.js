//@flow
import doFetch from "utils/doFetch";
import { changeChapter } from "actions/tableOfContents";
import { handleTimeUpdate } from "actions/playerControl";

export const applyServerBookmark = () => async (
  dispatch: Function,
  getState: Function,
) => {
  const { book, serverBookMark } = getState();
  let chapterNumber = 0;

  book.files.map((_file, i) => {
    if (_file.id === serverBookMark.file.id) chapterNumber = i;
  });

  dispatch(hideBookMarkConflictNotification());

  saveLocalAutoBookmark(getState());
  await dispatch(changeChapter(chapterNumber));
  await dispatch(handleTimeUpdate(serverBookMark.position));
};

export const getAutoBookmarkFromServer = (bookId: number) => async (
  dispatch: Function,
  getState: Function,
) => {
  const { book, isFreeFragment } = getState();

  if (isFreeFragment) return;

  const localBookmark = localStorage.getItem("autoBookmarks");
  const localBookmarks = JSON.parse(localBookmark || "{}");

  if (localBookmarks[book.id]) {
    const { chapterNumber, position } = localBookmarks[book.id];
    await dispatch(changeChapter(chapterNumber));
    await dispatch(handleTimeUpdate(position));
    await dispatch({ type: "IS_NEED_TO_TIME_UPDATE" });
  }

  const result = await doFetch({
    url: `audiobooks/${bookId}/auto-bookmark/`,
  });

  if (!result.file) {
    return;
  }

  if (localBookmarks && localBookmarks[book.id]) {
    const localDate = localBookmarks[book.id].bookmarked_at;
    const serverDate = result.bookmarked_at;

    if (new Date(serverDate) > new Date(localDate)) {
      dispatch({
        type: "BOOKMARKS_CONFLICT_NOTIFICATION_SHOW",
        payload: result,
      });

      setTimeout(() => dispatch(hideBookMarkConflictNotification()), 10000);
    }
  } else {
    await dispatch({
      type: "SET_SERVER_BOOKMARK",
      payload: result,
    });
    dispatch(applyServerBookmark());
  }
};

export const setAutoBookmark = () => async (
  dispatch: Function,
  getStore: Function,
) => {
  const store = getStore();
  saveLocalAutoBookmark(store);
  const autoBookMark = createBookMark(store);

  const result = await doFetch({
    url: "auto-bookmarks/",
    method: "POST",
    data: JSON.stringify(autoBookMark),
  });

  dispatch({ type: "SET_BOOKMARK", payload: result });
};

export const hideBookMarkConflictNotification = () => {
  return { type: "BOOKMARKS_CONFLICT_NOTIFICATION_HIDE" };
};

function saveLocalAutoBookmark(store) {
  const autoBookMark = createBookMark(store);

  const localBookmarks = localStorage.getItem("autoBookmarks");
  const newLocalBookmarks = JSON.stringify({
    ...JSON.parse(localBookmarks || "{}"),
    [store.book.id]: autoBookMark,
  });

  localStorage.setItem("autoBookmarks", newLocalBookmarks);
}

function createBookMark({ book, currentTime, currentChapterNumber }) {
  return {
    book: book.id,
    bookmarked_at: new Date().toISOString(),
    file: book.files[currentChapterNumber].id,
    chapterNumber: currentChapterNumber,
    position: Math.floor(currentTime),
  };
}
