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
  const expectedKeys = ["todoTask", "isStarred", "todoDueDate", "todoDetails"];
  const { id, data } = req.body;
  const filteredData = {};

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

  // check whether there is a data object where the new data will be stored
  if (data === undefined || data === null) {
    res.status(400).json({
      message: "data to update the document is not defined!",
    });
  }

  // check whether the data contains all the must have keys
  const keys = Object.keys(data);

  // will filter out not needed keys
  for (let key of keys) {
    if (!expectedKeys.includes(key)) {
      delete data[key];
    }
  }

  next();
};

module.exports = { validateEditTodoReqBody };
