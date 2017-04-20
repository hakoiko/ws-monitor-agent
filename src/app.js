const Sysinfo = require('./sysinfo');
const Config = require('./config');
const Websocket = require('ws');

//console.log(Config.ROW);
const ws = new Websocket(Config.AETHER_URL);

let stat = {
	os: () => {
		return Sysinfo.os();
	},
	cpuStat: () => {
		return Sysinfo.cpuStat();
	},
	memStat: () => {
		return Sysinfo.memStat();
	},
	fsStat: () => {
		return Sysinfo.fsStat();
	},
	netStat: () => {
		return Sysinfo.netStat();
	},
	ip: () => {
		return Sysinfo.ip();
	},
	dynamicAll: function() {
		return new Promise((resolve, reject) => {
			Promise.all([Sysinfo.dynamic(), this.ip()]).then((res) => {
				var data = res[0];
				data.ip = res[1];
				resolve(data);
			}, (err) => {
				reject(err);
			});
		});
	},
	dynamic: function() {
		return new Promise((resolve, reject) => {
			Promise.all([this.cpuStat(), this.memStat(), this.fsStat(), this.netStat(), this.ip()]).then((res) => {
				resolve({
					cpu: res[0],
					mem: res[1],
					fs: res[2],
					net: res[3],
					ip: res[4]
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