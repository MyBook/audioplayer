require("@babel/polyfill");
require("@babel/register")({
  plugins: ["@babel/plugin-proposal-class-properties"],
});
require("./server");
