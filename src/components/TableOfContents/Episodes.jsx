import React from "react";
import {
  Chapter,
  TableOfContentsWrapper,
  Timing,
} from "components/TableOfContents/index.styled";
import timeFormat from "components/utils/timeFormat";
import PerfectScrollbar from "react-perfect-scrollbar";
import truncate from "utils/truncate";

export default function Episodes(props) {
  const { series, currentBookId, changeBook, currentTime, duration } = props;

  const longHeaderSize = 30;
  const shortHeaderSize = 17;

  const episodes = series.books.map(({ name, id, seconds }, i) => {
    const isCurrentBook = id === currentBookId;
    return (
      <Chapter
        key={i}
        className={`jest-player-chapter-${i + 1}`}
        active={isCurrentBook}
        onClick={async () => {
          await changeBook(id);
        }}
      >
        {truncate(name, isCurrentBook ? shortHeaderSize : longHeaderSize)}
        <Timing>
          {isCurrentBook
            ? `${timeFormat(currentTime)} — ${timeFormat(duration)}`
            : timeFormat(seconds)}
        </Timing>
      </Chapter>
    );
  });

  return (
    <PerfectScrollbar className="table-of-contents">
      <TableOfContentsWrapper>{episodes}</TableOfContentsWrapper>
    </PerfectScrollbar>
  );
}
