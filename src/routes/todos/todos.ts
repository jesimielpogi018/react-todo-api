const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
import { conn, ObjectId } from "../../connection/conn";
import { db as DB } from "../../db";

// controller
import TodoController from "../../controllers/todoController";

// middleware
import {
  noEmptyReqBody,
  validateAddTodoReqBody,
  validateEditTodoReqBody,
} from "../../middlewares/todoMiddleware";

// get all todos
router.get("/", TodoController.getAllTodos);

// get todos
router.get("/:id", TodoController.getTodo);

// add todos
router.post(
  "/",
  noEmptyReqBody,
  validateAddTodoReqBody,
  TodoController.addTodo
);

// edit todos
router.patch(
  "/",
  noEmptyReqBody,
  validateEditTodoReqBody,
  TodoController.editTodo
);

export {};
module.exports = router;
