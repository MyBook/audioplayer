import tracking from "components/utils/tracking";
import { changeSource, tableOfContentsTrigger } from "actions/tableOfContents";

export const tableOfContentsShowTrigger = () => async (
  dispatch: Function,
  getState: Function,
) => {
  const { isTableOfContentsShow } = getState();

  dispatch(tableOfContentsTrigger(isTableOfContentsShow));

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
    player.currentTime = 0;

    dispatch(changeSource({ url, fileNumber }));
    tracking("onChangeChapter");
  }
};
