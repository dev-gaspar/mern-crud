import dotenv from "dotenv";
dotenv.config();

export const DB_LOCAL = process.env.DB_LOCAL || "mongodb://localhost/testdb";
export const PORT = process.env.PORT || 4000;
