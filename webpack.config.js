const path = require('path');
const nodeExternals = require('webpack-node-externals'); // 외부 Node.js 모듈들을 포함하지 않기 위해 로드.
const WebpackShellPlugin = require('webpack-shell-plugin');

const OutputFileName = 'aether.agent.package.js';
var serverCfg = {
	context: path.resolve(__dirname, 'src'),
	entry: './app.js',
	target: 'node',
	externals: [nodeExternals()],//node_modules는 무시하도록 설정
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
					plugins: [require('babel-plugin-transform-strict-mode')]// 'use strict'가 없어도 별다른 경고 뱉지 않도록 빌드시 페이지마다 'use strict' 자동삽입
				}
			}]
		}]
	},
	plugins: [
		 new WebpackShellPlugin({
			 onBuildStart:['echo "Webpack Start"'],
			 onBuildEnd:['echo "Build End: ' + path.resolve(__dirname, 'dist') + '/' + OutputFileName + '"'],
		 })
	]
};

module.exports = serverCfg;