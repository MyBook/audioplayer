//@flow
import keyboardEventsListeners from "components/utils/keyboardEventsListeners";
import { defaultForwardSecondsCount } from "utils/playerConstants";
import { sendStatistics } from "actions/statistics";
import doFetch from "utils/doFetch";
import {
  handlePause,
  handlePlay,
  handleTimeUpdate,
  setFreeFragment,
} from "actions/playerControl";
import { setAutoBookmark } from "actions/bookmark";
import { changeChapter } from "actions/tableOfContents";
import { changeVolume } from "actions/volume";
import { changePlaybackRate } from "actions/playbackRate";

import tracking from "components/utils/tracking";

function addKeyboardEventListeners({ dispatch, getState, urls }) {
  keyboardEventsListeners({
    triggerPlay: () => {
      const { isPlaying } = getState();
      if (isPlaying) {
        dispatch(handlePause(urls));
        tracking("onKeyPause");
      } else {
        dispatch(handlePlay());
        tracking("onKeyPlay");
      }
    },
    handleForward: () => {
      dispatch(
        handleTimeUpdate(getState().currentTime + defaultForwardSecondsCount),
      );
      tracking("onKeyForward");
    },
    handleBackward: () => {
      dispatch(
        handleTimeUpdate(getState().currentTime - defaultForwardSecondsCount),
      );
      tracking("onKeyBackward");
    },
    handleMute: () => {
      const { volume } = getState();
      dispatch(changeVolume(volume === 0 ? 1 : 0));
      tracking("onKeyMute");
    },
  });
}

function addPlayerEventListeners({
  player,
  dispatch,
  getState,
  isFreeFragment,
  urls,
  changeBook,
  onCompleteBookListeningHandler,
}) {
  player.loop = false;

  player.addEventListener("play", () => {
    tracking("onPlay");

    dispatch({ type: "PLAY" });
  });

  player.addEventListener("pause", () => {
    tracking("onPause");

    if (!isFreeFragment) {
      dispatch(sendStatistics(urls));
      dispatch(setAutoBookmark(urls));
    }

    dispatch({ type: "PAUSE" });
  });

  player.addEventListener("loadedmetadata", async () => {
    await dispatch({
      type: "LOADED_META_DATA",
      payload: { duration: player.duration },
    });
    await dispatch({ type: "CAN_PLAY" });
  });

  player.addEventListener("canplay", async () => {
    const { isNeedToTimeUpdate, currentTime } = getState();

    if (isNeedToTimeUpdate) {
      await dispatch(handleTimeUpdate(currentTime));
      await dispatch({ type: "IS_NO_NEED_TO_TIME_UPDATE" });
    }
  });

  player.addEventListener("error", (e = {}) => {
    const { srcElement } = e;

    if (srcElement && srcElement.error.code === 4) {
      dispatch({ type: "SET_404_ERROR" });
    }
    console.error(srcElement.error);
  });

  player.addEventListener("timeupdate", () => {
    const { isPlaying, currentTime } = getState();
    if (
      isPlaying &&
      Math.floor(currentTime) !== Math.floor(player.currentTime)
    ) {
      dispatch({
        type: "ADD_STATISTICS_SECONDS",
      });
    }

    dispatch({
      type: "TIME_UPDATE",
      payload: player.currentTime,
    });
  });

  if (!isFreeFragment) {
    window.addEventListener("beforeunload", () => {
      dispatch(setAutoBookmark(urls));
      dispatch(sendStatistics(urls));
    });
  }

  if (!isFreeFragment) {
    player.addEventListener("ended", async () => {
      const {
        currentChapterNumber,
        book: currentBook,
        isPodcastOrLecture,
        series,
      } = getState();
      console.log("ended");
      player.pause();

      if (isPodcastOrLecture) {
        const seriesBooks = series.books;
        const currentBookIndex = seriesBooks.findIndex(
          book => currentBook.id === book.id,
        );

        if (currentBookIndex !== -1 && seriesBooks[currentBookIndex + 1]) {
          changeBook(seriesBooks[currentBookIndex + 1].id);
        }
      } else {
        const nextChapterNumber = currentChapterNumber + 1;
        const isLastChapter = currentBook.files.length < nextChapterNumber;
        const newChapter = isLastChapter ? 0 : nextChapterNumber;

        if (isLastChapter && onCompleteBookListeningHandler) {
          onCompleteBookListeningHandler();
        }

        await dispatch(changeChapter(newChapter));
        await dispatch(handlePlay());
      }
    });
  }
}

function setLocalOptions({ isFreeFragment, dispatch }) {
  if (!isFreeFragment) {
    const localVolume = localStorage.getItem("volume");
    const localPlaybackRate = localStorage.getItem("playbackRate");

    if (localVolume) {
      dispatch(changeVolume(+localVolume));
    }

    if (localPlaybackRate) {
      dispatch(changePlaybackRate(+localPlaybackRate));
    }
  }
}

export const init = (
  isFreeFragment: boolean,
  urls,
  changeBook: Function,
  onCompleteBookListeningHandler,
) => async (dispatch: Function, getState: Function) => {
  await dispatch(setFreeFragment(isFreeFragment));

  const { player } = getState();
  const { isFreeFragment: _isFreeFragment, book } = getState();

  const source = _isFreeFragment ? book.preview : book.files[0];
  console.log({ source });
  player.src = source.url;

  setLocalOptions({ dispatch, isFreeFragment });
  addPlayerEventListeners({
    dispatch,
    getState,
    urls,
    player,
    isFreeFragment,
    onCompleteBookListeningHandler,
    changeBook,
  });
  addKeyboardEventListeners({ dispatch, getState, urls });

  dispatch({ type: "INIT" });
};

const getSeries = (book, urls, seriesAdaptor) => async (dispatch, getState) => {
  const series = seriesAdaptor(book.series[0].series);
  const { id: seriesId } = series;
  const { url } = urls.getSeries(book.id, seriesId);

  const { results: books } = await doFetch({ url });

  dispatch({
    type: "GET_SERIES",
    payload: { ...series, books },
  });
};

export const getBook = (
  bookId: number,
  urls,
  bookAdaptor,
  seriesAdaptor,
) => async (dispatch: Function) => {
  dispatch({ type: "START_FETCHING" });

  const { url, version } = urls.getBook(bookId);
  const bookRaw = await doFetch({
    url,
    version,
  });
  const book = bookAdaptor(bookRaw);
  let isPodcastOrLecture = false;

  if (book.type === "podcast" || book.type === "lecture") {
    isPodcastOrLecture = true;
    await dispatch(getSeries(book, urls, seriesAdaptor));
  }
  dispatch({
    type: "GET_BOOK",
    payload: { book, isPodcastOrLecture },
  });
};
