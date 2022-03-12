import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new Error("test test");
    res.status(200).send({ message: "nice" });
  } catch (error) {
    next(error);
  }
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ message: "nice" });
  } catch (error) {
    res.status(500).send({
      message: "Unknown Error",
    });
  }
});

export default router;
