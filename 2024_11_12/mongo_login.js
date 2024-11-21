const {MongoClient} = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";
const client = new MongoClient(uri);

//해당하는 아이디 찾기
async function findId(item) {
    try {
      await client.connect();
      
      const collection = await client.db("tester").collection("users");
      const result = await collection.findOne({ _id: item.userId });
  
      console.log(result);
  
      if (result) {
        console.log("User found:", result); // 전체 사용자 정보 출력
        return {
          userId: result._id,
          username: result.username, // 사용자 이름
          password: result.password  // 비밀번호
        };
      } else {
        console.log("User not found");
        return null; // 사용자 없으면 null 반환
      }
  
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

//    remove().catch(console.dir);
module.exports = {findId};