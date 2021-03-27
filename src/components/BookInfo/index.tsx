import React from "react";
import {
  Cover,
  Title,
  BookInfoWrapper,
  CoverWrapper,
  CoverPlaceholder,
  TitlePlaceholder,
  ChapterPlaceholder
} from "components/BookInfo/index.styled";
import truncate from "utils/truncate";
import { Book } from "types";
import { Link } from "react-router-dom";

type Props = {
  currentChapterNumber: number;
  isFetched: boolean;
  book?: Book;
  Link: Link;
  isPodcastOrLecture: boolean;
};

const maxTitlesLength = 20;

export default function(props: Props) {
  const {
    currentChapterNumber,
    book = {},
    isFetched,
    Link,
    isPodcastOrLecture
  } = props;

  if (isFetched && book.name) {
    const { name, bookLink, default_image, files } = book;
    const maxBookTitleLength = isPodcastOrLecture ? 60 : 35;
    let titleText = "";

    if (files && !isPodcastOrLecture) {
      const title = files[currentChapterNumber].title;
      titleText = title ? title : `Глава ${currentChapterNumber + 1}`;
    }

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
          <span title={titleText}>{truncate(titleText, maxTitlesLength)}</span>
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
