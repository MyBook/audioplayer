import React from "react";
import styled from "styled-components";
import { IconWrapper } from "components/Icons/index.styled";

const Icon = styled(IconWrapper)``;

export const PowerOffIconWrapper = styled.div`
  display: flex;
  margin-right: 20px;

  @media (max-width: 440px) {
    margin-right: 10px;
  }
`;

export default function({
  onClick,
  isFetched,
}: {
  onClick?: Function,
  isFetched: Boolean,
}) {
  return (
    <Icon onClick={onClick} isFetched={isFetched}>
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
          d="M16.0468 28C22.6742 28 28.0468 22.6274 28.0468 16C28.0468 9.37258 22.6742 4 16.0468 4C9.41934 4 4.04675 9.37258 4.04675 16C4.04675 22.6274 9.41934 28 16.0468 28ZM16.0468 30C23.7787 30 30.0468 23.732 30.0468 16C30.0468 8.26801 23.7787 2 16.0468 2C8.31477 2 2.04675 8.26801 2.04675 16C2.04675 23.732 8.31477 30 16.0468 30ZM12.5466 10.9941C12.5466 10.3919 11.8973 10.0337 11.448 10.4347C9.97649 11.748 9.04664 13.6809 9.04664 15.836C9.04664 19.7926 12.1806 23 16.0466 23C19.9126 23 23.0466 19.7926 23.0466 15.836C23.0466 13.6809 22.1168 11.748 20.6453 10.4347C20.196 10.0337 19.5466 10.3919 19.5466 10.9941C19.5466 11.2269 19.6532 11.4451 19.8232 11.6042C20.9437 12.6521 21.6466 14.1601 21.6466 15.836C21.6466 19.0013 19.1394 21.5672 16.0466 21.5672C12.9538 21.5672 10.4466 19.0013 10.4466 15.836C10.4466 14.1601 11.1495 12.6521 12.2701 11.6042C12.4401 11.4451 12.5466 11.2269 12.5466 10.9941ZM16.0469 7.25C15.5636 7.25 15.1719 7.64175 15.1719 8.125V13.375C15.1719 13.8582 15.5636 14.25 16.0469 14.25C16.5301 14.25 16.9219 13.8582 16.9219 13.375V8.125C16.9219 7.64175 16.5301 7.25 16.0469 7.25Z"
          className="colored-path"
          fill="#4A4A4A"
        />
      </svg>
    </Icon>
  );
}