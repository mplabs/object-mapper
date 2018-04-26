module.exports = {
  mode: process.env.MODE || "development",
  entry: [
    "@babel/polyfill",
    "./src/theme/main.scss",
    "./src/main",
    process.env.MODE === 'development' ? 'webpack-dev-server/client?http://localhost:1337' : ''
  ],
  output: {
    path: `${__dirname}/dist`,
    publicPath: "/",
    filename: "bundle.min.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-stage-0"],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-transform-react-jsx"
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./src",
    port: 1337
  }
}
