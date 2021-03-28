import { CHANGE_VOLUME } from "types";

export function changeVolumeAction(volume: number) {
  return {
    type: CHANGE_VOLUME,
    payload: volume,
  } as const;
}
