const player = typeof Audio !== "undefined" ? new Audio() : {};
const initialState = {
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
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_FREE_FRAGMENT":
      return {
        ...state,
        isFreeFragment: payload,
      };

    case "START_FETCHING":
      return {
        ...state,
        isFetching: true,
      };

    case "GET_BOOK":
      return {
        ...state,
        book: payload.book,
        isPodcastOrLecture: payload.isPodcastOrLecture,
      };

    case "GET_SERIES":
      return {
        ...state,
        series: payload,
      };

    case "CAN_PLAY":
      return {
        ...state,
        isFetched: true,
        isFetching: false,
      };

    case "CHANGE_SOURCE":
      return {
        ...state,
        src: payload.src,
        currentChapterNumber: payload.currentChapterNumber,
        duration: 0,
        isFetched: false,
        isFetching: true,
      };

    case "PLAY":
      return {
        ...state,
        isPlaying: true,
      };

    case "PAUSE":
      return {
        ...state,
        isPlaying: false,
      };

    case "LOADED_META_DATA":
      return {
        ...state,
        duration: payload.duration,
      };

    case "TIME_UPDATE":
      return {
        ...state,
        currentTime: payload,
      };

    case "TABLE_OF_CONTENTS_TRIGGER":
      return {
        ...state,
        isTableOfContentsShow: payload,
      };

    case "PLAYBACK_CONTROL_RATE_TRIGGER":
      return {
        ...state,
        isPlaybackRateControlShow: payload,
      };

    case "BOOKMARKS_CONFLICT_NOTIFICATION_SHOW":
      return {
        ...state,
        isBookmarksConflictNotificationShow: true,
        serverBookMark: payload,
      };

    case "BOOKMARKS_CONFLICT_NOTIFICATION_HIDE":
      return {
        ...state,
        isBookmarksConflictNotificationShow: false,
      };

    case "SET_SERVER_BOOKMARK":
      return {
        ...state,
        serverBookMark: payload,
      };

    case "CHANGE_PLAYBACK_RATE":
      return {
        ...state,
        playbackRate: payload,
      };

    case "CHANGE_VOLUME":
      return {
        ...state,
        volume: payload,
      };

    case "ADD_STATISTICS_SECONDS":
      return {
        ...state,
        statisticsSeconds: state.statisticsSeconds + 1,
      };

    case "SEND_STATISTICS":
      return {
        ...state,
        statisticsSeconds: 0,
      };

    case "IS_NEED_TO_TIME_UPDATE":
      return {
        ...state,
        isNeedToTimeUpdate: true,
      };

    case "IS_NO_NEED_TO_TIME_UPDATE":
      return {
        ...state,
        isNeedToTimeUpdate: false,
      };

    case "RESET_PLAYER":
      return initialState;

    default:
      return state;
  }
}
