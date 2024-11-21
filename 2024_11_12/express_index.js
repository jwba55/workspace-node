const http = require("node:http");
const express = require("express");
const session = require("express-session");
const expressLogin = require('./express_login.js');
const expressRegister = require('./express_register.js');

const port = 7337;
const host = "127.0.0.1";

const app = express(); // 객체 생성

app.use(express.static("public")); // static 파일 미들웨어
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
    session({
      secret: "1234567890", // 비밀 키 설정
      resave: false, // 세션이 수정되지 않으면 저장하지 않음
      saveUninitialized: true, // 초기화되지 않은 세션도 저장
    })
  );

// form 데이터 파싱 미들웨어
app.use(express.urlencoded({ extended: true }));  // HTML form data를 처리
app.use(express.json()); // JSON 요청 처리

// 로그인 및 회원가입 라우터 미들웨어 사용
app.use(expressLogin); // express_login.js에서 정의된 라우터를 사용
// session middleware 설정


  //기본 주소설정
app.get("/", (req, res) => {
    const username = req.session.username; // 세션에 저장된 username 확인
    res.render("index", { username }); // index.ejs 템플릿에 username 전달
  });
app.use(expressRegister); // express_register.js에서 정의된 라우터를 사용

// 서버 시작
http.createServer(app).listen(port, host, () => {
    console.log(`접속하세요 : http://${host}:${port}`);
});