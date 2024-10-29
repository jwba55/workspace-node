import { createServer } from "node:http"
import express from "express"

const port = 7337;
const host = "127.0.0.1";

const app = express(); //객체생성

//static 컨텐츠를 처리하는 미들웨어
app.use(express.static("public")); //미들웨어를 사용하겠다

//json 문자열을 req.body 객체로 변환해주는 미들웨어
app.use(express.json());

let list = [];
let seq = 1;
const book = req.body;

list.push({
    bookid: seq++,
    bookname: "c++"
});

list.push({
    bookid: seq++,
    bookname: "G코드"
})

const sendList = (req, res) => {    //람다식을 담음
    res.header("Content-Type", "application/json; charset=utf8")
    res.end(JSON.stringify(list));
};

app.get("/book", sendList)

app.post("/book", (req,res) =>{

    book[bookid] = seq++;
    
    list.push(book)

    sendList(req, res);
});

app.put("/book", (req,res) =>{

    list = list.filter(item => item.bookid != book.bookid);
    
    list.push(book);

    sendList(req, res);
});

app.delete("/book/:bookid", (req, res)=>{ //
    list = list.filter(item => item.bookid != req.params.bookid);   //id 값이 일치하지 않는 애들로만 구성된 배열을 재구성함

    sendList(req, res);
});

createServer(app).listen(port, host, () => {
    console.log(`접속하세요 : http://${host}:${port}`);
});