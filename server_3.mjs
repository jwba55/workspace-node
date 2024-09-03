import { createServer } from 'node:http';//모듈

const list = [];

list.push({
    name: "지우개",
    address: "주소",
    tel: ""
});

list.push({
  name: "나혼자",
  address: "주소",
  tel: ""
});

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  console.log(req.method)

  if(req.method == "POST"){

    console.log(item);

    res.end(JSON.stringify(item));//json으로 변환하여 던짐
  } else{
    res.end(JSON.stringify(list));//json으로 변환하여 던짐
  }


  res.end(JSON.stringify(list));//json으로 변환하여 던짐
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {// 대기상태
  console.log('Listening on 127.0.0.1:3000');
});