import { Router } from "express";
const express = require("express");
const router: Router = express.Router();

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

// delete
router.delete("/:id", TodoController.deleteTodo);

export {};
module.exports = router;
