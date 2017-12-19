var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry:{
    "index":"./app/index.jsx",
    "vendor":["react","react-dom","react-router"]
  },
  output:{
    'path': path.resolve(__dirname,"./app/build"),
    'publicPath' :"",
    'filename' : "[name].bundle.js"
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test:/\.js[x]$/,
        loader:'babel-loader?presets[]=es2015&presets[]=react',
        exclude: path.resolve(__dirname,"./node_modules")
      },
      {
        test: /\.(png|jpg|gif)$/, 
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve:{
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, './app/src'),
      path.resolve(__dirname, './node_modules'),
    ]   
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
    })
  ]
}
