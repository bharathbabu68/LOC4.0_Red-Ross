const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient } = require("mongodb");
const sha256 = require("sha256");

app.use(cors());
app.use(bodyParser.json());


const uri = "mongodb+srv://booky:ykoob@booky.gyemf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function mains()
{
    await client.connect();
}
mains();

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
    var bookid = parseInt(req.body.bookId);
    console.log(bookid);
    console.log("book details requested");
    var book = {};
    const client = new MongoClient(uri);
    try{
        await client.connect();
        book = await client.db("LOC").collection("Books").findOne({"blockchain_id":bookid});
        console.log(book);
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    var dataSend = {data: book};
    res.send(JSON.stringify(book));
    
});

app.post("/login",async (req,res)=>{
    try {
        // Connect to the MongoDB cluster
       obj=req.body;
        const result=await finduser(client,obj.name);
        var finalans={};

        if(result===0){
            finalans["success"]=-1;
            res.send(JSON.stringify(finalans));
        }
        
        if(result.password===sha256(req.body.password))
        {
            finalans["success"]=1;
        }
        else
        finalans["success"]=0;
        res.send(JSON.stringify(finalans));
       
         
    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
       //  await client.close();
    
    }
   
});

app.post("/signup",async (req,res)=>{
    try {
        // Connect to the MongoDB cluster
       obj=req.body;
       var userdata={username:obj.username,password:sha256(obj.password)};
        const tempresult = await finduser(client,obj.username);
        if(tempresult===0){
            const result = await client.db("LOC").collection("Users").insertOne(userdata);
            console.log(result);
            var finalans={
                'success': 1
            };
        }
        else{
            var finalans={
                'success': -1
            };
        }
        res.send(JSON.stringify(finalans));
        } catch (e) {
            console.error(e);
        } finally {
            // Close the connection to the MongoDB cluster
        //  await client.close();
        
        }
   
});

async function finduser(client,username)
{
    const cursor = await client.db("LOC").collection("Users").findOne({"username":username});
    console.log("Printing cursor")
    if(!cursor)
        return 0;
    return cursor;
}

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
    const client = new MongoClient(uri);
    var booksArr;
    try{
        await client.connect();
        const books = await client.db("LOC").collection("Books").find();
        booksArr = await books.toArray();
        
    }
    catch(e){ console.error(e);}
    finally{
        await client.close(); 
    }
    var book = {
        name: req.body.name,
        author: req.body.author,
        isbn: req.body.isbn,
        pagecount: req.body.pagecount,
        img: req.body.img,
        cost: parseInt(req.body.cost),
        genure: req.body.genure,
        incentive: parseInt(req.body.cost)/12,
        blockchain_id: parseInt(booksArr.length+1)
    };
    
    
    try{
        await client.connect();
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