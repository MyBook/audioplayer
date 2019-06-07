import styled, { keyframes } from "styled-components";

const sequence1 = keyframes`
  0% {
    height: 10px;
  }
  50% {
    height: 18px;
  }
  100% {
    height: 10px;
  }
`;

const sequence2 = keyframes`
  0% {
      height: 5px;
    }
    50% {
      height: 18px;
    }
    100% {
      height: 5px;
    }
`;

export const Line = styled.div`
  position: absolute;
  width: 1px;
  height: 0;
  bottom: 0;

  &:nth-child(1) {
    left: 0;
    animation: ${sequence2} 1s ease infinite 0s;
  }

  &:nth-child(2) {
    left: 2px;
    animation: ${sequence2} 0.8s ease infinite 0.4s;
  }

  &:nth-child(3) {
    left: 4px;
    animation: ${sequence1} 1s ease-in-out infinite 0.2s;
  }

  &:nth-child(4) {
    left: 6px;
    animation: ${sequence2} 0.7s ease-in infinite 0.6s;
  }

  &:nth-child(5) {
    left: 8px;
    animation: ${sequence1} 1s ease-in-out infinite 0.4s;
  }

  &:nth-child(6) {
    left: 10px;
    animation: ${sequence2} 1s ease infinite 0.2s;
  }
  &:nth-child(7) {
    left: 12px;
    animation: ${sequence2} 1s ease infinite 0.4s;
  }
  &:nth-child(8) {
    left: 14px;
    animation: ${sequence2} 1s ease infinite 0.1s;
  }
  &:nth-child(9) {
    left: 16px;
    animation: ${sequence2} 1s ease infinite 0.3s;
  }
`;

export const Loader = styled.div`
  margin: 0;
  list-style: none;
  width: 18px;
  height: 18px;
  position: relative;
  padding: 0;
  border-radius: 20px;
  overflow: hidden;

  ${Line} {
    background: ${props => (props.color ? props.color : "black")};
  }
`;
