const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");
require("dotenv").config();


function loadConfig() {
  const cfg = require("./src/config/env.js");
  return cfg && cfg.default ? cfg.default : cfg;
}
const CONFIG = loadConfig();

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: process.env.NODE_ENV || "development",
  output: {
    publicPath: process.env.NODE_ENV === "testing"
    ? "http://lens-app.xculptor.studio/"
    : "auto", 
    uniqueName: "lens",
  },
  devServer: {
    port: 3001,
    headers: { "Access-Control-Allow-Origin": "*" },
    static: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: { loader: "babel-loader", options: { presets: ["@babel/preset-env","@babel/preset-react"] } } }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
                  "process.env.BACKEND_BASE_URL": JSON.stringify(process.env.BACKEND_BASE_URL),
                  "process.env.REACT_APP_ENV": JSON.stringify(process.env.REACT_APP_ENV)
                }),
    new ModuleFederationPlugin({
      name: "lens",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx"
      },
      remotes: {
        canvas: `canvas@${CONFIG.lensCanvas}/remoteEntry.js`,
        core: `core@${CONFIG.lensCore}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
       mitt: { singleton: true, requiredVersion: "^3.0.0" },
        three: { singleton: true, requiredVersion: "*" } // if using three
      }
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "./public/index.html") })
  ],
  resolve: { extensions: [".js", ".jsx"] }
};