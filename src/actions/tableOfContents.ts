import { CHANGE_SOURCE, TABLE_OF_CONTENTS_TRIGGER } from "types";

export function changeSource({
  fileNumber,
  url
}: {
  fileNumber: number;
  url: string;
}) {
  return {
    type: CHANGE_SOURCE,
    payload: { src: url, currentChapterNumber: fileNumber }
  } as const;
}

export function tableOfContentsTrigger(isTableOfContentsShow: boolean) {
  return {
    type: TABLE_OF_CONTENTS_TRIGGER,
    payload: !isTableOfContentsShow
  } as const;
}
