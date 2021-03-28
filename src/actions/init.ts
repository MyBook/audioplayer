import {
  ADD_STATISTICS_SECONDS,
  CAN_PLAY,
  GET_BOOK,
  GET_SERIES,
  NO_NEED_TO_TIME_UPDATE,
  LOADED_META_DATA,
  SET_404_ERROR,
  START_FETCHING,
  INIT,
  NEED_TO_TIME_UPDATE,
} from "types";

export function loadMetaDataAction(duration: number) {
  return {
    type: LOADED_META_DATA,
    payload: { duration },
  } as const;
}

export function canPlayAction() {
  return { type: CAN_PLAY } as const;
}

export function noNeedToTimeUpdateAction() {
  return { type: NO_NEED_TO_TIME_UPDATE } as const;
}

export function needToTimeUpdateAction() {
  return { type: NEED_TO_TIME_UPDATE } as const;
}

export function set404ErrorAction() {
  return { type: SET_404_ERROR } as const;
}

export function addStatisticsSecondsAction() {
  return {
    type: ADD_STATISTICS_SECONDS,
  } as const;
}

export function startFetchingAction() {
  return {
    type: START_FETCHING,
  } as const;
}

export function initAction() {
  return { type: INIT } as const;
}

export function getSeriesAction({
  series,
  books,
}: {
  series: any;
  books: any;
}) {
  return {
    type: GET_SERIES,
    payload: { ...series, books },
  } as const;
}

export function getBookAction({
  book,
  isPodcastOrLecture,
}: {
  book: any;
  isPodcastOrLecture: boolean;
}) {
  return {
    type: GET_BOOK,
    payload: { book, isPodcastOrLecture },
  } as const;
}
