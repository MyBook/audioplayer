import {
  PAUSE,
  PLAY,
  RESET_PLAYER,
  SET_FREE_FRAGMENT,
  TIME_UPDATE
} from "types";

export function pauseAction() {
  return { type: PAUSE } as const;
}
export function playAction() {
  return { type: PLAY } as const;
}

export function timeUpdateAction(time: number) {
  return {
    type: TIME_UPDATE,
    payload: time
  } as const;
}

export function setFreeFragmentAction(isFreeFragment: boolean) {
  return {
    type: SET_FREE_FRAGMENT,
    payload: isFreeFragment
  } as const;
}

export function resetPlayerAction() {
  return {
    type: RESET_PLAYER
  } as const;
}
