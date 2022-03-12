import mongoose from "mongoose";
import keys from ".";

const { mongoUrl } = keys;

export const initializeMongo = async () => {
  await mongoose.connect(mongoUrl).then(() => {
    console.log("Connected to MongoDB");
  });
};
