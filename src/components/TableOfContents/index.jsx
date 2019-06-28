//@flow
import React from "react";
import {
  TableOfContentsWrapper,
  Chapter,
  Timing,
  Author,
  Title,
  Cover,
  CoverWrapper,
  DropdownContainer,
  DropdownHeader,
  DropDownIconWrapper,
  DropdownWrapper,
  TypeWrapper,
  PowerOffWrapper,
} from "components/TableOfContents/index.styled";
import Dropdown from "components/Dropdown";
import ChaptersIcon from "components/Icons/Chapters";
import { connect } from "react-redux";
import { changeChapter, handlePlay, tableOfContentsShowTrigger } from "actions";
import truncate from "utils/truncate";
import timeFormat from "components/utils/timeFormat";
import PerfectScrollbar from "react-perfect-scrollbar";
import TypeIcons from "components/TypeIcons";
import PowerOff from "components/Icons/PowerOff";

function Chapters(props) {
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
        active={currentChapterNumber === i}
        onClick={async () => {
          await changeChapter(i);
          await handlePlay();
        }}
      >
        Глава {i + 1}
        <Timing>
          {i === currentChapterNumber
            ? `${timeFormat(currentTime)} — ${timeFormat(duration)}`
            : timeFormat(file.seconds)}
        </Timing>
      </Chapter>
    );
  });

  return (
    <PerfectScrollbar>
      <TableOfContentsWrapper>{chapters}</TableOfContentsWrapper>
    </PerfectScrollbar>
  );
}

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
  hidePlayer,
}) {
  const icon = (
    <ChaptersIcon
      onClick={tableOfContentsShowTrigger}
      isActive={isTableOfContentsShow}
      isFetched={isFetched}
      className="dropdown-trigger-button"
    />
  );

  if (!isFetched) {
    return <DropDownIconWrapper>{icon}</DropDownIconWrapper>;
  }

  const { name, bookLink, authorLink, authorName, default_image, type } = book;
  return (
    <DropDownIconWrapper>
      {isTableOfContentsShow && (
        <Dropdown trigger={tableOfContentsShowTrigger}>
          <DropdownContainer>
            <DropdownWrapper>
              <PowerOffWrapper onClick={hidePlayer}>
                <PowerOff /> Выключить плеер
              </PowerOffWrapper>
              <DropdownHeader>
                <Link to={bookLink} className="clear-links-style">
                  <CoverWrapper>
                    <Cover src={default_image} alt="" />
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
                  <Link to={bookLink} className="clear-links-style">
                    <Title>{truncate(name, 25)}</Title>
                  </Link>
                  <Link to={authorLink} className="clear-links-style">
                    <Author>{authorName}</Author>
                  </Link>
                </div>
              </DropdownHeader>
              <Chapters
                currentChapterNumber={currentChapterNumber}
                changeChapter={changeChapter}
                currentTime={currentTime}
                duration={duration}
                files={book.files}
                handlePlay={handlePlay}
              />
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
  currentChapterNumber,
  isTableOfContentsShow,
  currentTime,
  duration,
  isFetched,
}) => ({
  book,
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
