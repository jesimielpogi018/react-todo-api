const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const DB = require("../db");

// middleware
const { noEmptyReqBody } = require("../middlewares/noEmptyReqBody");
const { validateAddTodoReqBody } = require("../middlewares/validateAddTodoReqBody");

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
      const collection = client.db(DB.DB).collection(DB.TODOS);
      return collection.find({}).toArray();
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error Ocurred!",
        error: err,
      });
    });
});

// get todos
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };

  conn
    .connect()
    .then((client) => {
      const collection = client.db(DB.DB).collection(DB.TODOS);
      return collection.findOne(query);
    })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error Ocurred!",
        error: err,
      });
    });
});

// add todos
router.post("/", noEmptyReqBody, validateAddTodoReqBody, (req, res, next) => {
  const { todoTask, isStarred, todoDueDate, todoDetails, todoCreatedAt } = req.body;

  conn
    .connect()
    .then((client) => {
      const collection = client.db(DB.DB).collection(DB.TODOS);
      const data = {
        todoTask,
        isStarred,
        todoCreatedAt,
        todoUpdatedAt: todoCreatedAt,
        todoDueDate,
        todoDetails,
      };
      return collection.insertOne(data);
    })
    .then((result) => {
      if (result.acknowledged) {
        res.status(200).json({
          message: "Inserted User Successfully!",
          _id: result.insertedId,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Error Ocurred!",
        error: err,
      });
    });
});

// edit todos
router.patch("/", noEmptyReqBody, (req, res, next) => {});

// overwrite todos
router.put("/", noEmptyReqBody, (req, res, next) => {});

// delete todos
router.delete("/", noEmptyReqBody, (req, res, next) => {});

module.exports = router;
