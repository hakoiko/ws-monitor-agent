const systeminfo		= require('systeminformation');
const os				= require('os');

let sysinfo = {
	os: () => {
		return new Promise((resolve, reject) => {
			systeminfo.getStaticData().then((res) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	},
	cpuStat: () => {
		return new Promise((resolve, reject) => {
			systeminfo.currentLoad().then((res) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	},
	memStat: () => {
		return new Promise((resolve) => {
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
			systeminfo.fsSize((data) => {
				resolve(data);
			}, (err) => {
				reject(err);
			});
		});
	},
	netStat: () => {
		return new Promise((resolve, reject) => {
			systeminfo.networkStats(false, (data) => {
				resolve(data);
			}, (err) => {
				reject(err);
			});
		});
	},
	ip: () => {
		return new Promise((resolve, reject) => {
			systeminfo.networkInterfaces((data) => {
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
			systeminfo.getDynamicData((data) => {
				resolve(data);
			}, (err) => {
				reject(err);
			});
		});
	}
	
};

module.exports = sysinfo;