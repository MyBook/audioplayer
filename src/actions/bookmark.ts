import {
  BOOKMARKS_CONFLICT_NOTIFICATION_HIDE,
  BOOKMARKS_CONFLICT_NOTIFICATION_SHOW,
  SET_BOOKMARK,
  SET_SERVER_BOOKMARK,
} from "types";

export function bookmarksConflictNotificationShowAction(result: any) {
  return {
    type: BOOKMARKS_CONFLICT_NOTIFICATION_SHOW,
    payload: result,
  } as const;
}

export function setServerBookmarkAction(result: any) {
  return {
    type: SET_SERVER_BOOKMARK,
    payload: result,
  } as const;
}

export function setBookmarkAction(result: any) {
  return { type: SET_BOOKMARK, payload: result } as const;
}

export function bookmarksConflictNotificationHideAction() {
  return { type: BOOKMARKS_CONFLICT_NOTIFICATION_HIDE } as const;
}
