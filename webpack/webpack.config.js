const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const publicPath = path.resolve("dist") + "/";
const srcPath = path.resolve("src/");
const isProdMode = process.env.NODE_ENV === "production";

let BundleAnalyzerPlugin = {};
let WebpackNotifierPlugin = {};
let ManifestPlugin = {};
let development = {};

const common = {
  name: "main",
  context: srcPath,
  devtool: "source-map",
  output: {
    path: publicPath,
    publicPath: publicPath,
    filename: "[name].js",
  },
  resolve: {
    modules: [path.resolve(srcPath), "node_modules"],
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
      global: { IS_BROWSER: true },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-flow",
            ["@babel/preset-env"],
            "@babel/react",
          ],
        },
      },
    ],
  },

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          name: "vendor",
          chunks: "initial",
          test: /node_modules/,
          priority: 20,
        },
      },
    },
  },
};

if (!isProdMode) {
  BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  WebpackNotifierPlugin = require("webpack-notifier");
  ManifestPlugin = require("webpack-manifest-plugin");

  development = {
    mode: "development",
    devServer: {
      contentBase: publicPath,
      publicPath: publicPath,
      serverSideRender: true,
      overlay: true,
      hot: true,
      stats: {
        colors: true,
      },
    },
    entry: {
      index: [
        "react-hot-loader/patch",
        "webpack-hot-middleware/client",
        "../example/index.js",
      ],
    },
    resolve: {
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
    },
    plugins: [
      new ManifestPlugin({ writeToFileEmit: true }),
      new BundleAnalyzerPlugin({ openAnalyzer: false }),
      new WebpackNotifierPlugin({ title: "Client" }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
        },
      }),
    ],
  };
}

const prodOrTest = {
  mode: "production",
  entry: {
    index: ["index.jsx"],
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
      umd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
      umd: "react-dom",
    },
    "styled-components": {
      commonjs: "styled-components",
      commonjs2: "styled-components",
      amd: "styled-components",
    },
    "redux-logger": {
      commonjs: "redux-logger",
      commonjs2: "redux-logger",
      amd: "redux-logger",
    },
  },
  optimization: {
    minimizer: [],
  },
  output: {
    path: publicPath,
    library: "audio-player-js",
    umdNamedDefine: true,
    libraryTarget: "umd",
    filename: "[name].js",
  },
};

module.exports = merge([common, isProdMode ? prodOrTest : development]);
