import express, { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customErrors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.getCode()).send({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).send({
    status: "error",
    message: err.message,
  });
};
