import mongoose from "mongoose";
import { IUsers } from "../interfaces/users";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Users = mongoose.model<IUsers & mongoose.Document>("users", userSchema);

export default Users;
