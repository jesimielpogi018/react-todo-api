import { Request, Response } from "express";
import { conn, ObjectId } from "../connection/conn";
import { db as DB } from "../db";

class TodoController {
  static async getAllTodos(req: Request, res: Response) {
    try {
      const client = await conn.connect();
      const collection = client.db(DB.DB).collection(DB.TODOS);
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Error Occurred!",
        error: error,
      });
    }
  }

  static async getTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };

      const client = await conn.connect();
      const collection = client.db(DB.DB).collection(DB.TODOS);
      const data = await collection.findOne(query);
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Error Occurred!",
        error: error,
      });
    }
  }

  static async addTodo(req: Request, res: Response) {
    try {
      const { todoTask, isStarred, todoDueDate, todoDetails, todoCreatedAt } =
        req.body;
      const data = {
        todoTask,
        isStarred,
        todoCreatedAt,
        todoUpdatedAt: todoCreatedAt,
        todoDueDate,
        todoDetails,
      };

      const client = await conn.connect();
      const collection = client.db(DB.DB).collection(DB.TODOS);
      const result = await collection.insertOne(data);

      if (result.acknowledged) {
        res.status(200).json({
          message: "Success, new todo inserted!",
          _id: result.insertedId,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Error Occurred!",
        error: error,
      });
    }
  }

  static async editTodo(req: Request, res: Response) {
    try {
      const { id, data } = req.body;
      const updateData: any = {};

      const entries = Object.entries(data);

      for (const [key, value] of entries) {
        updateData[key] = value;
      }

      const filter = { _id: new ObjectId(id) };
      const updateDocumentQuery = { $set: updateData };

      const client = await conn.connect();
      const collection = client.db(DB.DB).collection(DB.TODOS);
      const result = await collection.updateOne(filter, updateDocumentQuery);

      if (result.acknowledged) {
        res.status(200).json({
          message: "todo updated successfully!",
          _id: result.upsertedId,
          count: result.modifiedCount,
        });
      } else {
        res.status(400).json({
          message:
            "Todo update is not acknowledge, make sure the specified _id is correct!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Error Occurred!",
        error: error,
      });
    }
  }

  static async deleteTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };

      const client = await conn.connect();
      const collection = client.db(DB.DB).collection(DB.TODOS);
      const result = await collection.deleteOne(query);

      if (result.deletedCount === 1) {
        res.status(200).json({
          message: "Todo deleted successfully!",
        });
      } else {
        res.status(400).json({
          message: "Todo task not found!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Error Occurred!",
        error: error,
      });
    }
  }
}

export default TodoController;
