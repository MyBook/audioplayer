import React from "react";
import {
  Chapter,
  TableOfContentsWrapper,
  Timing,
} from "components/TableOfContents/index.styled";
import timeFormat from "components/utils/timeFormat";
import PerfectScrollbar from "react-perfect-scrollbar";
import truncate from "utils/truncate";

export default function Chapters(props) {
  const {
    currentChapterNumber,
    files,
    changeChapter,
    handlePlay,
    currentTime,
    duration,
  } = props;

  const maxTitlesLength = 20;

  const chapters = files.map((file, i) => {
    const { title, seconds } = file;
    const isActive = currentChapterNumber === i;
    let titleText = `Глава ${i + 1}`;

    if (title) {
      titleText = isActive ? truncate(title, maxTitlesLength) : title;
    }

    return (
      <Chapter
        key={i}
        className={`jest-player-chapter-${i + 1}`}
        active={isActive}
        onClick={async () => {
          await changeChapter(i);
          await handlePlay();
        }}
      >
        {titleText}
        <Timing>
          {i === currentChapterNumber
            ? `${timeFormat(currentTime)} — ${timeFormat(duration)}`
            : timeFormat(seconds)}
        </Timing>
      </Chapter>
    );
  });

  return (
    <PerfectScrollbar className="table-of-contents">
      <TableOfContentsWrapper>{chapters}</TableOfContentsWrapper>
    </PerfectScrollbar>
  );
}
