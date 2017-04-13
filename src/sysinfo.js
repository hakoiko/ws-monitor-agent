var si = require('systeminformation');

var sysinfo = {
	getCpu: function() {
		return new Promise((resolve, reject) => {
			si.cpu(function(data) {
				console.log('CPU-Information:');
				console.log(data);
				resolve(data);
			}, function(err) {
				reject(err);
			})
		});
	},
};

module.exports = sysinfo;