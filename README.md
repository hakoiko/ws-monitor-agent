# Node.js System Monitor Agent
src/config.js의 AETHER_URL을 설정하고 `npm run start` 커맨드를 이용해 빌드 & 실행합니다. PM2가 설치되어있다면 `pm2 start dist/node.bundle.js --watch` 커맨드로 돌려도 충분합니다.

# Requirements
- node.js > 5.x
- node-gyp
- gcc

실행되는 OS에 맞는 node.js 5.x 이상이 필요합니다. 시스템 정보를 가져오기 위해 node.js 설치시에 gcc가 필요합니다. node.js 설치 완료 후 `sudo yum install gcc-c++` 등의 커맨드로 gcc를 설치합니다.

# usage
```
npm install
npm run start //for development
npm run build //for production
```