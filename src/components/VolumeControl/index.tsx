import React from "react";
import styled from "styled-components";
import HorizontalSlider from "components/Sliders/HorizontalSlider";
import SoundIcon from "components/Icons/Sound";

const VolumeControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 250px;

  @media (max-width: 940px) {
    display: none;
  }
`;

type Props = {
  volume: number;
  changeVolume: Function;
  muteTrigger: Function;
  isFetched: boolean;
};

export default function({
  volume,
  changeVolume,
  muteTrigger,
  isFetched,
}: Props) {
  const defaultWidth = 125;
  return (
    <VolumeControlWrapper>
      <SoundIcon
        currentValue={volume}
        onClick={muteTrigger}
        isFetched={isFetched}
      />
      <HorizontalSlider
        currentValue={volume}
        overallValue={1}
        handleValueUpdate={changeVolume}
        defaultValue={1}
        width={defaultWidth}
        isFetched={isFetched}
      />
    </VolumeControlWrapper>
  );
}
