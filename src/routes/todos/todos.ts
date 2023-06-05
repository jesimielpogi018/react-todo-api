const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
import { conn } from "../../connection/conn";
import { ObjectId } from "mongodb";
import { db as DB } from "../../db";

// middleware
import {
  noEmptyReqBody,
  validateAddTodoReqBody,
  validateEditTodoReqBody,
} from "../../middlewares/todoMiddleware";

// get all todos
router.get("/", (req: Request, res: Response) => {
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
router.get("/:id", (req: Request, res: Response) => {
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
router.post(
  "/",
  noEmptyReqBody,
  validateAddTodoReqBody,
  (req: Request, res: Response) => {
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
  }
);

// edit todos
router.patch(
  "/",
  noEmptyReqBody,
  validateEditTodoReqBody,
  (req: Request, res: Response) => {
    const { id, data } = req.body;
    let filter;
    const updateData: any = {};

    const entries = Object.entries(data);

    for (const [key, value] of entries) {
      updateData[key] = value;
    }

    const updateAt = new Date().getTime().toString();
    updateData.todoUpdatedAt = updateAt;

    const updateDocument = { $set: updateData };

    // validate query id for the ObjectId
    try {
      filter = { _id: new ObjectId(id) };
    } catch (error) {
      return res.status(400).json({
        message:
          "Error on the id body, make sure the id is mongodb generated _id!",
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
        return collection.updateOne(filter, updateDocument);
      })
      .then((result) => {
        if (result.acknowledged) {
          res.status(200).json({
            message: "Data update successful!",
          });
        } else {
          res.status(400).json({
            message:
              "Data update is not acknowledge, make sure the specified _id is correct!",
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
  }
);

export {};
module.exports = router;
