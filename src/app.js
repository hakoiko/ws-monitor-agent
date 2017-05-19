const sysinfo = require('./sysinfo');
const config = require('./config');
//const Websocket = require('ws');
const socket = require('socket.io-client')(config.AETHER_URL)

//console.log(Config.ROW);
//const ws = new Websocket(Config.AETHER_URL);

let stat = {
	os: () => {
		return sysinfo.os();
	},
	cpuStat: () => {
		return sysinfo.cpuStat();
	},
	memStat: () => {
		return sysinfo.memStat();
	},
	fsStat: () => {
		return sysinfo.fsStat();
	},
	netStat: () => {
		return sysinfo.netStat();
	},
	ip: () => {
		return sysinfo.ip();
	},
	dynamicAll: function() {
		return new Promise((resolve, reject) => {
			Promise.all([sysinfo.dynamic(), this.ip()]).then((res) => {
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

/*ws.on('open', function open() {
	setInterval(() => {
		stat.dynamic().then((res) => {
			console.log(Config.ROW, Config.AETHER_URL, Config.ROW);
			console.log('SEND:', res);
			ws.send(JSON.stringify(res));
		}).catch((err) => {
			console.log(err);
		});
	}, Config.INTERVAL);
});*/

console.info('=== AETHER AGENT START ===');
socket.on('connect', function(data){
	console.log('SOCKET CONNECTED');
	setInterval(() => {
		stat.dynamic().then((res) => {
			//console.log(config.ROW, config.AETHER_URL, config.ROW);
			//console.log('SEND:', res);
			socket.emit('usage', res);
		}).catch((err) => {
			console.error(err);
		});
	}, config.INTERVAL);
});