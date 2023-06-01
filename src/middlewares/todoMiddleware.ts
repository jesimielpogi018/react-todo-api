import { Request, Response, NextFunction } from "express";

const noEmptyReqBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  next();
};

const validateAddTodoReqBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todoTask, isStarred, todoDueDate, todoDetails } = req.body;
    if (todoTask === "" || todoTask === undefined || todoTask === null) {
      res.status(400).json({
        message: "todoTask is not defined!",
      });
    }

    if (typeof isStarred === "string" || typeof isStarred === "number") {
      res.status(400).json({
        message: "isStarred can only be true or false!",
      });
    }

    if (isStarred === undefined || isStarred === null) {
      req.body.isStarred = false; // means the task is not starred
    }

    if (todoDueDate === undefined || todoDueDate === null) {
      req.body.todoDueDate = ""; // means no due date
    }

    if (todoDetails === undefined || todoDetails === null) {
      req.body.todoDetails = ""; // means no details
    }

    req.body.todoCreatedAt = new Date().getTime().toString();

    next();
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

const validateEditTodoReqBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expectedKeys = ["todoTask", "isStarred", "todoDueDate", "todoDetails"];
  const { id, data } = req.body;

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

const validateOverwriteTodoReqBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, data } = req.body;
  const requiredKeys = ["todoTask", "todoDetails", "isStarred", "todoDueDate"];

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

  // will check if the data contains all the required keys
  const keys = Object.keys(data);

  for (let key of requiredKeys) {
    if (keys.includes(key)) {
      console.log(key);
    }
  }

  next();
};

export {
  noEmptyReqBody,
  validateAddTodoReqBody,
  validateEditTodoReqBody,
  validateOverwriteTodoReqBody,
};
