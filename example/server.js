import express from "express";
import webpack from "webpack";
import morgan from "morgan";
import template from "./template";
import config from "../webpack/webpack.config";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import book from "./book";
import fs from "fs";
import path from "path";

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

app.get("/audiobooks/1", (req, res) => {
  res.json(book);
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.resolve(`src/styles.css`));
});

app.listen(8080, () => {
  console.log(`http://localhost:8080/`);
});
