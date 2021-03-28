import express from "express";
import webpack from "webpack";
import morgan from "morgan";
import template from "./template";
import config from "../webpack/webpack.config";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import book from "./book";
import path from "path";
import fs from "fs";

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

app.get("/api/audiobooks/1/", (req, res) => {
  res.json(book);
});

app.get("/api/audiobooks/0/", (req, res) => {
  res.json(book);
});

app.get("/api/audiobooks/0/auto-bookmark/", (req, res) => {
  res.json("ok");
});

app.post("/api/auto-bookmarks/", (req, res) => {
  res.json("ok");
});

app.post("/api/statistics/", (req, res) => {
  res.json("ok");
});

app.get("/api/audiofiles/:id/file.mp3", (req, res) => {
  const filePath = path.resolve("example/file.mp3");
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    "Content-Length": stat.size,
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

app.get("/api/audiofiles/218647/file.mp3", (req, res) => {
  const filePath = path.resolve("example/file.mp3");
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    "Content-Length": stat.size,
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.resolve(`src/styles.css`));
});

const port = 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
