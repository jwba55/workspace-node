const http = require("node:http");
const express = require("express");
const expressLogin = require('./express_login.js');
const expressRegister = require('./express_register.js');

const port = 7337;
const host = "127.0.0.1";

const app = express(); // 객체 생성

app.use(express.static("public")); // static 파일 미들웨어

// form 데이터 파싱 미들웨어
app.use(express.urlencoded({ extended: true }));  // HTML form data를 처리
app.use(express.json()); // JSON 요청 처리

// 로그인 및 회원가입 라우터 미들웨어 사용
app.use(expressLogin); // express_login.js에서 정의된 라우터를 사용
app.use(expressRegister); // express_register.js에서 정의된 라우터를 사용

// 서버 시작
http.createServer(app).listen(port, host, () => {
    console.log(`접속하세요 : http://${host}:${port}`);
});