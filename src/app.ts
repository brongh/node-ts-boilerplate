import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import { initializeMongo } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";

import usersRoutes from "./routes/users";

const app = express();

initializeMongo();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/user", usersRoutes);

// error middlewares
app.use(errorHandler);

export default app;
