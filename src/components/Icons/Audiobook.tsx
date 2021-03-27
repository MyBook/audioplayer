// @flow
import React, { memo } from "react";
import { TypeIcon } from "components/Icons/index.styled";

type Props = {
  color: string,
};

export default memo<Props>(function AudioBookIcon({ color }) {
  return (
    <TypeIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.7">
        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke={color} />
        <path
          d="M11.2216 8.424C11.5349 8.22817 11.5349 7.77183 11.2216 7.576L6.265 4.47812C5.93198 4.26998 5.5 4.50941 5.5 4.90212V11.0979C5.5 11.4906 5.93198 11.73 6.265 11.5219L11.2216 8.424Z"
          fill={color}
        />
      </g>
    </TypeIcon>
  );
});
