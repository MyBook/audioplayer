//@flow
import { sendStatistics } from "actions/statistics";
import { setAutoBookmark } from "actions/bookmark";
import tracking from "components/utils/tracking";

export const handlePause = () => async (
  dispatch: Function,
  getState: Function,
) => {
  const { player, isFreeFragment } = getState();
  player.pause();

  tracking("onPause");

  if (!isFreeFragment) {
    dispatch(setAutoBookmark());
    dispatch(sendStatistics());
    //TODO(victorkolb): надо правильные фавиконки
    // document.querySelectorAll(".favicon").forEach(el => {
    //   if (!(el instanceof HTMLLinkElement)) return;
    //   el.href = "/static/web/images/player/pause.png";
    // });
  }
  dispatch({ type: "PAUSE" });
};

export const handlePlay = () => async (
  dispatch: Function,
  getState: Function,
) => {
  const { player } = getState();
  player.play();

  tracking("onPlay");

  //TODO(victorkolb): надо правильные фавиконки
  // document.querySelectorAll(".favicon").forEach(el => {
  //   if (!(el instanceof HTMLLinkElement)) return;
  //   el.href = "/static/web/images/player/play.png";
  // });
  dispatch({ type: "PLAY" });
};

export const handleTimeUpdate = (time: number) => async (
  dispatch: Function,
  getState: Function,
) => {
  const { player } = getState();
  player.currentTime = time;

  dispatch({
    type: "TIME_UPDATE",
    payload: time,
  });
};

export const setFreeFragment = (isFreeFragment: boolean) => async (
  dispatch: Function,
  getState: Function,
) => {
  dispatch({
    type: "SET_FREE_FRAGMENT",
    payload: isFreeFragment,
  });
};

export const changeBook = () => async (
  dispatch: Function,
  getState: Function,
) => {
  const { player } = getState();
  player.pause();

  dispatch({
    type: "CHANGE_BOOK",
  });
};
