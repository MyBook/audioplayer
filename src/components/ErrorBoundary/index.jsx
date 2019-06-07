import React, { Component } from "react";
import styled from "styled-components";

const H1 = styled.h1`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 15px;
`;

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <H1>У нас ошибка. Попробуйте перезагрузить</H1>;
    }

    return this.props.children;
  }
}
