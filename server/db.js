import mongoose from "mongoose";
import { DB_LOCAL } from "./config.js";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(DB_LOCAL);
    console.log("Conectado a", db.connection.name);
  } catch (error) {
    console.error(error);
  }
};
