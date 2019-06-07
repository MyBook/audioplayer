//@flow

import tracking from "components/utils/tracking";

export const tableOfContentsShowTrigger = () => async (
  dispatch: Function,
  getState: Function,
) => {
  const { isTableOfContentsShow } = getState();
  dispatch({
    type: "TABLE_OF_CONTENTS_TRIGGER",
    payload: !isTableOfContentsShow,
  });
  if (!isTableOfContentsShow) {
    tracking("onOpenTableOfContents");
  }
};

export const changeChapter = (fileNumber: number) => async (
  dispatch: Function,
  getState: Function,
) => {
  const {
    player,
    book,
    currentChapterNumber,
    volume,
    playbackRate,
  } = getState();

  if (currentChapterNumber !== fileNumber) {
    const { url } =
      book.files.length > fileNumber ? book.files[fileNumber] : book.files[0];
    player.src = url;
    player.volume = volume;
    player.playbackRate = playbackRate;

    dispatch({
      type: "CHANGE_SOURCE",
      payload: { src: url, currentChapterNumber: fileNumber },
    });
    tracking("onChangeChapter");
  }
};
