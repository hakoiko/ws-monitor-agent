const Sysinfo = require('./sysinfo');
const Config = require('./config');

console.log(Config.ROW);

let stat = {
	cpu: () => {
		return new Promise((resolve, reject) => {
			Sysinfo.cpu().then((res) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}
};

stat.cpu().then((res) => {
	console.log(res);
});