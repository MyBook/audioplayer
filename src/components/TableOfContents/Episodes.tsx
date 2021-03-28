import React from "react";
import {
  Chapter,
  TableOfContentsWrapper,
  Timing,
} from "components/TableOfContents/index.styled";
import timeFormatter from "components/utils/timeFormatter";
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
            ? `${timeFormatter(currentTime)} — ${timeFormatter(duration)}`
            : timeFormatter(seconds)}
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
