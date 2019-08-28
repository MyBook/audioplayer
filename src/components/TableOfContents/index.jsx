//@flow
import React from "react";
import {
  Author,
  Title,
  Cover,
  CoverWrapper,
  DropdownContainer,
  DropdownHeader,
  DropDownIconWrapper,
  DropdownWrapper,
  TypeWrapper,
} from "components/TableOfContents/index.styled";
import Dropdown from "components/Dropdown";
import ChaptersIcon from "components/Icons/Chapters";
import { connect } from "react-redux";
import { changeChapter, handlePlay, tableOfContentsShowTrigger } from "actions";
import truncate from "utils/truncate";
import TypeIcons from "components/TypeIcons";
import Chapters from "components/TableOfContents/Chapters";
import Episodes from "components/TableOfContents/Episodes";
import plural, { episodesPlural } from "utils/plural";

function TableOfContents({
  isTableOfContentsShow,
  tableOfContentsShowTrigger,
  currentChapterNumber,
  book = {},
  handlePlay,
  changeChapter,
  currentTime,
  duration,
  isFetched,
  Link,
  series,
  isPodcastOrLecture,
  changeBook,
}) {
  const icon = (
    <ChaptersIcon
      onClick={tableOfContentsShowTrigger}
      isActive={isTableOfContentsShow}
      isFetched={isFetched}
      className="dropdown-trigger-button jest-player-table-of-contents-button"
    />
  );

  if (!isFetched) {
    return <DropDownIconWrapper>{icon}</DropDownIconWrapper>;
  }

  const {
    name,
    bookLink,
    authorLink,
    authorName,
    default_image,
    type,
    id: currentBookId,
  } = book;
  return (
    <DropDownIconWrapper>
      {isTableOfContentsShow && (
        <Dropdown trigger={tableOfContentsShowTrigger}>
          <DropdownContainer>
            <DropdownWrapper>
              <DropdownHeader>
                <Link
                  to={isPodcastOrLecture ? series.url : bookLink}
                  className="clear-links-style"
                >
                  <CoverWrapper isPodcastOrLecture={isPodcastOrLecture}>
                    <Cover
                      isPodcastOrLecture={isPodcastOrLecture}
                      src={isPodcastOrLecture ? series.cover : default_image}
                      alt=""
                    />
                  </CoverWrapper>
                </Link>
                <div>
                  <TypeWrapper>
                    {
                      TypeIcons("#9B9B9B", {
                        audiobook: "аудиокнига",
                        podcast: "подкаст",
                        lecture: "лекция",
                      })[type]
                    }
                  </TypeWrapper>
                  {isPodcastOrLecture && (
                    <TypeWrapper>
                      {series.bookCount}{" "}
                      {plural(series.bookCount, ...episodesPlural)}
                    </TypeWrapper>
                  )}
                  <Link
                    to={isPodcastOrLecture ? series.url : bookLink}
                    className="clear-links-style"
                  >
                    <Title>
                      {truncate(isPodcastOrLecture ? series.name : name, 25)}
                    </Title>
                  </Link>
                  <Link to={authorLink} className="clear-links-style">
                    <Author>{authorName}</Author>
                  </Link>
                </div>
              </DropdownHeader>
              {isPodcastOrLecture ? (
                <Episodes
                  series={series}
                  changeBook={changeBook}
                  currentBookId={currentBookId}
                  currentTime={currentTime}
                  duration={duration}
                />
              ) : (
                <Chapters
                  currentChapterNumber={currentChapterNumber}
                  changeChapter={changeChapter}
                  currentTime={currentTime}
                  duration={duration}
                  files={book.files}
                  handlePlay={handlePlay}
                />
              )}
            </DropdownWrapper>
          </DropdownContainer>
        </Dropdown>
      )}
      {icon}
    </DropDownIconWrapper>
  );
}

const mapStateToProps = ({
  book,
  series,
  isPodcastOrLecture,
  currentChapterNumber,
  isTableOfContentsShow,
  currentTime,
  duration,
  isFetched,
}) => ({
  book,
  series,
  isPodcastOrLecture,
  currentChapterNumber,
  isTableOfContentsShow,
  currentTime,
  duration,
  isFetched,
});

export default connect(
  mapStateToProps,
  {
    handlePlay,
    changeChapter,
    tableOfContentsShowTrigger,
  },
)(TableOfContents);
