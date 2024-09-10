const { createServer } = require("node:http");

const port = 7337;
const host = "0.0.0.0";
let list = [];
let seq = 1;

list.push({
  id: seq++,
  name: "안광민",
  address: "대전 동구 가양동",  
});

list.push({
  id: seq++,
  name: "홍길동",
  address: "대전 서구 둔산동",
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