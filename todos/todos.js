const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");

// middleware
const { noEmptyReqBody } = require("../middlewares/noEmptyReqBody");

// mongodb uri
const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

// create MongoClient client
const conn = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// get all todos
router.get("/", (req, res, next) => {
  conn
    .connect()
    .then((client) => {
      const collection = client.db("user").collection("users");
      const data = collection.find().toArray();
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error Ocurred!",
        error: err
      });
    });
});

app.get("/{id}", (req, res, next) => {

});

// add todos
router.post("/", noEmptyReqBody, (req, res, next) => {
  const { username, pwd } = req.body;

  conn
    .connect()
    .then((client) => {
      const collection = client.db("user").collection("users");
      const data = {
        username,
        pwd,
      };
      return collection.insertOne(data);
    })
    .then((result) => {
      if (result.acknowledged) {
        res.status(200).json({
          message: "Inserted User Successfully!",
          _id: result.insertedId
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error Ocurred!",
        error: err
      });
    });
});

// edit todos
router.patch("/", noEmptyReqBody, (req, res, next) => {});

// delete todos
router.delete("/", noEmptyReqBody, (req, res, next) => {});

module.exports = router;
