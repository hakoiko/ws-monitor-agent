# Node.js System Monitor Agent
Simply, it's a system performance monitoring process. `ws-monitor-agent` check your system performance snd send the stats to another server through websocket. this agent could be usefule when you need to monitor multiple servers.

# Boot up
set server url and monitoring interval at `src/config.js`.
```
SERVER_URL: 'http://localhost:8080/ws/agent',
INTERVAL: 1000
```
and run with
```
npm run start
```
the app runs with PM2. or you can run this monitoring agent just type `pm2 start dist/node.bundle.js --watch` if you installed PM2.

# Requirements
- node.js > 5.x
- node-gyp
- gcc

the app needs node.js latest then 5.x. and also need node-gyp and gcc. if your system dosen't have gcc, please install it. if you use a vainilla centOS, you must do it. 
```
sudo yum install gcc-c++
```

# Usage
## Starting app
```
npm install
npm run start
```

## Serverside setup

Just simple as normal socket.io settings. I recommend to use socket.io and express
```
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io =  require('socket.io')(server)
var agent = io.of('/ws/agent')
agent.on('connect', function(socket) {
	console.log('AGENT CONNECTED')
	socket.on('usage', function (data) {
		console.log('USAGE RECEIVED : ', data)
	});
});
```

# License

MIT License.