const express = require('express');
require('dotenv').config({ debug: true })
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app=express()
const port=process.env.PORT||5000

app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.AAMADAT_USER}:${process.env.AAMADAT_PASS}@amadatmartcluster.iyjvr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run= async()=>{
    try{
        await client.connect();
        const homeProductCollection = client.db("Products").collection("homepage");
        const allproductCollection = client.db("Products").collection("allProducts")
        const cartCollection = client.db("Products").collection("cartProducts")




    }
    finally{

    }

}
run().catch(console.dir)







app.get('/',(req,res)=>{
    res.send('Oility Project')
})
app.listen(port)