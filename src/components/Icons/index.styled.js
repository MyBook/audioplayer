import styled, { css } from "styled-components";

export const IconWrapper = styled.button`
  color: #4a4a4a;
  transition: 0.2s;

  .colored-path,
  path,
  circle,
  rect {
    transition: 0.2s;
  }

  svg {
    display: block;
    transition: 0.2s;
  }

  ${props =>
    props.isActive &&
    css`
      color: ${props => props.theme.primary} !important;

      .colored-path {
        fill: ${props => props.theme.primary};
      }
    `}
  
    ${props =>
      !props.isFetched &&
      css`
        color: ${props => props.theme.almostWhite};
        pointer-events: none;

        .colored-path {
          fill: ${props => props.theme.almostWhite} !important;
        }
      `}

  ${props =>
    props.size === "small" &&
    css`
      width: 32px;
      height: 32px;
    `}

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.primary} !important;

    .colored-path {
      fill: ${props => props.theme.primary};
    }
  }

  &:active {
    opacity: 0.6;
  }
`;

export const HoveredIconWrapper = styled(IconWrapper)`
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const PlayPauseIcon = styled(IconWrapper)``;

export const TypeIcon = styled.svg`
  display: block;
  margin-right: 4px;
`;
