//@flow
import React, { PureComponent } from "react";
import {
  getClickPositionX,
  isCursorOutsideWrapper,
} from "components/utils/cursorPositionUtils";
import {
  HorizontalSliderWrapper,
  Progress,
  Picker,
  ScrubArea,
  HorizontalWrapper,
} from "components/Sliders/index.styled";
import { defaultHorizontalSliderWidth } from "playerConstants";

type Props = {
  minimumValue: number,
  overallValue: number,
  defaultValue: number,
  currentValue: number,
  width?: number,
  isFetched?: boolean,
  handleValueUpdate: Function,
};

export default class extends PureComponent<Props> {
  static defaultProps = {
    minimumValue: 0,
  };

  wrapperRef: { current: null | HTMLDivElement };
  lastXPosition: number;
  newCurrentValue: number;

  constructor(props: Props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  changeValue = (e: MouseEvent) => {
    //если курсор по оси Х внутри враппера
    const wrapper = this.wrapperRef.current;
    if (!wrapper) return;
    if (!isCursorOutsideWrapper(e, wrapper, wrapper.offsetWidth)) {
      const { overallValue, handleValueUpdate, minimumValue } = this.props;
      const wrapperWidth = wrapper.offsetWidth;

      //если курсор по оси Y внутри враппера, то записывем последним местом, где курсор был внутри враппера
      this.lastXPosition = getClickPositionX(e, wrapper);
      //считаем, сколько на сколько процентов влево внутри врапера находится курсор
      const clickPercent = (this.lastXPosition / wrapperWidth) * 100;

      //записываем время при последнем месте курсора внутри враппера по формуле: (общая длина песни делить на сто) умноженное на текущий сдвиг влево
      this.newCurrentValue = +(
        ((overallValue - minimumValue) / 100) * clickPercent +
        minimumValue
      ).toFixed(2);
      //ставим текущее время
      handleValueUpdate(this.newCurrentValue);
    }
  };

  startScrub = () => {
    window.addEventListener("mousemove", this.changeValue);
    window.addEventListener("touchmove", this.changeValue);
    window.addEventListener("mouseup", this.endScrub);
    window.addEventListener("touchend", this.endScrub);
  };

  endScrub = () => {
    window.removeEventListener("mousemove", this.changeValue);
    window.removeEventListener("touchmove", this.changeValue);
    window.removeEventListener("mouseup", this.endScrub);
    window.removeEventListener("touchend", this.endScrub);
  };

  setToDefault = () => {
    const { handleValueUpdate, defaultValue } = this.props;
    handleValueUpdate(defaultValue);
  };

  render() {
    const {
      currentValue,
      overallValue,
      minimumValue,
      width = defaultHorizontalSliderWidth,
      isFetched = true,
    } = this.props;
    if (isFetched) {
      const position =
        (currentValue - minimumValue) / ((overallValue - minimumValue) / 100);
      return (
        <HorizontalSliderWrapper>
          <HorizontalWrapper ref={this.wrapperRef} width={width}>
            <ScrubArea
              onClick={this.changeValue}
              onTouchStart={this.startScrub}
              onTouchEnd={this.endScrub}
              onMouseDown={this.startScrub}
              onMouseUp={this.endScrub}
              onDoubleClick={this.setToDefault}
            />
            <Progress
              style={{
                width: `${position}%`,
              }}
            />
            <Picker
              style={{
                left: `calc(${position}% - 8px)`,
              }}
            />
          </HorizontalWrapper>
        </HorizontalSliderWrapper>
      );
    } else {
      return (
        <HorizontalSliderWrapper>
          <HorizontalWrapper width={width} />
        </HorizontalSliderWrapper>
      );
    }
  }
}
