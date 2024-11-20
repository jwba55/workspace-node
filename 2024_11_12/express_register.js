const express = require("express");
const router = express.Router();

// 필요한 경우 mongo 모듈을 임포트
const mongo = require("./mongo_register"); // mongo 모듈의 경로를 수정해야 할 수 있습니다.

router.use(express.urlencoded({ extended: true })); // HTML form 데이터 처리
router.use(express.json()); // JSON 데이터 처리

// 모듈화 된 mongodb 호출
const sendList = async (req, res) => {
    try {
        const list = await mongo.list(); // Promise로 넘어오는 것을 감싸서 이게 끝났을 때 다음으로 넘어감
        console.log(list);
        res.header("Content-Type", "application/json; charset=utf8");
        res.end(JSON.stringify(list));
    } catch (error) {
        console.error("Error fetching list:", error);
        res.status(500).send("Error fetching list");
    }
};

router.get("/register", sendList);

router.post("/register", async (req, res) => {
    try {
        console.log("Received POST request:", req.body);
        const item = req.body;
        await mongo.add(item);
        sendList(req, res);
        res.send(`
            <script>
                alert("회원가입이 완료되었습니다.");
            </script>
        `);
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).send("Error adding item");
    }
});

router.put("/register", async (req, res) => {
    try {
        const item = req.body;
        await mongo.update(item);
        sendList(req, res);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).send("Error updating item");
    }
});

router.delete("/register/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        await mongo.remove(userId);
        sendList(req, res);
    } catch (error) {
        console.error("Error removing item:", error);
        res.status(500).send("Error removing item");
    }
});

module.exports = router; // 라우터를 외부에서 사용할 수 있게 export