import React, { memo } from "react";
import { IconWrapper } from "components/Icons/index.styled";
import styled from "styled-components";

const Speed = styled.div`
  font-size: 10px;
  font-weight: 700;
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 32px;
  height: 17px;
  text-align: center;

  span {
    font-size: 8px;
  }
`;

const PlaybackRateIcon = styled(IconWrapper)`
  position: relative;
`;

type Props = {
  onClick: () => void;
  size?: string;
  className?: string;
  playbackRate: string;
  isActive: boolean;
  isFetched: boolean;
};

export default memo<Props>(function({
  onClick,
  size = "big",
  playbackRate,
  isActive,
  isFetched,
  className
}) {
  return (
    <PlaybackRateIcon
      onClick={onClick}
      size={size}
      isActive={isActive}
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
          d="M23.9384 15.002C24.0066 15.55 24.4477 16 25 16C25.5523 16 26.0053 15.551 25.9508 15.0014C25.4497 9.94741 21.1858 6 16 6C10.8142 6 6.55031 9.94741 6.04924 15.0014C5.99475 15.551 6.44772 16 7 16C7.55228 16 7.99344 15.55 8.06165 15.002C8.55286 11.0547 11.9197 8 16 8C20.0803 8 23.4471 11.0547 23.9384 15.002Z"
          fill="#4A4A4A"
          className="colored-path"
        />
        <circle
          cx="16"
          cy="16"
          r="1.5"
          fill="#4A4A4A"
          className="colored-path"
        />
        <rect
          x="19.7007"
          y="11.5151"
          width="1"
          height="6"
          rx="0.5"
          transform="rotate(45 19.7007 11.5151)"
          fill="#4A4A4A"
          className="colored-path"
        />
      </svg>

      <Speed>
        <span>x</span>
        {playbackRate}
      </Speed>
    </PlaybackRateIcon>
  );
});
