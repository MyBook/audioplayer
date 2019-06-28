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

export const init = (isFreeFragment: boolean, urls) => async (
  dispatch: Function,
  getState: Function,
) => {
  const { player } = getState();

  await dispatch(setFreeFragment(isFreeFragment));

  const { isFreeFragment: _isFreeFragment, book } = getState();
  const source = _isFreeFragment ? book.preview : book.files[0];
  player.src = source.absolute_url;

  player.addEventListener("loadedmetadata", async () => {
    dispatch({
      type: "LOADED_META_DATA",
      payload: { duration: player.duration },
    });
  });

  player.addEventListener("canplay", async () => {
    const { isNeedToTimeUpdate, currentTime } = getState();

    if (isNeedToTimeUpdate) {
      await dispatch(handleTimeUpdate(currentTime));
      await dispatch({ type: "IS_NO_NEED_TO_TIME_UPDATE" });
    }
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
      const { currentChapterNumber, book } = getState();
      const newChapter =
        book.files.length > currentChapterNumber + 1
          ? currentChapterNumber + 1
          : 0;
      await dispatch(changeChapter(newChapter));
      await dispatch(handlePlay());
    });
  }

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

  dispatch({ type: "INIT" });
};

export const getBookFromServer = (bookId: number, urls, bookAdaptor) => async (
  dispatch: Function,
) => {
  dispatch({ type: "START_FETCHING" });

  const { url, version } = urls.getBook(bookId);
  const bookRaw = await doFetch({
    url,
    version,
  });
  const book = bookAdaptor(bookRaw);

  dispatch({ type: "GET_BOOK_FROM_SERVER", payload: book });
};
