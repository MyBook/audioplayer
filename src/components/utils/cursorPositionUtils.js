function getMousePositionX(e) {
  if (e.pageX) {
    return e.pageX;
  }

  if (e.clientX) {
    return (
      e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    );
  }
  if (e.changedTouches[0]) {
    return e.changedTouches[0].pageX;
  }
}

function getMousePositionY(e) {
  if (e.pageY) {
    return e.pageY;
  }
  if (e.clientY) {
    return (
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    );
  }
  if (e.changedTouches[0]) {
    return e.changedTouches[0].pageY;
  }
}

export const getClickPositionX = (e, wrapper) => {
  const { left } = getCoords(wrapper);
  const mousePositionX = getMousePositionX(e);

  return mousePositionX - left;
};

export const getClickPositionY = (e, wrapper) => {
  const { top } = getCoords(wrapper);
  const mousePositionY = getMousePositionY(e);

  return mousePositionY - top;
};

export const getCoords = elem => {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
};

export const isCursorOutsideWrapper = (e, wrapper, width) => {
  const { left } = getCoords(wrapper);
  const mousePositionX = getMousePositionX(e);
  const X = mousePositionX - left;

  return X > width || X < 0;
};

export const isCursorOutsideWrapperOnY = (e, wrapper, height) => {
  const Y = getClickPositionY(e, wrapper);

  return Y > height || Y < 0;
};

export const cursorHeightPositionRelativeWrapper = (e, wrapper) => {
  const { top } = getCoords(wrapper);
  const mousePositionY = getMousePositionY(e);

  return mousePositionY - top;
};
