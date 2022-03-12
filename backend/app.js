const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());


const uri = "mongodb+srv://booky:ykoob@booky.gyemf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.get("/library", async(req, res) => {
    
    const client = new MongoClient(uri);
    try{
        await client.connect();
        const books = await client.db("LOC").collection("Books").find();
        booksArr = await books.toArray();
        console.log(booksArr);
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    var dataSend = {data: booksArr};
    res.send(JSON.stringify(dataSend));
    
});
app.post("/book", async(req, res) => {
    console.log("book details requested");
    var book = {};
    const client = new MongoClient(uri);
    try{
        await client.connect();
        book = await client.db("LOC").collection("Books").findOne();
        console.log(book);
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    var dataSend = {data: book};
    res.send(JSON.stringify(book));
    
});
app.listen(8000, () => {
    console.log("Server running on port 8000");
});