import styled from "styled-components";
import Button from "components/Button";

export const StyledButton: typeof Button = styled(Button)`
  position: absolute;
  top: 18px;
  right: 20px;
`;

export const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  max-width: 500px;
  min-width: 320px;
  margin: 0 auto;
  z-index: 3;
  box-shadow: 0 0 19px 0 rgba(0, 0, 0, 0.29);
  background: white;
  line-height: 1.6;
  padding: 20px 100px 20px 20px;
  border-radius: ${props => props.theme.borderRadius};
  box-sizing: border-box;

  @media (max-width: 835px) {
    left: 0;
    right: 0;
    bottom: 0;
  }
`;
