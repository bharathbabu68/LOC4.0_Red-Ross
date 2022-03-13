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

app.listen(8000, () => {
    console.log("Server running on port 8000");
});