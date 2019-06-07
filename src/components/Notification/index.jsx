//@flow
import React from "react";
import {
  NotificationWrapper,
  StyledButton,
} from "components/Notification/index.styled";

type Props = {
  buttonText: string,
  bodyText: string,
  onButtonClick: Function,
};

export default function(props: Props) {
  const { buttonText, bodyText, onButtonClick } = props;
  return (
    <NotificationWrapper>
      {bodyText}
      <StyledButton onClick={onButtonClick} size="small">
        {buttonText}
      </StyledButton>
    </NotificationWrapper>
  );
}
