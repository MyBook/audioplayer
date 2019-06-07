import styled from "styled-components";

export const width = 2;
export const height = 100;

export const Picker = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid white;
  position: absolute;
  border-radius: 100%;
  background: ${props => props.theme.primary};
  z-index: 1;
  transition: opacity 0.2s;
  opacity: 1;
  top: -6px;
`;

export const HorizontalWrapper = styled.div`
  width: ${props => props.width}px;
  height: 4px;
  background: ${props => props.theme.almostWhite};
  border-radius: 4px;
  position: relative;
  z-index: 0;
`;

export const HorizontalSliderWrapper = styled.div``;

export const Progress = styled.div`
  height: 100%;
  position: absolute;
  border-radius: 4px 0 0 4px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.primary};
  z-index: 1;
`;

export const ScrubArea = styled.div`
  position: absolute;
  right: 0;
  top: -5px;
  width: 100%;
  height: 14px;
  z-index: 2;
  cursor: pointer;
`;
