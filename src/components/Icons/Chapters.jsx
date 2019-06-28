//@flow
import React, { memo } from "react";
import styled from "styled-components";
import { IconWrapper } from "components/Icons/index.styled";

const ChaptersIcon = styled(IconWrapper)`
  @media (max-width: 940px) {
    margin: 0;
  }
`;

type Props = {
  onClick: Function,
  isActive: boolean,
  isFetched: boolean,
  className: string,
};

export default memo<Props>(function({
  onClick,
  isActive,
  isFetched,
  className,
}) {
  return (
    <ChaptersIcon
      onClick={onClick}
      active={isActive}
      isFetched={isFetched}
      className={className}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25 11L21 14V8L25 11ZM7 11C7 10.4477 7.44772 10 8 10H16C16.5523 10 17 10.4477 17 11C17 11.5523 16.5523 12 16 12H8C7.44772 12 7 11.5523 7 11ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H24C24.5523 18 25 17.5523 25 17C25 16.4477 24.5523 16 24 16H8ZM8 22C7.44772 22 7 22.4477 7 23C7 23.5523 7.44772 24 8 24H24C24.5523 24 25 23.5523 25 23C25 22.4477 24.5523 22 24 22H8Z"
          fill="#4A4A4A"
          className="colored-path"
        />
      </svg>
    </ChaptersIcon>
  );
});
