import React from "react";
import {
  Chapter,
  TableOfContentsWrapper,
  Timing,
} from "components/TableOfContents/index.styled";
import timeFormatter from "components/utils/timeFormatter";
import PerfectScrollbar from "react-perfect-scrollbar";

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
    return (
      <Chapter
        key={i}
        className={`jest-player-chapter-${i + 1}`}
        active={currentChapterNumber === i}
        onClick={async () => {
          await changeChapter(i);
          await handlePlay();
        }}
      >
        Глава {i + 1}
        <Timing>
          {i === currentChapterNumber
            ? `${timeFormatter(currentTime)} — ${timeFormatter(duration)}`
            : timeFormatter(file.seconds)}
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
