import express from "express";
//import User from "./User.model.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  connectDB();
  console.log("Server is running");
});
