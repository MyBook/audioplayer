import React, { memo } from "react";
import { PlayPauseIcon } from "components/Icons/index.styled";

type Props = {
  onClick: () => void;
  isFetched: boolean;
};

export default function({ onClick, isFetched }: Props) {
  return (
    <PlayPauseIcon
      onClick={onClick}
      isFetched={isFetched}
      className="jest-player-pause-button"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="27"
          y="8"
          width="10"
          height="32"
          rx="5"
          fill="#4A4A4A"
          className="colored-path"
        />
        <rect
          x="11"
          y="8"
          width="10"
          height="32"
          rx="5"
          fill="#4A4A4A"
          className="colored-path"
        />
      </svg>
    </PlayPauseIcon>
  );
}
