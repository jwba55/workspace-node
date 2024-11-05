import {MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017"; //default port

const client = new MongoClient(uri);

//비동기 처리 방식
async function list() {
    try{//동기적인것처럼 보이게 작성했지만 node.js가 비동기 처리를 해줌.
        await client.connect();

        const collection = await client.db("bookshop").collection("book");

        const result  = await collection.find().toArray(); //특정

        await client.close();

        return result;
    } catch (err){
        console.log("err", err);
    }

}

async function add(item) {
    try{
        await client.connect();

        const collection = await client.db("bookshop").collection("book");

        const result  = await collection.insertOne(item);   //insertMany도 있음

        await client.close();

        return result;
    } catch (err){
        console.log("err", err);
    }
}

async function update(id) {
    try{
        await client.connect();

        const collection = await client.db("bookshop").collection("book");

        const result  = await collection.updateOne({
            _id: new ObjectId(id)
        },{
            $set: {bookname, publisher, price}  //키값이랑 value의 값이 같으면 한번만 사용. 본래는 {bookname: bookname, publisher: publisher, price: price}이런 형식임.
        });

        await client.close();

        return result;
    } catch (err){
        console.log("err", err);
    }
}

async function remove(item) {
    try{
        await client.connect();

        const collection = await client.db("bookshop").collection("book");

        const result  = await collection.deleteOne({
            _id: new ObjectId(id)
        });

        await client.close();

        return result;
    } catch (err){
        console.log("err", err);
    }
}

//export {} - 함수
//export default {} - 객체
export default {list, add, update, remove};