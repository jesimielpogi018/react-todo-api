import { Request, Response, NextFunction } from "express";
const validateAddTodoReqBody = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { todoTask, isStarred, todoDueDate, todoDetails } = req.body;
        if (todoTask === "" || todoTask === undefined || todoTask === null) {
            res.status(400).json({ 
                message: "todoTask is not defined!"
             });
        }

        if (typeof isStarred === "string" || typeof isStarred === "number") {
            res.status(400).json({ 
                message: "isStarred can only be true or false!"
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
            error: error
         });
    }
};

module.exports = { validateAddTodoReqBody };