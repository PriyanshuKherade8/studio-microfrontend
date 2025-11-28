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
console.log("CONFIG.lensApp", CONFIG.lensApp)
module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: process.env.NODE_ENV || "development",
  output: {
    publicPath: process.env.NODE_ENV === "testing"
    ? "http://lens-app.xculptor.studio/"
    : "auto", 
    uniqueName: "shell",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    static: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader", options: { presets: ["@babel/preset-env","@babel/preset-react"] } }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
     new webpack.DefinePlugin({
          "process.env.BACKEND_BASE_URL": JSON.stringify(process.env.BACKEND_BASE_URL),
          "process.env.REACT_APP_ENV": JSON.stringify(process.env.REACT_APP_ENV)
        }),
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        lens: `lens@${CONFIG.lensApp}/remoteEntry.js`,
        core: `core@${CONFIG.lensCore}/remoteEntry.js`,
        canvas: `canvas@${CONFIG.lensCanvas}/remoteEntry.js`,
        controls: `controls@${CONFIG.lensControls}/remoteEntry.js`,
        assets: `assets@${CONFIG.lensAssets}/remoteEntry.js`,
        render: `render@${CONFIG.lensRender}/remoteEntry.js`,
        components: `components@${CONFIG.lensComponents || CONFIG.lensComponentsUrl || `${CONFIG.lensAssets}`}/remoteEntry.js`
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
         mitt: { singleton: true, requiredVersion: "^3.0.0" },
        // lens should not include mitt; core will provide mitt
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html")
    })
  ],
  resolve: { extensions: [".js", ".jsx"] }
};