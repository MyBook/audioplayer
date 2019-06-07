//@flow
import React, { memo } from "react";
import { PlayPauseIcon } from "components/Icons/index.styled";

type Props = {
  onClick: Function,
  isFetched: boolean,
};

export default memo<Props>(function({ onClick, isFetched }) {
  return (
    <PlayPauseIcon onClick={onClick} isFetched={isFetched}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35.5039 25.6641C36.6913 24.8725 36.6913 23.1275 35.5039 22.3359L17.1094 10.0729C15.7803 9.18686 14 10.1396 14 11.737V36.263C14 37.8604 15.7803 38.8131 17.1094 37.9271L35.5039 25.6641Z"
          className="colored-path"
          fill="#4A4A4A"
        />
      </svg>
    </PlayPauseIcon>
  );
});
