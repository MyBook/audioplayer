import manifest from "../dist/manifest";
export default function() {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <link rel="stylesheet" href="styles.css">
      <title>Document</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
    <script type="text/javascript" src="${manifest["main.js"]}"></script>
  </html>
  `;
}
