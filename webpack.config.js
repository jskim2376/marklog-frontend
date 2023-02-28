const path = require("path"); //노드 모듈 중에 path를 가져와서 사용
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development", //개발용이나 프로덕션용이냐
  entry: {
    app: "./src/app.js",
  },
  output: {
    //여러개의 모듈을 하나로 만들어서 저장시킬 위치를 설정
    publicPath: "/",
    filename: "[name].js",
    path: path.resolve("./dist"),
    clean: true,
  },
  devServer: {
    port: 9000,
  },
  module: {
    // Bundle styles into main.css
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        // Copy Shoelace assets to dist/shoelace
        {
          from: path.resolve(
            __dirname,
            "node_modules/@shoelace-style/shoelace/dist/assets"
          ),
          to: path.resolve(__dirname, "dist/shoelace/assets"),
        },
      ],
    }),
  ],
};
