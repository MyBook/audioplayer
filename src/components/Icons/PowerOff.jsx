import React from "react";
import styled from "styled-components";
import { IconWrapper } from "components/Icons/index.styled";

const Icon = styled(IconWrapper)`
  border: 0;
  border-radius: 100%;
`;

export const PowerOffIconWrapper = styled.div`
  position: absolute;
  right: -10px;
  top: -10px;
`;

export default function({ onClick }: { onClick?: Function }) {
  return (
    <Icon onClick={onClick} isFetched={true} className="jest-player-power-off">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.4187 8.1365C17.7702 7.78503 17.7702 7.21518 17.4187 6.8637C17.0673 6.51223 16.4974 6.51223 16.1459 6.8637L12.1413 10.8683L8.13698 6.86395C7.78551 6.51247 7.21566 6.51247 6.86419 6.86394C6.51272 7.21541 6.51272 7.78526 6.86419 8.13673L10.8685 12.1411L7.14603 15.8635C6.79456 16.215 6.79456 16.7849 7.14603 17.1363C7.4975 17.4878 8.06735 17.4878 8.41882 17.1363L12.1413 13.4139L15.864 17.1366C16.2155 17.4881 16.7854 17.4881 17.1368 17.1367C17.4883 16.7852 17.4883 16.2153 17.1368 15.8639L13.4141 12.1411L17.4187 8.1365Z"
          fill="#4A4A4A"
          className="colored-path"
        />
      </svg>
    </Icon>
  );
}
