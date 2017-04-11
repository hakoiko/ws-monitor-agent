const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: './app/index.js',
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
						['es2016', {modules: true}]
					]
				}
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