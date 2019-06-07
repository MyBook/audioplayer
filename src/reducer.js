const player = global.IS_BROWSER ? new Audio() : {};
const initialState = {
  isFetched: false,
  isFetching: false,
  book: {},
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
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_FREE_FRAGMENT":
      return {
        ...state,
        isFreeFragment: action.payload,
      };

    case "START_FETCHING":
      return {
        ...state,
        isFetching: true,
      };

    case "GET_BOOK_FROM_SERVER":
      return {
        ...state,
        book: action.payload,
        isFetched: true,
        isFetching: false,
      };

    case "CHANGE_SOURCE":
      return {
        ...state,
        src: action.payload.src,
        currentChapterNumber: action.payload.currentChapterNumber,
        duration: 0,
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
        duration: action.payload.duration,
      };

    case "TIME_UPDATE":
      return {
        ...state,
        currentTime: action.payload,
      };

    case "TABLE_OF_CONTENTS_TRIGGER":
      return {
        ...state,
        isTableOfContentsShow: action.payload,
      };

    case "PLAYBACK_CONTROL_RATE_TRIGGER":
      return {
        ...state,
        isPlaybackRateControlShow: action.payload,
      };

    case "BOOKMARKS_CONFLICT_NOTIFICATION_SHOW":
      return {
        ...state,
        isBookmarksConflictNotificationShow: true,
        serverBookMark: action.payload,
      };

    case "BOOKMARKS_CONFLICT_NOTIFICATION_HIDE":
      return {
        ...state,
        isBookmarksConflictNotificationShow: false,
      };

    case "SET_SERVER_BOOKMARK":
      return {
        ...state,
        serverBookMark: action.payload,
      };

    case "CHANGE_PLAYBACK_RATE":
      return {
        ...state,
        playbackRate: action.payload,
      };

    case "CHANGE_VOLUME":
      return {
        ...state,
        volume: action.payload,
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

    case "CHANGE_BOOK":
      return initialState;

    default:
      return state;
  }
}
