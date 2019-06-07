const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const WebpackNotifierPlugin = require("webpack-notifier");
const merge = require("webpack-merge");

const publicPath = path.resolve("dist") + "/";
const srcPath = path.resolve("src/");
const isProdMode = process.env.NODE_ENV === "production";
const ManifestPlugin = require("webpack-manifest-plugin");

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
    new ManifestPlugin({ writeToFileEmit: true }),
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

const development = {
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
  // resolve: {
  //   alias: {
  //     "react-dom": "@hot-loader/react-dom",
  //   },
  // },
  plugins: [
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new WebpackNotifierPlugin({ title: "Client" }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const prodOrTest = {
  mode: "production",
  entry: {
    index: ["index.jsx"],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  externals: [
    'react',
    'react-dom',
    'react-router',
    /^babel\/.+$/,
  ],
  output: {
    path: publicPath,
    // publicPath: "/dist",
    // library: "audio-player",
    libraryTarget: "umd",
    filename: "[name].js",
  },
};

module.exports = merge([common, isProdMode ? prodOrTest : development]);
