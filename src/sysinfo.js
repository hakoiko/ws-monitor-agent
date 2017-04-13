let si = require('systeminformation');
let cpu = require('cpu-stat');

let sysinfo = {
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
	},
};

module.exports = sysinfo;