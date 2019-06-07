import styled from "styled-components";

export const SliderWrapper = styled.div`
  position: absolute;
  background: white;
  z-index: 1;
  right: 40px;
  height: 70px;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0 20px 24px;
`;

export const Scale = styled.div`
  position: absolute;
  bottom: 25px;
  width: 205px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  color: #4a4a4a;
`;

export const Wrapper = styled.div`
  display: flex;
  margin-left: 20px;

  @media (max-width: 440px) {
    margin-left: 10px;
  }
`;

export const RangeItem = styled.span`
  cursor: pointer;
`;
