const Sysinfo = require('./sysinfo');
const Config = require('./config');
const Websocket = require('ws');

console.log(Config.ROW);
const ws = new Websocket(Config.AETHER_URL);

let stat = {
	os: () => {
		return new Promise((resolve, reject) => {
			Sysinfo.os().then((res) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	},
	cpu: () => {
		return new Promise((resolve, reject) => {
			Sysinfo.cpu().then((res) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	},
	mem: () => {
		return Sysinfo.mem();
	},
	fs: () => {
		return Sysinfo.fs();
	},
	oops: 'OOPS',
	dynamic: function() {
		return new Promise((resolve, reject) => {
			Promise.all([this.cpu(), this.mem(), this.fs()]).then((res) => {
				resolve({
					cpu: JSON.stringify(res[0]),
					mem: JSON.stringify(res[1]),
					fs: JSON.stringify(res[2])
				});
			}, (err) => {
				reject(err);
			});
		});
	}
};

ws.on('open', function open() {
	setInterval(() => {
		stat.dynamic().then((res) => {
			console.log(Config.ROW);
			console.log('SEND:', res);
			ws.send(JSON.stringify(res));
		}).catch((err) => {
			console.log(err);
		});
	}, Config.INTERVAL);
});