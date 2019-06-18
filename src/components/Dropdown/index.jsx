//@flow
import React, { PureComponent } from "react";
import type { Node } from "react";

type Props = {
  children: Node,
  trigger: Function,
};

export default class Dropdown extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.wrapperRef = React.createRef();
  }

  wrapperRef: { current: null | HTMLDivElement };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchstart", this.handleClickOutside);
    document.addEventListener("keydown", this.handleEscButton);
  }

  componentWillUnmount() {
    this.removeListener();
  }

  handleEscButton = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      this.handleTrigger();
    }
  };

  removeListener = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleEscButton);
  };

  handleTrigger = () => {
    this.removeListener();
    this.props.trigger();
  };

  handleClickOutside = ({ target }: { target: EventTarget }) => {
    const { current } = this.wrapperRef;
    if (!(target instanceof Element)) return;

    if (
      current &&
      !current.contains(target) &&
      !target.closest(".dropdown-trigger-button")
    ) {
      this.handleTrigger();
    }
  };

  render() {
    const { children } = this.props;
    return <div ref={this.wrapperRef}>{children}</div>;
  }
}
