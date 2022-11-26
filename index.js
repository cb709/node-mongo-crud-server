const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


// //mongo 
// user: dbuser2 : t8vSlG4S0r4S3Z8Y

const uri = "mongodb+srv://dbuser2:t8vSlG4S0r4S3Z8Y@cluster0.9sy52ow.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      const usersCollection = client.db("node-mongo-crud").collection("user");
      
      app.get('/users', async (req,res) => {
        const query = {}
        const cursor = usersCollection.find(query);
        const users  = await cursor.toArray()
        res.send(users);
      })

      app.post('/users', async (req, res) => {
            const user = req.body;
            const result  = await usersCollection.insertOne(user);
            console.log(user, result)
            res.send(result)
      })

      app.delete('/users/delete/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
        res.send(result);
      })

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Hello from mongo db crud server");
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})