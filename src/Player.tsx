import React, { PureComponent } from "react";
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

import thunks from "thunks";
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
import PowerOff, { PowerOffIconWrapper } from "components/Icons/PowerOff";
import { removeEventsListeners } from "components/utils/keyboardEventsListeners";
import { InitialState, PlayerProps } from "types";

class Player extends PureComponent<PlayerProps> {
  constructor(props: PlayerProps) {
    super(props);
    this.init();
  }

  async componentWillUnmount() {
    const { resetPlayer, urls } = this.props;

    removeEventsListeners();
    resetPlayer(urls);
  }

  async componentDidUpdate(prevProps: PlayerProps) {
    const { bookId, resetPlayer, urls, isFreeFragment } = this.props;

    if (
      bookId !== prevProps.bookId ||
      isFreeFragment !== prevProps.isFreeFragment
    ) {
      await resetPlayer(urls);
      this.init();
    }
  }

  init = async () => {
    const {
      init,
      getAutoBookmarkFromServer,
      getBook,
      bookId,
      urls,
      bookAdaptor,
      seriesAdaptor,
      changeBook,
      handlePlay,
      isFreeFragment,
      isEnableAutoplay,
      onCompleteBookListeningHandler,
    } = this.props;
    try {
      await getBook(bookId, urls, bookAdaptor, seriesAdaptor);
      await init(
        isFreeFragment,
        urls,
        changeBook,
        onCompleteBookListeningHandler,
      );
      await getAutoBookmarkFromServer(bookId, urls);
      isEnableAutoplay && (await handlePlay());
    } catch (e) {
      console.error(e);
    }
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
      isPodcastOrLecture,
      is404Error,
    } = this.props;

    return (
      <ThemeProvider theme={styles}>
        <PlayerWrapper className="player-wrapper">
          <PowerOffIconWrapper>
            <PowerOff onClick={hidePlayer} />
          </PowerOffIconWrapper>
          <ErrorBoundary is404Error={is404Error}>
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
                  isPodcastOrLecture={isPodcastOrLecture}
                />
                <IconsWrapper>
                  {!isFreeFragment && (
                    <TableOfContents
                      Link={Link}
                      hidePlayer={hidePlayer}
                      changeBook={changeBook}
                    />
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
                  {!isFreeFragment && (
                    <PlaybackRateControl isFetched={isFetched} />
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
  isPodcastOrLecture,
  isFetched,
  isFetching,
  isPlaying,
  currentTime,
  duration,
  currentChapterNumber,
  isTableOfContentsShow,
  playbackRate,
  volume,
  isBookmarksConflictNotificationShow,
  is404Error,
}: InitialState) => ({
  book,
  isPodcastOrLecture,
  isFetched,
  isFetching,
  isPlaying,
  currentTime,
  duration,
  currentChapterNumber,
  isTableOfContentsShow,
  playbackRate,
  volume,
  isBookmarksConflictNotificationShow,
  is404Error,
});

export default connect(
  mapStateToProps,
  {
    ...thunks,
  },
)(Player);
