import express from "express";
import webpack from "webpack";
import morgan from "morgan";
import template from "./template";
import config from "../webpack/webpack.config";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";

const app = express();
const compiler = webpack(config);
app.use(devMiddleware(compiler, config.devServer));
app.use(hotMiddleware(compiler, config.devServer));

app.use(
  morgan(
    ":date[clf] :method :url :status :res[content-length] - :response-time ms",
  ),
);

app.use("/static/public/", express.static("/static/public/"));

app.get("/", (req, res) => {
  res.send(template());
});

app.get("/audiobooks", (req, res) => {
  res.send(template());
});

app.listen(8080, () => {
  console.log(`http://localhost:8080/`);
});
