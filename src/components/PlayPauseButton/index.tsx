import React from "react";
import { connect } from "react-redux";
import PlayIcon from "components/Icons/Play";
import PauseIcon from "components/Icons/Pause";
import { Wrapper } from "components/PlayPauseButton/index.styled";
import { handlePause, handlePlay } from "thunks/playerControl";
import { InitialState, Urls } from "types";

type Props = {
  handlePlay: Function;
  handlePause: Function;
  isPlaying: boolean;
  isFetched: boolean;
  urls: Urls;
};

function PlayPauseButton({
  handlePause,
  handlePlay,
  isPlaying,
  isFetched,
  urls,
}: Props) {
  return (
    <Wrapper>
      {isPlaying ? (
        <PauseIcon onClick={() => handlePause(urls)} isFetched={isFetched} />
      ) : (
        <PlayIcon onClick={handlePlay} isFetched={isFetched} />
      )}
    </Wrapper>
  );
}

const mapStateToProps = ({ book, isPlaying, isFetched }: InitialState) => ({
  book,
  isPlaying,
  isFetched,
});

export default connect(
  mapStateToProps,
  {
    handlePlay,
    handlePause,
  },
)(PlayPauseButton);
