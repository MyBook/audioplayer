import styled, { createGlobalStyle } from "styled-components";

export const PlayerWrapper = styled.div`
  position: fixed;
  z-index: 3;
  bottom: 8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 940px;
  background: white;
  user-select: none;
  height: 90px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border-radius: ${props => props.theme.borderRadius};

  button {
    outline: none;
  }

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

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 940px) {
    max-width: 752px;
  }

  @media (max-width: 752px) {
    width: 440px;
  }

  @media (max-width: 440px) {
    width: 304px;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 auto;
`;

export const ControlWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  @media (max-width: 440px) {
    padding: 0;
  }
`;

export const FooterBottomSpace = createGlobalStyle`
  .footer-box {
    margin-bottom: 70px;
  }
  
  button {
    background: none;
    border: none;
    padding: 0;
  }
`;
