export default function() {
  const manifest = require("../dist/manifest");

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <link rel="stylesheet" href="styles.css">
     <style>
      body {
        background: #aaaaaa;
      }
      </style>
      <title>Плеер</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
    <script type="text/javascript" src="${manifest["vendor.js"]}"></script>
    <script type="text/javascript" src="${manifest["index.js"]}"></script>
  </html>
  `;
}
