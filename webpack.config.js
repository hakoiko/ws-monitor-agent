const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules:[{
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['es2016']
					]
				}
			}]
		},{
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}, {
			test: /\.(png|jpg)$/,
			use: [{
				loader: 'url-loader'
			}]
		}]
	},
	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['./']}
		})
	]
};