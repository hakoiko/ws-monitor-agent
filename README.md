# Node.js System Monitor Agent
It's a system performance monitoring process. `ws-monitor-agent` check your system performance snd send stats to another server with websocket. This agent could be useful when you need to monitor multiple servers.

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
the process runs with PM2. or you can run this monitoring process just type `pm2 start dist/node.bundle.js --watch` if you already installed PM2.

# Requirements
- node.js > 5.x
- node-gyp
- gcc

the process needs node.js 5.x~. and also need node-gyp and gcc. if your system dosen't have gcc, please install it. if you use a vainilla centOS, you must do it. 
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