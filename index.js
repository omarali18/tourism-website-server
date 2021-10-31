const express = require("express");
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middelware
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.av6mz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()

        const database = client.db("bestTourPlane")
        const tourOfferCollection = database.collection("bestOffer")
        const clientCollection = database.collection("clientDb")
        // find multiple offer
        app.get("/tourOffer", async (req, res) => {
            const cursor = await tourOfferCollection.find({}).toArray()
            res.send(cursor)
        });
        // find single offer
        app.get("/tourOffer/:id", async (req, res) => {
            const id = req.params.id
            const singleId = { _id: ObjectId(id) }
            const result = await tourOfferCollection.findOne(singleId)
            res.send(result)
        });
        // sit client detail
        app.post("/client", async (req, res) => {
            const client = (req.body);
            const result = await clientCollection.insertOne(client)
            console.log(result);
            res.json(result)
        })


    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir)

app.get("/", (req, res) => {
    res.send("Surver conneceted 1110");
});

app.listen(port, () => {
    console.log("Surver connecet with", port);
})