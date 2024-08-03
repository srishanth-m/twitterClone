import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDb from "./db/connectMongoDb.js";
dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);

console.log(process.env.MONGO_URI);
app.listen("8000", () => {
  console.log("server is running on port on 8000");
  connectMongoDb();
});
