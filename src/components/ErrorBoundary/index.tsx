import React, { Component } from "react";
import { H1 } from "./styled";

type Props = {
  is404Error: boolean;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidUpdate(prevProps: Props): void {
    const { is404Error } = this.props;

    if (prevProps.is404Error !== is404Error) {
      this.setState({ hasError: is404Error });
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <H1>Что-то пошло не так. Пожалуйста, перезагрузите страницу</H1>;
    }

    return this.props.children;
  }
}
