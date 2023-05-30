// Middleware to check if request body is empty
import { Request, Response, NextFunction } from "express";
const noEmptyReqBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  next();
};

module.exports = {
    noEmptyReqBody,
};