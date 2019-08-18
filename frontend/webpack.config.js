const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
	mode: "development",

	entry: {
		app: "./src/index.jsx"
	},

	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	},

	devServer: {
		proxy: {
		  '/':{
			target: 'http://localhost:5000',
			secure: false
		  }
	
		},
		contentBase: "./dist",
		hot: true,
		inline: true
	},
	

	module: {
		rules: [
		  {
			test: /\.(js|jsx)$/,
			exclude: /(node_modules|bower_components)/,
			loader: "babel-loader",
			options: { cacheDirectory: true, plugins: ["react-hot-loader/babel"] }
		  },
		  {
			test: /\.(ogg|mp3|mtl|obj|wav|mpe?g)$/i,
			use: 'file-loader'
		  },
		  {
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		  },
	
		  {
			test: /\.(png|jpg|woff|jpeg|woff2|svg|ttf|eot)($|\?)/i,
			loader: "url-loader",
			options: {
			  limit: 8000
			}
		  },
		]
	  },
	
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};
