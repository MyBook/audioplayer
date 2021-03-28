// @flow
import React, { memo } from "react";
import { IconWrapper } from "components/Icons/index.styled";

type Props = {
  onClick: Function,
  isFetched: boolean,
};

export default memo<Props>(function({ onClick, isFetched }) {
  return (
    <IconWrapper onClick={onClick} isFetched={isFetched}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.7503 33.1623C14.3288 32.8054 13.6981 32.8019 13.3076 33.1924C12.9171 33.5829 12.9149 34.2191 13.3321 34.5809C15.7883 36.711 18.9936 38 22.5 38C30.232 38 36.5 31.732 36.5 24C36.5 16.268 30.232 10 22.5 10C19.0158 10 15.8289 11.2728 13.3788 13.3788L11 11V17H17L14.7977 14.7977C16.8819 13.0514 19.5682 12 22.5 12C29.1274 12 34.5 17.3726 34.5 24C34.5 30.6274 29.1274 36 22.5 36C19.5459 36 16.8411 34.9325 14.7503 33.1623Z"
          fill="#4A4A4A"
          className="colored-path"
        />
        <path
          d="M22.1123 22.458C22.1123 22.904 21.9772 23.2832 21.707 23.5957C21.4368 23.9082 21.0576 24.123 20.5693 24.2402V24.2695C21.1455 24.3411 21.5817 24.5169 21.8779 24.7969C22.1742 25.0736 22.3223 25.4479 22.3223 25.9199C22.3223 26.6068 22.0732 27.1423 21.5752 27.5264C21.0771 27.9072 20.3659 28.0977 19.4414 28.0977C18.6667 28.0977 17.9798 27.9691 17.3809 27.7119V26.4277C17.6576 26.5677 17.9619 26.6816 18.2939 26.7695C18.626 26.8574 18.9548 26.9014 19.2803 26.9014C19.7783 26.9014 20.1462 26.8167 20.3838 26.6475C20.6214 26.4782 20.7402 26.2064 20.7402 25.832C20.7402 25.4967 20.6035 25.2591 20.3301 25.1191C20.0566 24.9792 19.6204 24.9092 19.0215 24.9092H18.4795V23.752H19.0312C19.5846 23.752 19.9883 23.6803 20.2422 23.5371C20.4993 23.3906 20.6279 23.1416 20.6279 22.79C20.6279 22.2497 20.2894 21.9795 19.6123 21.9795C19.3779 21.9795 19.1387 22.0186 18.8945 22.0967C18.6536 22.1748 18.3851 22.3099 18.0889 22.502L17.3906 21.4619C18.0417 20.9932 18.818 20.7588 19.7197 20.7588C20.4587 20.7588 21.0413 20.9085 21.4678 21.208C21.8975 21.5075 22.1123 21.9242 22.1123 22.458Z"
          fill="#4A4A4A"
          className="colored-path"
        />
        <path
          d="M28.0645 24.4307C28.0645 25.6774 27.8594 26.6003 27.4492 27.1992C27.0423 27.7982 26.4141 28.0977 25.5645 28.0977C24.7409 28.0977 24.1191 27.7884 23.6992 27.1699C23.2826 26.5514 23.0742 25.6383 23.0742 24.4307C23.0742 23.1709 23.2777 22.2432 23.6846 21.6475C24.0915 21.0485 24.7181 20.749 25.5645 20.749C26.388 20.749 27.0098 21.0615 27.4297 21.6865C27.8529 22.3115 28.0645 23.2262 28.0645 24.4307ZM24.5732 24.4307C24.5732 25.3063 24.6481 25.9346 24.7979 26.3154C24.9508 26.693 25.2064 26.8818 25.5645 26.8818C25.916 26.8818 26.1699 26.6898 26.3262 26.3057C26.4824 25.9215 26.5605 25.2965 26.5605 24.4307C26.5605 23.555 26.4808 22.9268 26.3213 22.5459C26.165 22.1618 25.9128 21.9697 25.5645 21.9697C25.2096 21.9697 24.9557 22.1618 24.8027 22.5459C24.6497 22.9268 24.5732 23.555 24.5732 24.4307Z"
          fill="#4A4A4A"
          className="colored-path"
        />
      </svg>
    </IconWrapper>
  );
});