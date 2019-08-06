//@flow
import React, { PureComponent } from "react";
import {
  Progress,
  ScrubArea,
  TimeLineWrapper,
  Wrapper,
  TimeCurrent,
  TimeOverall,
  TimeLineContainer,
  Picker,
} from "components/Timeline/index.styled";
import {
  cursorHeightPositionRelativeWrapper,
  getClickPositionX,
  isCursorOutsideWrapper,
} from "components/utils/cursorPositionUtils";
import timeFormat from "components/utils/timeFormat";

type Props = {
  duration: number,
  currentTime: number,
  width?: number,
  isFetched: boolean,
  handleTimeUpdate: Function,
  handlePlay: Function,
  handlePause: Function,
};

export default class Timeline extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  wrapperRef: { current: null | HTMLDivElement };
  lastXPosition: number;
  newCurrentValue: number;

  changeValue = (e: MouseEvent) => {
    //если курсор по оси Х внутри враппера
    const wrapper = this.wrapperRef.current;
    if (!wrapper) return;
    if (!isCursorOutsideWrapper(e, wrapper, wrapper.offsetWidth)) {
      //записывем положение курсора относительно врапера по оси Y, отрицательное значение говорит о том, что курсор ушел выше врапера
      const cursorHeightPosition = cursorHeightPositionRelativeWrapper(
        e,
        wrapper,
      );
      const { duration, handleTimeUpdate } = this.props;
      const wrapperWidth = wrapper.offsetWidth;
      //если курсор по оси Y выше враппера то сдвигаем ПО ЧУЧУТЬ относительно последнего места, где был курсор внутри враппера, в противном случае двигаем как обычно
      if (cursorHeightPosition > -10) {
        //если курсор по оси Y внутри враппера, то записывем последним местом, где курсор был внутри враппера
        this.lastXPosition = getClickPositionX(e, wrapper);
        //считаем, сколько на сколько процентов влево внутри врапера находится курсор
        const clickPercent = (this.lastXPosition / wrapperWidth) * 100;
        //записываем время при последнем месте курсора внутри враппера по формуле: (общая длина песни делить на сто) умноженное на текущий сдвиг влево
        this.newCurrentValue = +((duration / 100) * clickPercent).toFixed(4);
        //ставим текущее время
        handleTimeUpdate(this.newCurrentValue);
      } else {
        //считаем, сколько секунд в одном пикселе враппере
        const secondsInOnePixel = duration / wrapperWidth;
        //считаем разницу между последним местом, где курсор был внутри враппера и текущим
        const difference = this.lastXPosition - getClickPositionX(e, wrapper);
        //степень замедления
        let inhibitor = 50;
        //ставим текущее время по формуле: время при последнем месте курсора внутри враппера - (сколько секунд в одном пикселе деленное на замедлитель) * разницу между последним местом, где курсор был внутри враппера и текущим (😱)
        handleTimeUpdate(
          +this.newCurrentValue - (secondsInOnePixel / inhibitor) * difference,
        );
      }
    }
  };

  startScrub = () => {
    this.props.handlePause();
    window.addEventListener("mousemove", this.changeValue);
    window.addEventListener("touchmove", this.changeValue);
    window.addEventListener("mouseup", this.endScrub);
    window.addEventListener("touchend", this.endScrub);
  };

  endScrub = () => {
    this.props.handlePlay();
    window.removeEventListener("mousemove", this.changeValue);
    window.removeEventListener("touchmove", this.changeValue);
    window.removeEventListener("mouseup", this.endScrub);
    window.removeEventListener("touchend", this.endScrub);
  };

  render() {
    const { currentTime, duration, isFetched } = this.props;

    return (
      <TimeLineContainer>
        <TimeCurrent isFetched={isFetched}>
          {timeFormat(currentTime)}
        </TimeCurrent>
        {isFetched ? (
          <TimeLineWrapper isFetched={isFetched}>
            <Wrapper ref={this.wrapperRef}>
              <ScrubArea
                onClick={this.changeValue}
                onMouseDown={this.startScrub}
                onMouseUp={this.endScrub}
                onTouchStart={this.startScrub}
                onTouchEnd={this.endScrub}
              />
              <Progress
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <Picker
                style={{
                  left: `calc(${(currentTime / duration) * 100}% - 8px)`,
                }}
              />
            </Wrapper>
          </TimeLineWrapper>
        ) : (
          <TimeLineWrapper>
            <Wrapper />
          </TimeLineWrapper>
        )}
        <TimeOverall isFetched={isFetched}>{timeFormat(duration)}</TimeOverall>
      </TimeLineContainer>
    );
  }
}
