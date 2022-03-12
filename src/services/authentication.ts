import { IUsers } from "../interfaces/users";
import Users from "../models/users";
import { BadRequest } from "../utils/customErrors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import keys from "../config";

export const createUser = async (body: IUsers) => {
  const { email, password } = body;
  if (!email || !password) {
    throw new BadRequest("Please fill up both email and password");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const createdUser: any = await Users.create({
    email,
    password: hashPassword,
  })
    .then((data: any) => {
      console.log(data);
      return data;
    })
    .catch((err: any) => {
      if (err.message.includes("duplicate key")) {
        throw new BadRequest(
          "Account with email already exists. Please sign in."
        );
      }
      throw new Error(err.message);
    });
  const token = jwt.sign(
    {
      _id: createdUser._id,
      email: createdUser.email,
    },
    keys.jwt_secret,
    {
      expiresIn: "2h",
    }
  );
  const output = {
    ...createdUser._doc,
    token,
  };
  return output;
};

export const loginUser = async (body: IUsers) => {
  const { email, password } = body;
  if (!email || !password) {
    throw new BadRequest("Please fill in both email and password");
  }
  const user: any = await Users.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      keys.jwt_secret,
      {
        expiresIn: "2h",
      }
    );
    const output = {
      ...user._doc,
      token,
    };
    return output;
  } else {
    throw new BadRequest("Invalid credentials. Please try again");
  }
};
