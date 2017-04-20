const path = require('path');
const nodeExternals = require('webpack-node-externals'); // 외부 Node.js 모듈들을 포함하지 않기 위해 로드.
const WebpackShellPlugin = require('webpack-shell-plugin');

const OutputFileName = 'aether.agent.package.js';
var serverCfg = {
	context: path.resolve(__dirname, 'src'),
	entry: './app.js',
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: OutputFileName
	},
	module: {
		rules:[{
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['es2016']
					],
					plugins: [require('babel-plugin-transform-strict-mode')]
				}
			}]
		}]
	},
	plugins: [
		 new WebpackShellPlugin({
			 onBuildStart:['echo "Webpack Start"'],
			 onBuildEnd:['node ' + path.resolve(__dirname, 'dist') + '/' + OutputFileName],
		 })
	]
};

module.exports = serverCfg;