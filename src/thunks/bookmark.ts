import doFetch from "utils/doFetch";
import { changeChapter } from "thunks/tableOfContents";
import { handleTimeUpdate } from "thunks/playerControl";
import { needToTimeUpdateAction } from "actions/init";
import {
  bookmarksConflictNotificationHideAction,
  bookmarksConflictNotificationShowAction,
  setBookmarkAction,
  setServerBookmarkAction,
} from "actions/bookmark";
import { Urls } from "types";

export const applyServerBookmark = () => async (
  dispatch: Function,
  getState: Function,
) => {
  const { book, serverBookMark } = getState();
  let chapterNumber = 0;

  book.files.map((_file, i) => {
    if (_file.id === serverBookMark.file.id) chapterNumber = i;
  });

  dispatch(bookmarksConflictNotificationHideAction());

  saveLocalAutoBookmark(getState());
  await dispatch(changeChapter(chapterNumber));
  await dispatch(handleTimeUpdate(serverBookMark.position));
};

export const getAutoBookmarkFromServer = (bookId: number, urls: Urls) => async (
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
    await dispatch(needToTimeUpdateAction());
  }

  const { url, version } = urls.getAutoBookmark(bookId);
  let result = {};
  try {
    result = await doFetch({
      url,
      version,
    });
  } catch (e) {
    if (e === "404") {
      console.info("Автозакладка не найдена");
    } else {
      console.error(e);
    }
  }

  if (!result.file) {
    return;
  }

  if (localBookmarks && localBookmarks[book.id]) {
    const localDate = localBookmarks[book.id].bookmarked_at;
    const serverDate = result.bookmarked_at;

    if (new Date(serverDate) > new Date(localDate)) {
      dispatch(bookmarksConflictNotificationShowAction(result));

      setTimeout(
        () => dispatch(bookmarksConflictNotificationHideAction()),
        10000,
      );
    }
  } else {
    await dispatch(setServerBookmarkAction(result));
    dispatch(applyServerBookmark());
  }
};

export const setAutoBookmark = (urls: Urls) => async (
  dispatch: Function,
  getStore: Function,
) => {
  const store = getStore();
  saveLocalAutoBookmark(store);
  const autoBookMark = createBookMark(store, false);
  const { url, version } = urls.setAutoBookmark();

  const result = await doFetch({
    url,
    version,
    method: "POST",
    data: JSON.stringify(autoBookMark),
  });

  dispatch(setBookmarkAction(result));
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

function createBookMark(
  { book, currentTime, currentChapterNumber },
  withChapter = true,
) {
  const date = new Date();

  date.setSeconds(0, 0);

  const bookMark = {
    book: book.id,
    bookmarked_at: date.toISOString(),
    file: book.files[currentChapterNumber].id,
    position: Math.floor(currentTime),
    chapterNumber: undefined,
  };

  if (withChapter) {
    bookMark.chapterNumber = currentChapterNumber;
  }

  return bookMark;
}
