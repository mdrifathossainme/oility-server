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
        const allproductCollection = client.db("Products").collection("allProducts")
        const reviewsCollection = client.db("Products").collection("reviews")
        const displayCollection = client.db("Products").collection("displayProducts")
        const orderCollection = client.db("Products").collection("orderProduct")
        const whiteListCollection = client.db("Products").collection("whiteList")


        app.get('/displayproducts', async (req, res) => {
            const quary = {}
            const result = await displayCollection.find(quary).toArray()
            res.send(result)
        })
        app.get('/displayproducts/:id', async (req, res) => {
            const id= req.params.id
            const quary = {_id:ObjectId(id)}
            const result = await displayCollection.findOne(quary)
            res.send(result)
        })
         app.get('/reviews', async (req, res) => {
            const quary = {}
            const result = await reviewsCollection.find(quary).toArray()
            res.send(result)
         })
        
        app.get('/whishlistlove', async (req, res) => {
            const email = req.query.email
            console.log(email)
            const quary = { email:email }
            const result = await whiteListCollection.find(quary).toArray()
            res.send(result)
            console.log()
         })
        app.get('/allproducts', async (req, res) => {
            let page = parseInt(req.query.page)
            let limit = parseInt(req.query.limit)
                
            let category = req.query.category;

            let quary
            if (category) {
                quary={category}
            }
            
            let result
            if (page) {
                    result = await allproductCollection.find(quary).skip(page*limit).limit(limit).toArray()    
            }
            else {
                 result = await allproductCollection.find(quary).limit(limit).toArray()
            }
             res.send(result) 
            
            
           
        })

        app.get('/order', async (req, res) => {
            const quary=req.query.email
            const result = await orderCollection.find(quary).toArray()
            res.send(result)
            
        })
        
        app.get('/product/:id', async (req, res) => {
            const id= req.params.id
            const quary = {_id:ObjectId(id)}
            const result = await allproductCollection.findOne(quary)
            res.send(result)
        })
        app.get('/product/:id', async (req, res) => {
            const id= req.params.id
            const quary = {_id:ObjectId(id)}
            const result = await allproductCollection.findOne(quary)
            res.send(result)
        })
        
        
        
        app.post('/order', async (req, res) => {
            const order = req.body;
            const quary = { name: order.name,email:order.email}

            const exisit = await orderCollection.findOne(quary)
            
            if (exisit) {
               
              return    res.send({success:false})
            }

            const result = await orderCollection.insertOne(order)
            res.send(result)
        })

        app.post('/whitelist', async (req, res) => {
            const order = req.body;
            const quary = { name: order.name,email:order.email}

            const exisit = await whiteListCollection.findOne(quary)
            
            if (exisit) {
            
              return    res.send({success:false})
            }
            const result = await whiteListCollection.insertOne(order)
            res.send(result)
        })






         app.put('/displayproducts/:id', async (req, res) => {
             const id = req.params.id
             const udpate = req.body
             const filter = { _id: ObjectId(id) }
             const option = { upsert: true }
             const updateDoc = {
                 $set:udpate
             }
             const result = await displayCollection.updateOne(filter, updateDoc, option)
             res.send(result)
        })

        app.delete('/wishitemdelet/:id', async (req, res) => {
            const id = req.params.id
            const quary = { _id: ObjectId(id) }
            const reseult = await whiteListCollection.deleteOne(quary)
            res.send(reseult)

        })










    }
    finally{

    }

}
run().catch(console.dir)







app.get('/',(req,res)=>{
    res.send('Oility Project')
})
app.listen(port)