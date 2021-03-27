import {
  ActionTypes,
  ADD_STATISTICS_SECONDS,
  BOOKMARKS_CONFLICT_NOTIFICATION_HIDE,
  BOOKMARKS_CONFLICT_NOTIFICATION_SHOW,
  CAN_PLAY,
  CHANGE_PLAYBACK_RATE,
  CHANGE_SOURCE,
  CHANGE_VOLUME,
  GET_BOOK,
  GET_SERIES,
  InitialState,
  NEED_TO_TIME_UPDATE,
  NO_NEED_TO_TIME_UPDATE,
  LOADED_META_DATA,
  PAUSE,
  PLAY,
  PLAYBACK_CONTROL_RATE_TRIGGER,
  RESET_PLAYER,
  SEND_STATISTICS,
  SET_404_ERROR,
  SET_FREE_FRAGMENT,
  SET_SERVER_BOOKMARK,
  START_FETCHING,
  TABLE_OF_CONTENTS_TRIGGER,
  TIME_UPDATE
} from "types";

// @ts-ignore
const player = typeof Audio !== "undefined" ? new Audio() : {};

const initialState: InitialState = {
  isFetched: false,
  isFetching: false,
  book: {},
  series: {},
  isPodcastOrLecture: false,
  player: player,
  isPlaying: false,
  isTableOfContentsShow: false,
  isPlaybackRateControlShow: false,
  src: "",
  currentTime: 0,
  duration: 0,
  currentChapterNumber: 0,
  isBookmarksConflictNotificationShow: false,
  serverBookMark: {},
  playbackRate: 1,
  volume: 1,
  statisticsSeconds: 0,
  isFreeFragment: true,
  isNeedToTimeUpdate: false,
  is404Error: false
};

export default function(
  state = initialState,
  action: ActionTypes
): InitialState {
  switch (action.type) {
    case SET_FREE_FRAGMENT:
      return {
        ...state,
        isFreeFragment: action.payload
      };

    case START_FETCHING:
      return {
        ...state,
        isFetching: true
      };

    case GET_BOOK:
      return {
        ...state,
        book: action.payload.book,
        isPodcastOrLecture: action.payload.isPodcastOrLecture
      };

    case GET_SERIES:
      return {
        ...state,
        series: action.payload
      };

    case CAN_PLAY:
      return {
        ...state,
        isFetched: true,
        isFetching: false
      };

    case CHANGE_SOURCE:
      return {
        ...state,
        src: action.payload.src,
        currentChapterNumber: action.payload.currentChapterNumber,
        duration: 0,
        isFetched: false,
        isFetching: true
      };

    case PLAY:
      return {
        ...state,
        isPlaying: true
      };

    case PAUSE:
      return {
        ...state,
        isPlaying: false
      };

    case LOADED_META_DATA:
      return {
        ...state,
        duration: action.payload.duration
      };

    case TIME_UPDATE:
      return {
        ...state,
        currentTime: action.payload
      };

    case TABLE_OF_CONTENTS_TRIGGER:
      return {
        ...state,
        isTableOfContentsShow: action.payload
      };

    case PLAYBACK_CONTROL_RATE_TRIGGER:
      return {
        ...state,
        isPlaybackRateControlShow: action.payload
      };

    case BOOKMARKS_CONFLICT_NOTIFICATION_SHOW:
      return {
        ...state,
        isBookmarksConflictNotificationShow: true,
        serverBookMark: action.payload
      };

    case BOOKMARKS_CONFLICT_NOTIFICATION_HIDE:
      return {
        ...state,
        isBookmarksConflictNotificationShow: false
      };

    case SET_SERVER_BOOKMARK:
      return {
        ...state,
        serverBookMark: action.payload
      };

    case CHANGE_PLAYBACK_RATE:
      return {
        ...state,
        playbackRate: action.payload
      };

    case CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload
      };

    case ADD_STATISTICS_SECONDS:
      return {
        ...state,
        statisticsSeconds: state.statisticsSeconds + 1
      };

    case SEND_STATISTICS:
      return {
        ...state,
        statisticsSeconds: 0
      };

    case NEED_TO_TIME_UPDATE:
      return {
        ...state,
        isNeedToTimeUpdate: true
      };

    case NO_NEED_TO_TIME_UPDATE:
      return {
        ...state,
        isNeedToTimeUpdate: false
      };

    case SET_404_ERROR:
      return {
        ...state,
        is404Error: true
      };

    case RESET_PLAYER:
      return initialState;

    default:
      return state;
  }
}
