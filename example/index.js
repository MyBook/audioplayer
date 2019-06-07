// export * from "./Chunk";
import React from "react";
import { render } from "react-dom";
import Player from "../src";

function options(isActiveSubscription) {
  return {
    TrialMessage: <div>123</div>,
    isFreeFragment: !isActiveSubscription,
    colors: {
      almostWhite: "#F4F4F4",
      primary: "#00B0C2",
      gray: "#545454",
    },
  };
}

render(
  <Player {...options(false)} bookId={1} />,
  document.querySelector("#app"),
);
