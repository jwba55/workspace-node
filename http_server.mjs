import { createServer } from 'node:http';

const port = 7337;
const host = "0.0.0.0"; //모든 기기에 대하여 작동할 수 있도록 설정하는 것
//본래 localhost는 내 컴퓨터의 ip이다.

//let = 가변 변수 (대상 객체 자체를 변경할 수 있음.-가변), const = 불변 변수(객체 자체는 변하지 않고 내용물을 변경할 수 있음.-불변)
//const로 사용해서 작업후 작동시켰을때 문제가 생기면 해당 부분을 let으로 변경해주기
//
let list = [];  //데이터를 관리할 배열
let seq = 1;    //시퀀스적용

list.push({
    id: seq++,
    name: "지우개",
    address: "주소",
});

list.push({
    id: seq++,
    name: "나혼자",
    address: "주소",
});

const server = createServer((req, res) => {
    req.setEncoding("utf-8");
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const body = [];
    req.on("readable", () => {
        let chunk;
        while (null !== (chunk = req.read()))
            body.push(chunk);
    });

    req.on("end", () => {    
        if(req.method === "POST") {      
          if(body) {        
            const item = JSON.parse(body);
    
            if(item) {
              item.id = seq++;
              list.push(item);     
            }
          }
        } else if(req.method === "DELETE") {      
          const id = req.url.split("/").at(-1);
    
          if(id)
            list = list.filter(value => value.id != id);
        } else if(req.method === "PUT") {
          const item = JSON.parse(body);
    
          if(item) {
            list = list.filter(value => value.id != item.id);
            list.push(item);
          }
        }
    
        list.sort((left, right) => left.id - right.id);
    
        res.end( JSON.stringify(list) );
      });  
    });
    
    server.listen(port, host, () => {
      console.log(`Listening on ${host}:${port}`);
    });