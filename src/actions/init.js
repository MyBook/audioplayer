//@flow
import keyboardEventsListeners from "components/utils/keyboardEventsListeners";
import { defaultForwardSecondsCount } from "playerConstants";
import { sendStatistics } from "actions/statistics";
import doFetch from "utils/doFetch";
import { bookAdaptor } from "components/utils/bookAdaptor";
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

export const init = (isFreeFragment: boolean) => async (
  dispatch: Function,
  getState: Function,
) => {
  const { player } = getState();

  await dispatch(setFreeFragment(isFreeFragment));

  player.addEventListener("loadedmetadata", () => {
    dispatch({
      type: "LOADED_META_DATA",
      payload: { duration: player.duration },
    });
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
      dispatch(setAutoBookmark());
      dispatch(sendStatistics());
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
        dispatch(handlePause());
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

export const getBookFromServer = (bookId: number) => async (
  dispatch: Function,
  getState: Function,
) => {
  dispatch({ type: "START_FETCHING" });
  const { player, isFreeFragment } = getState();
  const bookRaw = await doFetch({ url: `audiobooks/${bookId}/` });
  const book = bookAdaptor(bookRaw);
  const source = isFreeFragment ? book.preview : book.files[0];

  player.src = source.absolute_url;

  dispatch({ type: "GET_BOOK_FROM_SERVER", payload: book });
};
