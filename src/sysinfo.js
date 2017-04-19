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
				use: Number(((os.totalmem() - os.freemem())/os.totalmem() * 100).toFixed(2))
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
				console.log('D');
				resolve(data);
			}, (err) => {
				reject(err);
			});
		});
	}
	
};

module.exports = sysinfo;