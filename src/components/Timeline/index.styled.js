import styled, { css } from "styled-components";
import { Progress as ProgressStyled } from "components/Sliders/index.styled";

export const width = 940;
export const height = 4;

export const Picker = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  top: -4px;
  border: 2px solid white;
  border-radius: 100%;
  background: ${props => props.theme.primary};
  z-index: 1;
  transition: width 0.2s, height 0.2s, opacity 0.2s;
  opacity: 0;
`;

export const Progress = styled(ProgressStyled)``;

export const Wrapper = styled.div`
  max-width: ${width}px;
  width: 100%;
  height: ${height}px;
  background: ${props => props.theme.almostWhite};
  position: relative;
  z-index: 0;
  transition: height 0.2s;
  border-radius: 4px;
`;

export const TimeLineContainer = styled.div`
  width: ${width}px;
  height: 10px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;

  @media (max-width: 940px) {
    width: 752px;
  }

  @media (max-width: 752px) {
    width: 440px;
  }

  @media (max-width: 440px) {
    width: 304px;
  }
`;

export const TimeLineWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 788px;
  font-size: 9px;
  line-height: 11px;
  height: 16px;
  border-radius: 4px;
  transition: height 0.2s;

  ${props =>
    props.isFetched &&
    css`
      &:hover {
        ${Picker} {
          opacity: 1;
          width: 16px;
          height: 16px;
        }

        ${Wrapper} {
          height: 8px;
        }
      }
    `}

  @media (max-width: 940px) {
    width: 600px;
  }

  @media (max-width: 752px) {
    width: 288px;
  }

  @media (max-width: 440px) {
    width: 272px;
    margin: 0 auto;
  }
`;

export const ScrubArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: -6px;
  width: 100%;
  height: 16px;
  z-index: 2;
  cursor: pointer;
`;

const TimeMarker = styled.div`
  z-index: 1;
  cursor: pointer;
  line-height: 10px;
  font-size: 9px;
  position: relative;
  color: ${props => (props.isFetched ? "black" : "#E2E2E2")};

  @media (max-width: 440px) {
    display: none;
  }
`;

export const TimeCurrent = styled(TimeMarker)`
  left: 24px;
`;

export const TimeOverall = styled(TimeMarker)`
  right: 24px;
`;
