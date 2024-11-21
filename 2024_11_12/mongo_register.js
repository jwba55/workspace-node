const { MongoClient} = require("mongodb");
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
  
      return result;
  
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

async function list() {
  try {
    await client.connect();
    
    const collection = await client.db("tester").collection("users");
    const result  = await collection.find().toArray(); //특정

    console.log(result);

    return result;

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// list().catch(console.dir);


async function add(item) {
    try{
        await client.connect();

        const collection = await client.db("tester").collection("users");
        
        const result = await collection.insertOne({
            _id: item.userId, // _id를 userId로 설정
            username: item.username,
            password: item.password,
        });

        return result;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}
// add().catch(console.dir);

async function update(item) {
    try{
        await client.connect();

        const collection = await client.db("tester").collection("users");

        const result  = await collection.updateOne({
            _id: item.userId
        },{
            $set: {password : item.password}  //키값이랑 value의 값이 같으면 한번만 사용. 본래는 {bookname: bookname, publisher: publisher, price: price}이런 형식임.
        });

        return result;
    }finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    // update().catch(console.dir);

async function remove(item) {
    try{
        await client.connect();

        const collection = await client.db("tester").collection("users");

        const result  = await collection.deleteOne({
            _id: item.userId
        });

        return result;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
//    remove().catch(console.dir);
module.exports = {list, add, update, remove, findId};