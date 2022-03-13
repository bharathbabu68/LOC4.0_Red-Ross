const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());


const uri = "mongodb+srv://booky:ykoob@booky.gyemf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
var booksCount = 0;
app.get("/library", async(req, res) => {
    
    const client = new MongoClient(uri);
    try{
        await client.connect();
        const books = await client.db("LOC").collection("Books").find();
        booksArr = await books.toArray();
        booksCount = booksArr.length;
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
app.post("/addbook", async(req, res) => {
    console.log("new book adding requested");
    var book = {
        name: req.body.name,
        author: req.body.username,
        isbn: req.body.isbn,
        pagecount: req.body.pagecount,
        img: req.body.img,
        cost: parseInt(req.body.cost),
        genure: req.body.genure,
        incentive: parseInt(req.body.cost)/12,
        blockchain_id: parseInt(booksCount+1)
    };
    
    const client = new MongoClient(uri);
    try{
        await client.connect();
        var books = await client.db("LOC").collection("Books").find();
        var booksArr = books.toArray();
        book[blockchain_id] = booksArr.length+1;
        await client.db("LOC").collection("Books").insertOne(book);
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    
    var dataSend = {allBooks: "success"};
    res.send(JSON.stringify(dataSend));
    
});
app.post("/completebook", async(req, res) => {
    console.log("complete book adding requested");
    const client = new MongoClient(uri);
    var myquery = {username:req.body.username, blockchain_id:parseInt(req.body.bookId)};
    var newvalues = { $set: {status:"complete"} };
    try{
        await client.connect();
        var books = await client.db("LOC").collection("BoughtHistory").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
          
          });
        console.log(books);
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    
    var dataSend = {data: "success"};
    res.send(JSON.stringify(dataSend));
    
});
app.listen(8000, () => {
    console.log("Server running on port 8000");
});