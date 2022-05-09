"use strict";

const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const CleanPlugin = require("./utils/clean-plugin");
const NodeUtils = require("./src/services/common/node-service");

const appConfig = require("./config/config");

const APP_DIR = path.join(__dirname, "src");

/**
 * Get webpack plugins
 * @returns {*[]}
 */
function getPlugins() {
  return [
    // Clear the output dir before builds
    new CleanPlugin({
      files: ["docs/*"]
    }),

    // Extract CSS to a separate file
    new MiniCssExtractPlugin({
      filename: !NodeUtils.isDevelopment() ? "[name].[hash].css" : "[name].css",
      chunkFilename: !NodeUtils.isDevelopment() ? "[id].[hash].css" : "[id].css"
    }),

    // Ignore moment locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // Inject bundles and CSS directly into the HTML template
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      inject: "body"
    }),

    // Pass NODE_ENV and APP_CONFIG to application
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        APP_CONFIG: JSON.stringify(appConfig),
        REACT_APP_URL: JSON.stringify("http://localhost:9000")
      }
    })
  ];
}

function getCodeSplittingConfig() {
  return {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial"
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    },
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: 8,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  };
}

/**
 * Get Webpack file parsing rules
 * @returns {*[]}
 */
function getParserRules() {
  const devCssLoaders = ["style-loader", "css-loader"];
  const devSassLoaders = ["style-loader", "css-loader", "sass-loader"];

  // Extract Css and autoprefix
  const prodCssLoaders = [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        plugins: () => [autoprefixer({})]
      }
    }
  ];

  // Extract SASS and autoprefix
  const prodSassLoaders = [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        plugins: () => [autoprefixer({})]
      }
    },
    "sass-loader"
  ];

  return [
    {
      test: /\.(js|jsx)$/,
      loaders: "babel-loader",
      include: APP_DIR
    },
    {
      test: /\.s?css$/,
      use: !NodeUtils.isDevelopment() ? prodSassLoaders : devSassLoaders,
      include: APP_DIR
    },
    {
      test: /\.css$/i,
      use: !NodeUtils.isDevelopment() ? prodCssLoaders : devCssLoaders
    },
    {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: "url-loader?limit=10000&name=[name]-[hash].[ext]",
      include: APP_DIR
    },
    {
      test: /\.ico$/,
      loader: "file-loader?name=[name].[ext]"
    },
    {
      test: /\.json$/,
      loader: "json-loader",
      include: APP_DIR
    }
  ];
}

const webpackConfig = {};

// Configure the output directory and bundle name
webpackConfig.output = {
  path: path.join(__dirname, "docs"),
  filename: "[name].bundle.js"
};

// Allow webpack to automatically resolve import extensions
webpackConfig.resolve = {
  extensions: [".js", ".jsx", ".json"]
};

// Set up code splitting
webpackConfig.optimization = getCodeSplittingConfig();

// Set webpack plugins
webpackConfig.plugins = getPlugins();

// Set up file parsing rules
webpackConfig.module = {
  rules: getParserRules()
};

// Add additional configurations based on NODE_ENV
if (!NodeUtils.isDevelopment()) {
  webpackConfig.entry = "./src/App";
  webpackConfig.mode = "production";
} else {
  webpackConfig.devtool = "source-map";
  // webpackConfig.devtool = 'eval';
  webpackConfig.mode = "development";
  webpackConfig.entry = [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://localhost:${appConfig.example.port}`,
    "webpack/hot/only-dev-server",
    "./src/App"
  ];
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = webpackConfig;
