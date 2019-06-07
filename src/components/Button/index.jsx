//@flow
import * as React from "react";
import { ButtonStyled, LoaderStyled } from "components/Button/index.styled";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: React.Node,
  onClick?: Function,
  variation: "default" | "stroked" | "white",
  className?: string,
  withLoader?: boolean,
  disabled?: boolean,
  to?: string,
  href?: string,
  size?: "default" | "small",
};

export default class Button extends React.PureComponent<ButtonProps, {}> {
  static defaultProps = {
    variation: "default",
    size: "default",
    disabled: false,
  };

  onClick = (e: Event) => {
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
    } = this.props;

    let component = to ? Link : "button";
    if (href) component = "a";

    return (
      <ButtonStyled
        onClick={e => {
          onClick && this.onClick(e);
        }}
        className={className}
        variation={variation}
        disabled={disabled}
        href={href}
        to={href}
        as={component}
        size={size}
        {...this.props}
      >
        {children}
        {withLoader ? <LoaderStyled color="white" /> : ""}
      </ButtonStyled>
    );
  }
}
