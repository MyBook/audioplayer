import tracking from "components/utils/tracking";
import debounce from "utils/debounce";
import { changeVolumeAction } from "actions/volume";

const onChangeVolumeTracking = debounce(() => tracking("onChangeVolume"), 1000);

export const changeVolume = (volume: number) => async (
  dispatch: Function,
  getState: Function,
) => {
  const { player } = getState();

  localStorage.setItem("volume", volume.toString());
  player.volume = +volume;

  onChangeVolumeTracking();

  dispatch(changeVolumeAction(volume));
};

export const muteTrigger = () => async (
  dispatch: Function,
  getState: Function,
) => {
  const { volume } = getState();
  if (+volume !== 0) {
    localStorage.setItem("prevVolume", volume);
    dispatch(changeVolume(0));

    tracking("onMute");
  } else {
    const prevVolume = localStorage.getItem("prevVolume");

    if (prevVolume) {
      const newVolume = +prevVolume ? prevVolume : 1;

      dispatch(changeVolume(+newVolume));
    }
  }
};
