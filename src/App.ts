import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import Routes from "./API/Routes/Routes";

const app: Express = express();
app.use(express.json());
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

export default app;
