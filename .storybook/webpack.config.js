const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const sass = require("sass");
const autoprefixer = require("autoprefixer");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const pkg = require("../package.json");

module.exports = (baseConfig, env, defaultConfig) => {
  const isProduction = env === "PRODUCTION";

  // See http://webpack.github.io/docs/configuration.html#devtool
  defaultConfig.devtool = "source-map";

  defaultConfig.module.rules.push({
    test: /\.(scss|css)$/,
    loaders: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          minimize: true,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          plugins: () => [autoprefixer()],
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          implementation: sass,
        },
      },
    ],
    include: path.resolve(__dirname, "../"),
  });

  defaultConfig.plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
  );

  defaultConfig.plugins.push(
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      analyzerMode: "static",
      // Path to bundle report file that will be generated in `static` mode.
      reportFilename: path.join(
        __dirname,
        "..",
        "public",
        "webpack-stats.html",
      ),
      // Automatically open report in default browser
      openAnalyzer: false,
      logLevel: isProduction ? "info" : "warn",
    }),
  );

  return defaultConfig;
};
