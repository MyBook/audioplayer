//@flow
import React from "react";
import PlaybackRateIcon from "components/Icons/PlaybackRate";
import Dropdown from "components/Dropdown";
import HorizontalSlider from "components/Sliders/HorizontalSlider";
import { connect } from "react-redux";
import { playbackRateControlTrigger, changePlaybackRate } from "actions";
import {
  SliderWrapper,
  Scale,
  Wrapper,
  RangeItem,
} from "components/PlaybackRateControl/index.styled";

type Props = {
  isPlaybackRateControlShow: boolean,
  isFetched: boolean,
  playbackRate: number,
  playbackRateControlTrigger: Function,
  changePlaybackRate: Function,
};

const range = [0.5, 1, 1.5, 2, 2.5];

function PlaybackRateControl({
  isPlaybackRateControlShow,
  playbackRateControlTrigger,
  changePlaybackRate,
  playbackRate,
  isFetched,
}: Props) {
  const items = range.map(item => {
    return (
      <RangeItem key={item} onClick={() => changePlaybackRate(item)}>
        {item.toFixed(2)}
      </RangeItem>
    );
  });

  return (
    <Wrapper>
      {isPlaybackRateControlShow && (
        <Dropdown trigger={playbackRateControlTrigger}>
          <SliderWrapper>
            <HorizontalSlider
              currentValue={playbackRate}
              overallValue={2.5}
              minimumValue={0.5}
              defaultValue={1}
              handleValueUpdate={changePlaybackRate}
            />
            <Scale>{items}</Scale>
          </SliderWrapper>
        </Dropdown>
      )}

      <PlaybackRateIcon
        onClick={playbackRateControlTrigger}
        isActive={isPlaybackRateControlShow}
        isFetched={isFetched}
        playbackRate={`${parseFloat(playbackRate).toFixed(2)}`}
        className="dropdown-trigger-button"
      />
    </Wrapper>
  );
}

const mapStateToProps = ({
  isPlaybackRateControlShow,
  playbackRate,
  isFetched,
}) => ({
  isPlaybackRateControlShow,
  playbackRate,
  isFetched,
});

export default connect(
  mapStateToProps,
  {
    playbackRateControlTrigger,
    changePlaybackRate,
  },
)(PlaybackRateControl);
