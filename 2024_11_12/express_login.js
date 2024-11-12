const http = require("node:http")
const express = require("express")
const bodyParser = require("body-parser");
const session = require("express-session");

const port = 7337;
const host = "127.0.0.1";

const app = express(); //객체생성

//static 컨텐츠를 처리하는 미들웨어
app.use(express.static("public"));//미들웨어를 사용하겠다

//<form method = 'post'> 값들을 파싱해서 req.body 객체로 변환
app.use(bodyParser.urlencoded({extended: true})); 

//session middleware
app.use(session({
    secret: "1234567890",
    resave: false,
    saveUninitialized: true
})); 

app.post("/login", (req, res) =>{
    const {id, password} = req.body;    

    console.log(`login request: ${id} ${password}`);

    if(id == "dfdf" && password == "dfdf"){
        console.log("success");

        req.session.member = {id, password, name : "홍박사"};// member 객체에 넣어줌


    } else{
        console.log("login failed");
    }

    res.redirect("/");
});
app.get("/logout", (req, res) =>{
    test = req.session.member.id;
    console.log(test);

    req.session.destroy();
    res.redirect("/");
});

http.createServer(app).listen(port, host, () => {
    console.log(`접속하세요 : http://${host}:${port}`);
});