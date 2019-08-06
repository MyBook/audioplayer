//@flow
import { sendStatistics } from "actions/statistics";
import { setAutoBookmark } from "actions/bookmark";
import tracking from "components/utils/tracking";

export const handlePause = urls => async (
  dispatch: Function,
  getState: Function,
) => {
  const { player, isFreeFragment } = getState();
  player.pause();

  tracking("onPause");

  if (!isFreeFragment) {
    dispatch(sendStatistics(urls));
    dispatch(setAutoBookmark(urls));
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
  const playPromise = player.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        tracking("onPlay");

        //TODO(victorkolb): надо правильные фавиконки
        // document.querySelectorAll(".favicon").forEach(el => {
        //   if (!(el instanceof HTMLLinkElement)) return;
        //   el.href = "/static/web/images/player/play.png";
        // });
        dispatch({ type: "PLAY" });
      })
      .catch(e => console.error(e));
  }
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
) => {
  dispatch({
    type: "SET_FREE_FRAGMENT",
    payload: isFreeFragment,
  });
};

export const resetPlayer = urls => async (dispatch: Function) => {
  dispatch(handlePause(urls));

  dispatch({
    type: "RESET_PLAYER",
  });
};
