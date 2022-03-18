import express, { Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "../services/authentication";
import verifyToken from "../middlewares/verifyToken";
import dtoAuthMiddleware from "../middlewares/dtos/authentication";
import { authenticationDto } from "../dtos/authentication";

const router = express.Router();

router.post(
  "/register",
  dtoAuthMiddleware(authenticationDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await createUser(req.body);
      res.status(201).send({ message: "User created", data: newUser });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  dtoAuthMiddleware(authenticationDto),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await loginUser(req.body);
      res.status(200).send({ message: "Authenticated successful", data: user });
    } catch (err) {
      next(err);
    }
  }
);

// * For verifying access token
router.get(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const userData = req.user;

      res.status(200).send({
        status: "ok",
        data: userData,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
