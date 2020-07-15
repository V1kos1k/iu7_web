const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dists"),
    publicPath: "/" ,
    filename: "index-bundle.js"
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: [/\.css$/],
        use: ["style-loader", "css-loader"]
      },{
        test: /.(ttf|otf|eot|svg|jpg|png|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
            loader: "file-loader",
            options: {
                name: "fonts/[name].[ext]"
            }
        }
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};