import React from "react";
import {
  Chapter,
  TableOfContentsWrapper,
  Timing,
} from "components/TableOfContents/index.styled";
import timeFormat from "components/utils/timeFormat";
import PerfectScrollbar from "react-perfect-scrollbar";
import truncate from "utils/truncate";

export const longHeaderSize = 30;
export const shortHeaderSize = 17;

export default function Episodes(props) {
  const { series, currentBookId, changeBook, currentTime, duration } = props;

  const episodes = series.books.map(({ name, id, seconds }, i) => {
    const isCurrentBook = id === currentBookId;

    return (
      <Chapter
        key={i}
        title={name}
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
