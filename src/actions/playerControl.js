//@flow

export const handlePause = () => async (
  dispatch: Function,
  getState: Function,
) => {
  const { player } = getState();

  player.pause();
};

export const handlePlay = () => async (
  dispatch: Function,
  getState: Function,
) => {
  try {
    const { player } = getState();

    player.play();
  } catch (err) {
    console.error(err);
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
