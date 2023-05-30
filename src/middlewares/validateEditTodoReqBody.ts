import { Request, Response, NextFunction } from "express";

interface body {
  id: string,
  data: {
    todoTask: string,
    isStarred: boolean,
    todoDueDate: string,
    todoDetails: string
  }
}

const validateEditTodoReqBody = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  if (id === undefined || id === null) {
    res.status(400).json({
      message: "ID is not defined!",
    });
  }

  if (typeof id !== "string") {
    res.status(400).json({
      message: "ID is not valid! Use valid mongodb _id",
    });
  }

  next();
};

module.exports = { validateEditTodoReqBody };
