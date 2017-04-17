const Sysinfo = require('./sysinfo');
const Config = require('./config');
const Websocket = require('ws');
const os = require('os');

console.log(Config.ROW);
const ws = new Websocket(Config.AETHER_URL);

let stat = {
	cpu: () => {
		return new Promise((resolve, reject) => {
			Sysinfo.cpu().then((res) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}
};

console.log(os.hostname());

ws.on('open', function open() {
	setInterval(() => {
		stat.cpu().then((res) => {
			console.log('SEND:', res)
			ws.send(res);
		}).catch((err) => {
			console.log(err);
		});
	}, 1000);
});