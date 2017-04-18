const Sysinfo = require('./sysinfo');
const Config = require('./config');
const Websocket = require('ws');

console.log(Config.ROW);
const ws = new Websocket(Config.AETHER_URL);

let stat = {
	os: () => {
		return Sysinfo.os();
	},
	cpu: () => {
		return Sysinfo.cpu();
	},
	mem: () => {
		return Sysinfo.mem();
	},
	fs: () => {
		return Sysinfo.fs();
	},
	ip: () => {
		return Sysinfo.ip();
	},
	oops: 'OOPS',
	dynamic: function() {
		return new Promise((resolve, reject) => {
			Promise.all([this.cpu(), this.mem(), this.fs(), this.ip()]).then((res) => {
				resolve({
					cpu: res[0],
					mem: res[1],
					fs: res[2],
					ip: res[3].net[1].ipv4
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