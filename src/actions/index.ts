import * as init from "actions/init";
import * as bookmark from "actions/bookmark";
import * as playbackRate from "actions/playbackRate";
import * as playerControl from "actions/playerControl";
import * as statistics from "actions/statistics";
import * as tableOfContents from "actions/tableOfContents";
import * as volume from "actions/volume";

export default {
  ...init,
  ...bookmark,
  ...playbackRate,
  ...playerControl,
  ...statistics,
  ...tableOfContents,
  ...volume,
};
