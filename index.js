const express = require("express");
const { MongoClient } = require('mongodb');
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
        console.log("data base connected");

        const database = client.db("bestTourPlane")
        const tourOfferCollection = database.collection("bestOffer")

        app.get("/tourOffer", async (req, res) => {
            const cursor = await tourOfferCollection.find({}).toArray()
            // const cursor = tourOfferCollection.find({})
            // const tourResult = await cursor.toArray()
            res.send(cursor)
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