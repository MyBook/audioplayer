import React, { memo } from "react";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "reducer";
import { createLogger } from "redux-logger";
import Player from "Player";
import { PlayerProps } from "types";

const logger = createLogger({
  collapsed: true,
});

type Props = PlayerProps;

const middleware = [
  thunk,
  // @ts-ignore
  global.IS_BROWSER && NODE_ENV === "development" && logger,
].filter(Boolean);
const store = compose(applyMiddleware(...middleware))(createStore)(reducer);

export default memo(function(props: Props) {
  return (
    // @ts-ignore
    <Provider store={store}>
      <Player {...props} />
    </Provider>
  );
});
