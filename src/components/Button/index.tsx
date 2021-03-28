import React, { ReactElement } from "react";
import { ButtonStyled, LoaderStyled } from "components/Button/styled";

type ButtonProps = {
  children: ReactElement | string;
  onClick?: Function;
  variation: "default" | "stroked" | "white";
  className?: string;
  withLoader?: boolean;
  disabled?: boolean;
  to?: string;
  href?: string;
  size?: "default" | "small";
};

export default class Button extends React.PureComponent<ButtonProps, {}> {
  static defaultProps = {
    variation: "default",
    size: "default",
    disabled: false,
  };

  onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { onClick } = this.props;
    onClick && onClick();
  };

  render() {
    const {
      children,
      variation,
      className,
      withLoader,
      disabled,
      href,
      size,
      onClick,
      to,
      ...rest
    } = this.props;

    let component: keyof JSX.IntrinsicElements = to ? "a" : "button";
    if (href) component = "a";

    return (
      <ButtonStyled
        onClick={e => {
          onClick && this.onClick(e);
        }}
        className={className}
        disabled={disabled}
        as={component}
        {...rest}
      >
        {children}
        {withLoader ? <LoaderStyled color="white" /> : ""}
      </ButtonStyled>
    );
  }
}
