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
  getAutoBookmark: (bookId: number) => string;
  setAutoBookmark: () => string;
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
  book: Book;
  series: Series;
  isPodcastOrLecture: boolean;
  player: HTMLAudioElement;
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
