let si		= require('systeminformation');
let cpu		= require('cpu-stat');
let os		= require('os');

let sysinfo = {
	os: () => {
		return new Promise((resolve, reject) => {
			si.getStaticData().then((res) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	},
	cpuStat: () => {
		return new Promise((resolve, reject) => {
			si.currentLoad().then((res) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	},
	memStat: () => {
		return new Promise((resolve, reject) => {
			resolve({
				freeBytes: os.freemem(),
				totalBytes: os.totalmem(),
				usedBytes: os.totalmem() - os.freemem(),
				use: Number(((os.totalmem() - os.freemem())/os.totalmem() * 100).toFixed(2))
			});
		});
	},
	fsStat: () => {
		return new Promise((resolve, reject) => {
			si.fsSize((data) => {
				resolve(data);
			}, (err) => {
				reject(err);
			});
		});
	},
	netStat: () => {
		return new Promise((resolve, reject) => {
			si.networkStats((data) => {
				resolve(data);
			}, (err) => {
				reject(err);
			});
		});
	},
	ip: () => {
		return new Promise((resolve, reject) => {
			si.networkInterfaces((data) => {
				if (data[1]) {
					resolve(data[1].ip4);
				} else {
					reject(data);
				}
			}, (err) => {
				reject(err);
			});
		});
	},
	dynamic: () => {
		return new Promise((resolve, reject) => {
			si.getDynamicData((data) => {
				resolve(data);
			}, (err) => {
				reject(err);
			});
		});
	}
	
};

module.exports = sysinfo;