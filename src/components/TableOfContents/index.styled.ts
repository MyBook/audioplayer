import styled, { css } from "styled-components";
import { Cover as CoverStyled } from "components/BookInfo/index.styled";
import { CoverWrapper as CoverWrapperStyled } from "components/BookInfo/index.styled";

export const TableOfContentsWrapper = styled.div`
  max-height: 230px;
  min-height: 100px;
`;

export const Timing = styled.div`
  margin-left: auto;
`;

export const Chapter = styled.div`
  height: 46px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.almostWhite};
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;

  ${props =>
    props.active &&
    css`
      color: ${props => props.theme.primary};
    `}
`;

export const Author = styled.span`
  display: block;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;
  color: #4a4a4a;
  transition: 0.2s;
  margin-top: 4px;

  &:hover {
    opacity: 0.6;
  }
`;

export const Title = styled.span`
  display: block;
  font-size: 14px;
  line-height: 16px;
  font-weight: 700;
  text-decoration: none;
  hyphens: auto;
  color: #000;
  transition: 0.2s;

  &:hover {
    color: ${props => props.theme.gray};
  }
`;

export const Cover = styled(CoverStyled)`
  width: ${props => (props.isPodcastOrLecture ? "120" : 100)}px;
  height: 100px;
  border-radius: 6px;

  ${props =>
    props.isPodcastOrLecture &&
    css`
      box-shadow: none;
      filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.2));
    `}
`;

export const CoverWrapper = styled(CoverWrapperStyled)`
  border-radius: 6px;

  ${props =>
    props.isPodcastOrLecture &&
    css`
      background: none;
    `}
`;

export const DropdownWrapper = styled.div`
  position: relative;
  background: white;
  padding: 16px 0 0;
  box-sizing: border-box;
  z-index: 1;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;

  .table-of-contents {
    padding: 0 16px;
  }
`;

export const DropdownContainer = styled.div`
  background: white;
  width: 320px;
  box-shadow: 0 4px 13px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: absolute;
  bottom: 35px;
  left: -144px;
  right: 0;
  margin: 0 auto;
  max-height: 435px;
  border-radius: ${props => props.theme.borderRadius};

  @media (max-width: 940px) {
    position: fixed;
    left: 0;
    bottom: 105px;
    z-index: 1;
    width: calc(100% - 36px);
  }
`;

export const DropDownIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 440px) {
    margin-right: 10px;
  }
`;

export const DropdownHeader = styled.div`
  font-size: 16px;
  position: relative;
  border-bottom: 1px solid #f6f6f6;
  padding: 0 16px 16px;
  display: flex;
  align-items: flex-start;

  .clear-links-style {
    display: flex;
  }
`;

export const TypeWrapper = styled.div`
  display: flex;
  font-size: 10px;
  letter-spacing: 1px;
  color: #9b9b9b;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const PowerOffWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #7c7f84;
  transition: 0.2s;
  padding: 16px;
  background: ${props => props.theme.almostWhite};
  border-radius: ${props => props.theme.borderRadius}
    ${props => props.theme.borderRadius} 0 0;

  &:hover {
    opacity: 0.8;
  }

  svg {
    display: block;
    margin-right: 10px;
  }
`;
