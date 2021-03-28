import actions from "actions";
import { Link } from "react-router-dom";

export interface Book {
  id: number;
  name: string;
  default_image: string;
  bookLink: string;
  authorLink: string;
  authorName: string;
}

/**
 * хз как перевести "серия" на английский, поэтому series тут и далее подразумевает одну серию, а не несколько
 */
export interface Series {
  id: number;
  name: string;
  url: string;
  cover: string;
  bookCount: number;
}

export type SeriesAdaptor = (series: {}) => Series;
export type BookAdaptor = (book: {}) => Book;
export type BookId = number;
export type Time = number;
export type OnChangeBook = () => void;

export type ServerBookmark = {
  book: Book;
  bookmarked_at: string;
  file: {
    id: number;
    uri: string;
  };
  id: number;
  position: number;
  uri: string;
};

export interface Urls {
  getBook: (bookId: number) => string;
  getAutoBookmark: (bookId: number) => { url: string; version: number };
  setAutoBookmark: () => { url: string; version: number };
  setStatistics: () => string;
}

export interface Styles {
  almostWhite: string;
  primary: string;
  gray: string;
  borderRadius: string;
}

export interface Options {
  isEnableAutoplay: boolean;
  Link: Link;
  TrialMessage: Element;
  isFreeFragment: boolean;
  styles: Styles;
  urls: Urls;
  bookAdaptor: BookAdaptor;
  seriesAdaptor: SeriesAdaptor;
}

export interface TrackingFunctions {
  onPlay: () => void;
  onPause: () => void;
  onForward: () => void;
  onBackward: () => void;
  onChangeVolume: () => void;
  onMute: () => void;
  onChangeTempo: () => void;
  onOpenTempo: () => void;
  onChangeChapter: () => void;
  onOpenTableOfContents: () => void;
  onKeyMute: () => void;
  onKeyForward: () => void;
  onKeyBackward: () => void;
  onKeyPause: () => void;
  onKeyPlay: () => void;
}

export interface PlayerProps extends Options {
  isFreeFragment: boolean;
  isFetched: boolean;
  isBookmarksConflictNotificationShow: boolean;
  bookId: BookId;
  changeBook: () => void;
  init: (
    isFreeFragment: boolean,
    urls: Urls,
    onChangeBook: OnChangeBook,
    onCompleteBookListeningHandler: () => void,
  ) => void;
  getAutoBookmarkFromServer: (bookId: BookId, urls: Urls) => void;
  getBook: (
    bookId: BookId,
    urls: Urls,
    bookAdaptor: BookAdaptor,
    seriesAdaptor: SeriesAdaptor,
  ) => void;
  handleTimeUpdate: (time: Time) => void;
  handlePlay: () => void;
  handlePause: (urls: Urls) => void;
  resetPlayer: (urls: Urls) => void;
  applyServerBookmark: () => void;
  changeVolume: () => void;
  muteTrigger: () => void;
  hidePlayer: () => void;
  onCompleteBookListeningHandler: () => void;
  currentTime: number;
  duration: number;
  currentChapterNumber: number;
  volume: number;
  isPodcastOrLecture: boolean;
  is404Error: boolean;
  isEnableAutoplay: boolean;
  book: Book;
}

export interface InitialState {
  isFetched: boolean;
  isFetching: boolean;
  book: Book | {};
  series: Series | {};
  isPodcastOrLecture: boolean;
  player: HTMLAudioElement | {};
  isPlaying: boolean;
  isTableOfContentsShow: boolean;
  isPlaybackRateControlShow: boolean;
  src: string;
  currentTime: number;
  duration: number;
  currentChapterNumber: number;
  isBookmarksConflictNotificationShow: boolean;
  serverBookMark: ServerBookmark | {};
  playbackRate: number;
  volume: number;
  statisticsSeconds: number;
  isFreeFragment: boolean;
  isNeedToTimeUpdate: boolean;
  is404Error: boolean;
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

export const SET_FREE_FRAGMENT = "SET_FREE_FRAGMENT";
export const START_FETCHING = "START_FETCHING";
export const GET_BOOK = "GET_BOOK";
export const GET_SERIES = "GET_SERIES";
export const CAN_PLAY = "CAN_PLAY";
export const CHANGE_SOURCE = "CHANGE_SOURCE";
export const PLAY = "PLAY";
export const PAUSE = "PAUSE";
export const LOADED_META_DATA = "LOADED_META_DATA";
export const TIME_UPDATE = "TIME_UPDATE";
export const TABLE_OF_CONTENTS_TRIGGER = "TABLE_OF_CONTENTS_TRIGGER";
export const PLAYBACK_CONTROL_RATE_TRIGGER = "PLAYBACK_CONTROL_RATE_TRIGGER";
export const BOOKMARKS_CONFLICT_NOTIFICATION_SHOW =
  "BOOKMARKS_CONFLICT_NOTIFICATION_SHOW";
export const BOOKMARKS_CONFLICT_NOTIFICATION_HIDE =
  "BOOKMARKS_CONFLICT_NOTIFICATION_HIDE";
export const SET_SERVER_BOOKMARK = "SET_SERVER_BOOKMARK";
export const CHANGE_PLAYBACK_RATE = "CHANGE_PLAYBACK_RATE";
export const CHANGE_VOLUME = "CHANGE_VOLUME";
export const ADD_STATISTICS_SECONDS = "ADD_STATISTICS_SECONDS";
export const SEND_STATISTICS = "SEND_STATISTICS";
export const NEED_TO_TIME_UPDATE = "NEED_TO_TIME_UPDATE";
export const NO_NEED_TO_TIME_UPDATE = "NO_NEED_TO_TIME_UPDATE";
export const SET_404_ERROR = "SET_404_ERROR";
export const RESET_PLAYER = "RESET_PLAYER";
export const SET_BOOKMARK = "SET_BOOKMARK";
export const INIT = "INIT";
