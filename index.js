require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {ObjectId} = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;
//roommate-finder
//gKgygAPQu5PAxmUY
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ayqadbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  // try {
   // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
 const db = client.db("RoommateDB");
const roommateCollection = db.collection("roommates");
const usersCollection = db.collection("users");
 // replace with your actual DB name

  
    app.get("/roommates", async (req, res) => {
      const email = req.query.email;
      const query = email?{email:email} : {};
      const result = await roommateCollection.find(query).toArray();
     
      res.send(result);
    });

        app.get("/facts-room", async (req, res) => {
      const result = await roommateCollection.find()
      .limit(6).toArray();
     //const result = await roommateCollection.find().toArray();
     
      res.send(result);
      
    });

    app.post("/roommates", async (req, res) => {
      const newRoomes = req.body;
     newRoomes.likes = 0;
      const result = await roommateCollection.insertOne(newRoomes);
      res.send(result);
    });
    app.patch("/roommates/like/:id",async(req,res)=>{
      const id = new ObjectId(req.params.id);
      const email = req.query.email;
      const post = await roommateCollection.findOne({_id:new ObjectId(id)});
      if(!post){
        return res.status(404).send({message:"Post not found"});
      }
      if(post.email === email){
        return res.status(403).send({message:"You can't like your own post"})
      }
      const result = await roommateCollection.updateOne(
        
          {_id:new ObjectId(id)},
          {$inc:{likes:1}}
        
      )
      res.send({message : "liked successfully",result})
    })
    app.delete("/roommates/:id", async (req, res) => {
      const id = new ObjectId(req.params.id);
console.log(id)
      const query = {_id: new ObjectId(id)};
      const result = await roommateCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/roommates/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const updatedCoffee = req.body;
      // const updatedDoc = {
      //     $set: updatedCoffee
      // }

      const updatedDoc = {
        $set: {
         
          title: updatedCoffee.title,
           location: updatedCoffee.location,
         rent: updatedCoffee.rent,
          preferences: updatedCoffee.preferences,
         contact: updatedCoffee.contact,
         name: updatedCoffee.name,
         roomType : updatedCoffee.roomType,
        description : updatedCoffee.description,
        },
      };

      const result = await roommateCollection.updateOne(
        filter,
        updatedDoc,
        options
      );

      res.send(result);
    });
    app.get("/roommates/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const coffee = await roommateCollection.findOne(query);
      res.send(coffee);
    });

   

     app.post("/users", async (req, res) => {
      const userProfile = req.body;
     
      const result = await usersCollection.insertOne(userProfile);
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
      
    });
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const coffee = await usersCollection.findOne(query);
      res.send(coffee);
    });
    app.delete("/users/:id", async (req, res) => {
      const id = new ObjectId(req.params.id);
     console.log(id)
      const query = {_id: new ObjectId(id)};
      const result = await usersCollection.deleteOne(query);
      console.log(result)
      res.send(result);
    });

    app.patch('/users', async(req, res) =>{
            const {email, lastSignInTime} = req.body;
            const filter = {email: email}
            const updatedDoc = {
                $set: {
                    lastSignInTime: lastSignInTime
                }
            }

            const result = await usersCollection.updateOne(filter, updatedDoc)
            res.send(result);
        })
         // await client.db("admin").command({ping: 1});
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    app.get("/", (req, res) => {
  res.send("Coffee server is getting hotter.");
});

app.listen(port, () => {
  console.log(`Coffee server is running on port ${port}`);
});
      // }
        // Send a ping to confirm a successful connection
  
  //  finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }
  // catch (err) {
  //   console.error(err);
  // }
}


run()

    


