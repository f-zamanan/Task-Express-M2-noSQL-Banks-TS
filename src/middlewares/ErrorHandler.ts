import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json(`something broke ${err} at path: ${req.path}`);
};

export default errorHandler;
