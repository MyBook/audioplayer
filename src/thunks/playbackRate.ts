import debounce from "utils/debounce";
import tracking from "components/utils/tracking";
import {
  changePlaybackRateAction,
  playbackControlRateTriggerAction
} from "actions/playbackRate";

const onChangeTempoTracking = debounce(() => tracking("onChangeTempo"), 1000);

export const playbackRateControlTrigger = () => async (
  dispatch: Function,
  getState: Function
) => {
  const { isPlaybackRateControlShow } = getState();

  if (!isPlaybackRateControlShow) {
    tracking("onOpenTempo");
  }
  dispatch(playbackControlRateTriggerAction(isPlaybackRateControlShow));
};

export const changePlaybackRate = (playbackRateRaw: number) => async (
  dispatch: Function,
  getState: Function
) => {
  const { player } = getState();
  let playbackRate = +(+playbackRateRaw).toFixed(2);
  const minPlaybackRate = 0.1;
  const maxPlaybackRate = 2.5;

  if (playbackRate < minPlaybackRate) playbackRate = 0;
  if (playbackRate > maxPlaybackRate) playbackRate = maxPlaybackRate;

  localStorage.setItem("playbackRate", playbackRate.toString());
  player.playbackRate = playbackRate;
  onChangeTempoTracking();
  dispatch(changePlaybackRateAction(playbackRate));
};
