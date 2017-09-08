const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const config = {
	devtool: 'eval',
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				use: 'babel-loader',
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.css$/,
				use: ['css-hot-loader'].concat(
					ExtractPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]', 'postcss-loader']
					})
				),
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.(png|jpg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/[name].[ext]'
						}
					}
				],
				include: path.join(__dirname, 'src', 'assets')
			}
		]
	},
	resolve: {
		alias: {
			styles: path.resolve(__dirname, 'src/styles/'),
			assets: path.resolve(__dirname, 'src/assets/'),
			components: path.resolve(__dirname, 'src/components/')
		}
	},
	devServer: {
		historyApiFallback: true,
		hot: true
	},
	plugins: [
		new HtmlPlugin({
			template: 'src/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractPlugin('style.css')
	]
}

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	)
}

module.exports = config
