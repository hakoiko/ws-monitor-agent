let si	= require('systeminformation');
let cpu	= require('cpu-stat');
let os	= require('os');

let sysinfo = {
	os: function() {
		return {
			arch: os.arch(),
			homedir: os.homedir(),
			hostname: os.hostname(),
			ip: os.networkInterfaces().en0[1].address,
			loadAvg: os.loadavg(),
			platform: os.platform(),
			release: os.release(),
			type: os.type(),
			uptime: os.uptime()
		};
	},
	cpu: function() {
		return new Promise((resolve, reject) => {
			cpu.usagePercent(function(err, percent, seconds) {
				if (err) {
					reject(err);
				} else {
					resolve(percent);
				}
			});
		});
	}
};

module.exports = sysinfo;