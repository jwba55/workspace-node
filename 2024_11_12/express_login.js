const express = require("express");
const session = require("express-session");
const router = express.Router();

// static 파일 제공을 위한 미들웨어
router.use(express.static("public")); // static 파일을 처리

// form 데이터 처리 미들웨어
router.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 처리
router.use(express.json()); // JSON 데이터 처리

// session middleware 설정
router.use(
  session({
    secret: "1234567890", // 비밀 키 설정
    resave: false, // 세션이 수정되지 않으면 저장하지 않음
    saveUninitialized: true, // 초기화되지 않은 세션도 저장
  })
);

// 로그인 요청 처리
router.post("/login", (req, res) => {
  const { userId, password } = req.body;

  console.log(`login request: ${userId} ${password}`);

  if (
    userId === req.session.member.userId &&
    password === req.session.member.password
  ) {
    console.log("Login successful");

    req.session.member = { userId, password, username: "홍박사" }; // 세션에 사용자 정보 저장
    res.redirect("/"); // 로그인 후 리디렉션
    } else {
        console.log("Login failed");
        res.status(401).send("Login failed"); // 로그인 실패 시 오류 응답
    }
});

// 로그아웃 요청 처리
router.get("/logout", (req, res) => {
  if (req.session.member) {
    console.log(`Logging out user: ${req.session.member.userId}`);
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Failed to destroy session");
      }
      res.redirect("/"); // 로그아웃 후 리디렉션
    });
  } else {
    console.log("No user to log out");
    res.redirect("/"); // 이미 로그인이 되어 있지 않다면 홈으로 리디렉션
  }
});

module.exports = router; // 라우터를 외부에서 사용할 수 있게 export