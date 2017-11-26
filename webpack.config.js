var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/index.js",
  output: {
    path: __dirname + "/build",
    publicPath: "/build/",
    filename: "build.js"
  },
	module: {
    rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
				  loader: 'babel-loader',
				  options: {
				    presets: ['env']
				  }
				}
			},
			{
			  test: /\.css$/,
			  use: [{
			      loader: "style-loader"
			  }, {
			      loader: "postcss-loader"
			  }]
			},
			{
			  test: /\.scss$/,
			  use: [{
			      loader: "style-loader"
			  }, {
			      loader: "css-loader"
			  }, {
			      loader: "sass-loader"
			  }]
			},
			{
        test: /\.svg$/,
        loader: 'svg-inline-loader?classPrefix'
	    }
    ]
	},
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};