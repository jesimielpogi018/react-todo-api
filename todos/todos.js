const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const DB = require("../db");

// middleware
const { noEmptyReqBody } = require("../middlewares/noEmptyReqBody");
const {
  validateAddTodoReqBody,
} = require("../middlewares/validateAddTodoReqBody");

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
  let query;

  try {
    query = { _id: new ObjectId(id) };
  } catch (error) {
    return res.status(400).json({
      message:
        "Error on the id parameter, make sure the id is mongodb generated id!",
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }

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
  const { todoTask, isStarred, todoDueDate, todoDetails, todoCreatedAt } =
    req.body;

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
router.patch("/", noEmptyReqBody, (req, res) => {});

// overwrite todos
router.put("/", noEmptyReqBody, (req, res) => {});

// delete todos
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let query;

  try {
    query = { _id: new ObjectId(id) };
  } catch (error) {
    return res.status(400).json({
      message:
        "Error on the id parameter, make sure the id is mongodb generated id!",
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }

  conn
    .connect()
    .then((client) => {
      const collection = client.db(DB.DB).collection(DB.TODOS);
      return collection.deleteOne(query);
    })
    .then((result) => {
      if (result.acknowledged && result.deletedCount >= 1) {
        res
          .status(200)
          .json({ message: "Todo Task Deleted!", count: result.deletedCount });
      } else {
        res
          .status(400)
          .json({
            message: "Nothing to delete! Make sure the id is correct",
            count: result.deletedCount,
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

module.exports = router;
