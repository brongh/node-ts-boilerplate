import jwt from "jsonwebtoken";
import keys from "../config";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["access-token"];
  console.log(token);
  try {
    if (!token) {
      return res
        .status(403)
        .send({ status: "error", message: "Token is required" });
    }

    const decoded = jwt.verify(token, keys.jwt_secret);
    // @ts-ignore
    req.user = decoded as string;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

export default verifyToken;
