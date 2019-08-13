import React, { Fragment } from "react";
import loadable from "@loadable/component";

export default loadable(
  () => import(/* webpackChunkName: "Player" */ "../src"),
  {
    fallback: <Fragment />,
  },
);
