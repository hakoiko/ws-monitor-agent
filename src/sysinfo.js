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
	cpu: () => {
		return new Promise((resolve, reject) => {
			si.currentLoad().then((res) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	},
	mem: () => {
		return new Promise((resolve, reject) => {
			resolve({
				freeBytes: os.freemem(),
				totalBytes: os.totalmem(),
				usedBytes: os.totalmem() - os.freemem(),
				use: ((os.totalmem() - os.freemem())/os.totalmem() * 100).toFixed(2)
			});
		});
	},
	fs: () => {
		return new Promise((resolve, reject) => {
			si.fsSize((data) => {
				resolve(data);
			}, (err) => {
				reject(err);
			});
		});
	}
};

module.exports = sysinfo;