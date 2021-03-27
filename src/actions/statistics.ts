import { SEND_STATISTICS } from "types";

export function sendStatisticsAction() {
  return { type: SEND_STATISTICS } as const;
}
