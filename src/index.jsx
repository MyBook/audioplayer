import React, { memo } from "react";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "reducer";
import { createLogger } from "redux-logger";
import Player from "Player";

const logger = createLogger({
  collapsed: true,
});

const middleware = [
  thunk,
  global.IS_BROWSER && NODE_ENV === "development" && logger,
].filter(Boolean);
const store = compose(applyMiddleware(...middleware))(createStore)(reducer);

export default memo(function(props) {
  return (
    <Provider store={store}>
      <Player {...props} />
    </Provider>
  );
});
