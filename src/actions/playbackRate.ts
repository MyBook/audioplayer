import { CHANGE_PLAYBACK_RATE, PLAYBACK_CONTROL_RATE_TRIGGER } from "types";

export function playbackControlRateTriggerAction(
  isPlaybackRateControlShow: boolean
) {
  return {
    type: PLAYBACK_CONTROL_RATE_TRIGGER,
    payload: !isPlaybackRateControlShow
  } as const;
}

export function changePlaybackRateAction(playbackRate: number) {
  return {
    type: CHANGE_PLAYBACK_RATE,
    payload: playbackRate
  } as const;
}
