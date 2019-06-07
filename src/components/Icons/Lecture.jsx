//@flow
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
      <path
        d="M10.4998 3.2C10.4998 4.58071 9.38052 5.7 7.99981 5.7C6.61909 5.7 5.4998 4.58071 5.4998 3.2C5.4998 1.81929 6.61909 0.7 7.99981 0.7C9.38052 0.7 10.4998 1.81929 10.4998 3.2Z"
        stroke={color}
        strokeWidth="1.4"
      />
      <path
        d="M12.8998 12.8001V14.9001C12.8998 15.121 12.7207 15.3001 12.4998 15.3001H3.49978C3.27887 15.3001 3.09978 15.121 3.09978 14.9001V12.8001C3.09978 10.0939 5.29358 7.90007 7.99978 7.90007C10.706 7.90007 12.8998 10.0939 12.8998 12.8001Z"
        stroke={color}
        strokeWidth="1.4"
      />
      <rect
        x="0.4"
        y="14.8"
        width="15.2"
        height="0.8"
        rx="0.4"
        stroke={color}
        fill={color}
        strokeWidth="0.8"
      />
    </TypeIcon>
  );
});
