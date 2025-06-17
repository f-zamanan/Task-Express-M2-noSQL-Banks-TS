import { NextFunction, Request, Response } from "express";

const notFoundHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res
    .status(404)
    .json({ message: `Not found at path: ${req.path}`, error: err.message });
};

export default notFoundHandler;
