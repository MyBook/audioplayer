import styled from "styled-components";
import { rgba } from "polished";

export const Cover = styled.img`
  display: block;
  width: 48px;
  transition: 0.2s;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export const CoverWrapper = styled.span`
  background: ${props => props.theme.primary};
  margin-right: 8px;
  display: inline-block;
  border-radius: 6px;
`;

export const Title = styled.span`
  font-size: 14px;
  display: block;
  text-decoration: none;
  hyphens: auto;
  color: ${props => props.theme.primary};
  transition: 0.2s;

  &:hover {
    color: ${props => props.theme.gray};
  }
`;

export const BookInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 18px;
  color: #000;
  width: 250px;

  @media (max-width: 940px) {
    display: none;
  }

  .clear-links-style {
    display: flex;
  }
`;

export const CoverPlaceholder = styled.div`
  background: ${props => props.theme.almostWhite};
  width: 48px;
  height: 48px;
  border-radius: 6px;
  margin-right: 13px;
  flex-shrink: 0;
`;

export const TitlePlaceholder = styled.div`
  background: ${`linear-gradient(90deg, ${props =>
    props.theme.almostWhite} 0%, ${props =>
    rgba(props.theme.almostWhite, 0)} 100%)`};
  height: 14px;
  border-radius: 14px;
  width: 200px;
  margin-bottom: 10px;
`;

export const ChapterPlaceholder = styled.div`
  background: ${`linear-gradient(90deg, ${props =>
    props.theme.almostWhite} 0%, ${props =>
    rgba(props.theme.almostWhite, 0)} 100%)`};
  height: 10px;
  border-radius: 10px;
  width: 140px;
`;
