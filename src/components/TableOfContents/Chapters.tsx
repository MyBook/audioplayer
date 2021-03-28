import React from "react";
import {
  Chapter,
  TableOfContentsWrapper,
  Timing,
} from "components/TableOfContents/index.styled";
import timeFormatter from "components/utils/timeFormatter";
import PerfectScrollbar from "react-perfect-scrollbar";
import truncate from "utils/truncate";
import {
  longHeaderSize,
  shortHeaderSize,
} from "components/TableOfContents/Episodes";

export default function Chapters(props) {
  const {
    currentChapterNumber,
    files,
    changeChapter,
    handlePlay,
    currentTime,
    duration,
  } = props;

  const chapters = files.map((file, i) => {
    const { title, seconds } = file;
    const isActive = currentChapterNumber === i;
    let titleText = `Глава ${i + 1}`;

    if (title) {
      titleText = truncate(title, isActive ? shortHeaderSize : longHeaderSize);
    }

    const wrapperTitle = title ? title : titleText;

    return (
      <Chapter
        key={i}
        title={wrapperTitle}
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
            ? `${timeFormatter(currentTime)} — ${timeFormatter(duration)}`
            : timeFormatter(seconds)}
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
