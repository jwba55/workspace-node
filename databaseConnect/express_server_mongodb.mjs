import { createServer } from "node:http"
import express from "express"

import mongo  from "./mongo.mjs";

const port = 7337;
const host = "127.0.0.1";

const app = express(); //객체생성

//static 컨텐츠를 처리하는 미들웨어
app.use(express.static("public")); //미들웨어를 사용하겠다

//json 문자열을 req.body 객체로 변환해주는 미들웨어
app.use(express.json());

//모듈화 된 mongodb호출
const sendList = async (req, res) => {    //람다식을 담음
    const list = await mongo.list(); //promise로 넘어오는것을 감싸서 이게 끝났을때 다음으로 넘어감

    console.log(list);

    res.header("Content-Type", "application/json; charset=utf8")
    res.end(JSON.stringify(list));
};

app.get("/book", sendList);

app.post("/book", async (req,res) =>{
    await mongo.add(req.body);

    sendList(req, res);
});

app.put("/book", async (req,res) =>{
    await mongo.update(req.body);

    sendList(req, res);
});

app.delete("/book/:bookid", async (req, res)=>{ //
    await mongo.remove(req.params.bookid);
    sendList(req, res);
});

createServer(app).listen(port, host, () => {
    console.log(`접속하세요 : http://${host}:${port}`);
});