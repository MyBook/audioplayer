//@flow
import React, { PureComponent } from "react";
import type { ComponentType } from "react";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import { hot } from "react-hot-loader/root";
import {
  ContentWrapper,
  PlayerWrapper,
  IconsWrapper,
  FooterBottomSpace,
  ControlWrapper,
} from "index.styled";
import * as actions from "actions";
import Timeline from "components/Timeline";
import BookInfo from "components/BookInfo";
import Notification from "components/Notification";
import TableOfContents from "components/TableOfContents";
import VolumeControl from "components/VolumeControl";
import PlaybackRateControl from "components/PlaybackRateControl";
import BackwardIcon from "components/Icons/Backward";
import ForwardIcon from "components/Icons/Forward";
import PlayPauseButton from "components/PlayPauseButton";
import FreeFragmentMessage from "components/FreeFragmentMessage";
import ErrorBoundary from "components/ErrorBoundary";
import { defaultForwardSecondsCount } from "utils/playerConstants";
import type { Book, TrialMessageProps, styles } from "utils/playerConstants";
import PowerOff, { PowerOffIconWrapper } from "components/Icons/PowerOff";
import { Wrapper as PlaybackRateWrapper } from "components/PlaybackRateControl/index.styled";

type Props = {
  TrialMessage: ComponentType<TrialMessageProps>,
  Link: ComponentType<Link>,
  isFreeFragment: boolean,
  isFetched: boolean,
  isBookmarksConflictNotificationShow: boolean,
  bookId: number,
  changeBook: Function,
  init: Function,
  getAutoBookmarkFromServer: Function,
  getBook: Function,
  handleTimeUpdate: Function,
  handlePlay: Function,
  handlePause: Function,
  resetPlayer: Function,
  applyServerBookmark: Function,
  changeVolume: Function,
  muteTrigger: Function,
  bookAdaptor: Function,
  seriesAdaptor: Function,
  hidePlayer: Function,
  currentTime: number,
  duration: number,
  currentChapterNumber: number,
  volume: number,
  book: Book,
  styles: styles,
  urls: {},
};

class Player extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.init(this.props.isFreeFragment);
  }

  async componentWillUnmount() {
    const { handlePause, urls } = this.props;

    handlePause(urls);
  }

  componentDidUpdate(prevProps) {
    const { bookId, resetPlayer, isFreeFragment } = this.props;

    if (bookId !== prevProps.bookId) {
      resetPlayer();
      this.init(isFreeFragment);
    }
  }

  init = async isFreeFragment => {
    const {
      init,
      getAutoBookmarkFromServer,
      getBook,
      bookId,
      urls,
      bookAdaptor,
      seriesAdaptor,
    } = this.props;

    await getBook(bookId, urls, bookAdaptor, seriesAdaptor);
    await init(isFreeFragment, urls);
    await getAutoBookmarkFromServer(bookId, urls);
  };

  handleBackward = () => {
    const { handleTimeUpdate, currentTime } = this.props;
    const newTime = currentTime - defaultForwardSecondsCount;

    if (newTime > 0) {
      handleTimeUpdate(newTime);
    } else {
      handleTimeUpdate(0);
    }
  };

  handleForward = () => {
    const { handleTimeUpdate, currentTime } = this.props;
    handleTimeUpdate(currentTime + defaultForwardSecondsCount);
  };

  render() {
    const {
      handlePlay,
      handlePause,
      book,
      currentTime,
      duration,
      handleTimeUpdate,
      currentChapterNumber,
      isFetched,
      isBookmarksConflictNotificationShow,
      applyServerBookmark,
      changeVolume,
      muteTrigger,
      volume,
      isFreeFragment,
      TrialMessage,
      styles,
      Link,
      urls,
      hidePlayer,
      changeBook,
    } = this.props;

    return (
      <ThemeProvider theme={styles}>
        <PlayerWrapper className="player-wrapper">
          <ErrorBoundary>
            {isFreeFragment && isFetched && (
              <FreeFragmentMessage {...book} TrialMessage={TrialMessage} />
            )}
            <FooterBottomSpace />
            {isBookmarksConflictNotificationShow && (
              <Notification
                bodyText="Обнаружена закладка"
                buttonText="Перейти"
                onButtonClick={applyServerBookmark}
              />
            )}
            <ContentWrapper className="jest-content-wrapper">
              <Timeline
                currentTime={currentTime}
                duration={duration}
                handleTimeUpdate={handleTimeUpdate}
                handlePlay={handlePlay}
                handlePause={() => handlePause(urls)}
                isFetched={isFetched}
              />
              <ControlWrapper>
                <BookInfo
                  book={book}
                  currentChapterNumber={currentChapterNumber}
                  isFetched={isFetched}
                  Link={Link}
                />

                <IconsWrapper>
                  {!isFreeFragment ? (
                    <TableOfContents
                      Link={Link}
                      hidePlayer={hidePlayer}
                      changeBook={changeBook}
                    />
                  ) : (
                    <PowerOffIconWrapper>
                      <PowerOff onClick={hidePlayer} isFetched={isFetched} />
                    </PowerOffIconWrapper>
                  )}
                  <BackwardIcon
                    onClick={this.handleBackward}
                    isFetched={isFetched}
                  />
                  <PlayPauseButton isFetched={isFetched} urls={urls} />
                  <ForwardIcon
                    onClick={this.handleForward}
                    isFetched={isFetched}
                  />
                  {!isFreeFragment ? (
                    <PlaybackRateControl isFetched={isFetched} />
                  ) : (
                    <PlaybackRateWrapper />
                  )}
                </IconsWrapper>

                <VolumeControl
                  changeVolume={changeVolume}
                  muteTrigger={muteTrigger}
                  volume={volume}
                  isFetched={isFetched}
                />
              </ControlWrapper>
            </ContentWrapper>
          </ErrorBoundary>
        </PlayerWrapper>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({
  book,
  isFetched,
  isFetching,
  isPlaying,
  currentTime,
  duration,
  currentChapterNumber,
  isTableOfContentsShow,
  isPaybackSpeedControlShow,
  playbackRate,
  volume,
  isBookmarksConflictNotificationShow,
}) => ({
  book,
  isFetched,
  isFetching,
  isPlaying,
  currentTime,
  duration,
  currentChapterNumber,
  isTableOfContentsShow,
  isPaybackSpeedControlShow,
  playbackRate,
  volume,
  isBookmarksConflictNotificationShow,
});

export default hot(
  connect(
    mapStateToProps,
    {
      ...actions,
    },
  )(Player),
);
