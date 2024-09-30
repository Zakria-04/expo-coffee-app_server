import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import Routes from "./API/Routes/Routes";
import fs from "fs";
import path from "path";
import cors from "cors";
import "../db/data.json"

const app: Express = express();
const router = express.Router();
app.use(express.json());
app.use(cors());
app.use("/", Routes);

const url =
  "mongodb+srv://expo-coffee-app_server:expo-coffee-app_server@cluster0.0waqbd5.mongodb.net/";

mongoose.connect(url);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfuly");
});
mongoose.connection.on("error", () => {
  console.error("MongoDB connection error");
});

app.use("../public", express.static(path.join(__dirname, "public")));
const jsonFilePath = path.join(__dirname, "../db/data.json");

app.get("/products", (req: any, res: any) => {
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to read products data" });
    }
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      res.status(500).json({ error: "Failed to parse products data" });
    }
  });
});

export default app;
