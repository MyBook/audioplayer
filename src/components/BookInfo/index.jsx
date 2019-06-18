//@flow
import React from "react";
import {
  Cover,
  Title,
  BookInfoWrapper,
  CoverWrapper,
  CoverPlaceholder,
  TitlePlaceholder,
  ChapterPlaceholder,
} from "components/BookInfo/index.styled";
import truncate from "utils/truncate";
import type { Book } from "playerConstants";

type Props = {
  currentChapterNumber: number,
  isFetched: boolean,
  book?: Book,
};

export default function(props: Props) {
  const { currentChapterNumber, book = {}, isFetched, Link } = props;
  const { name, bookLink, default_image } = book;
  const maxBookTitleLength = 35;

  if (isFetched) {
    return (
      <BookInfoWrapper>
        <Link to={bookLink} className="clear-links-style">
          <CoverWrapper>
            <Cover src={default_image} alt={name} />
          </CoverWrapper>
        </Link>
        <div>
          <Link to={bookLink} className="clear-links-style">
            <Title>{truncate(name, maxBookTitleLength)}</Title>
          </Link>
          Глава {currentChapterNumber + 1}
        </div>
      </BookInfoWrapper>
    );
  }
  return (
    <BookInfoWrapper>
      <CoverPlaceholder />
      <div>
        <TitlePlaceholder />
        <ChapterPlaceholder />
      </div>
    </BookInfoWrapper>
  );
}
