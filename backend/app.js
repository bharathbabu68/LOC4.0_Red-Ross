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
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    var dataSend = {data: booksArr};
    res.send(JSON.stringify(dataSend));
    
});
app.post("/book", async(req, res) => {
    console.log("book details requested", req.body.bookId);
    var book = {};
    const client = new MongoClient(uri);
    try{
        await client.connect();
        book = await client.db("LOC").collection("Books").findOne({"blockchain_id":parseInt(req.body.bookId)});
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    var dataSend = {data: book};
    res.send(JSON.stringify(book));
    
});
app.post("/reading", async(req, res) => {
    
    var data = {
        username: req.body.username,
        blockchain_id: req.body.bookId,
        status: 'current'
    };
    const client = new MongoClient(uri);
    try{
        await client.connect();
        
        book = await client.db("LOC").collection("BoughtHistory").findOne({"username":req.body.username, "blockchain_id":parseInt(req.body.bookId)});
        console.log(book);
        if(book === null){
            book = await client.db("LOC").collection("BoughtHistory").insertOne(data);
        }
        else{
            console.log('already exists');
        }
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    var dataSend = {data: 'success'};
    res.send(JSON.stringify(dataSend));
    
});

app.post("/dashboard", async(req, res) => {
    console.log("dashboard details requested");
    var book = {};
    var booksArr, allBooksArr;
    const client = new MongoClient(uri);
    try{
        await client.connect();
        var allBooks = await client.db("LOC").collection("Books").find();
        book = await client.db("LOC").collection("BoughtHistory").find({"username":req.body.username});
        booksArr = await book.toArray();
        allBooksArr = await allBooks.toArray();
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    
    console.log(booksArr);
    var dataSend = {allBooks: allBooksArr, books: booksArr };
    res.send(JSON.stringify(dataSend));
    
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});