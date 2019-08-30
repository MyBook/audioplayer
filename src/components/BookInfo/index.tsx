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
import { Book } from "types";
import {Link} from "react-router-dom";

type Props = {
  currentChapterNumber: number;
  isFetched: boolean;
  book?: Book;
  Link: Link
  isPodcastOrLecture: boolean
};

export default function(props: Props) {
  const {
    currentChapterNumber,
    book = {},
    isFetched,
    Link,
    isPodcastOrLecture,
  } = props;

  if (isFetched && book.name) {
  const { name, bookLink, default_image } = book;
  const maxBookTitleLength = isPodcastOrLecture ? 60 : 35;
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
          {!isPodcastOrLecture && <>Глава {currentChapterNumber + 1}</>}
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
