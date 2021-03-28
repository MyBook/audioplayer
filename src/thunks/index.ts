import * as init from "thunks/init";
import * as bookmark from "thunks/bookmark";
import * as playbackRate from "thunks/playbackRate";
import * as playerControl from "thunks/playerControl";
import * as statistics from "thunks/statistics";
import * as tableOfContents from "thunks/tableOfContents";
import * as volume from "thunks/volume";

export default {
  ...init,
  ...bookmark,
  ...playbackRate,
  ...playerControl,
  ...statistics,
  ...tableOfContents,
  ...volume,
};
