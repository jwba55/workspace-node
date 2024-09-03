import { createServer } from 'node:http';

const item2 = "test";

const item = {
    name: "지우개",
    address: "주소",
    tel: item2
}

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(item));//json으로 변환하여 던짐
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {// 대기상태
  console.log('Listening on 127.0.0.1:3000');
});