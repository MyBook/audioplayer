//@flow
import React from "react";
import { connect } from "react-redux";
import { handlePause, handlePlay } from "actions";
import PlayIcon from "components/Icons/Play";
import PauseIcon from "components/Icons/Pause";
import { Wrapper } from "components/PlayPauseButton/index.styled";

type Props = {
  handlePlay: Function,
  handlePause: Function,
  isPlaying: boolean,
  isFetched: boolean,
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

const mapStateToProps = ({ book, isPlaying, isFetched }) => ({
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
