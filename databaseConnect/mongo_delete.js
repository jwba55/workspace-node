const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const collection = await client.db("bookshop").collection("book");

    const result = await collection.updateOne({
        bookname: "도서명 1",},
        {$set: {
            price: {"$add" : ["$price", 100]}
        }
    });

    console.log(result);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);