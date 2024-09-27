"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Routes_1 = __importDefault(require("./API/Routes/Routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", Routes_1.default);
const url = "mongodb+srv://expo-coffee-app_server:expo-coffee-app_server@cluster0.0waqbd5.mongodb.net/";
mongoose_1.default.connect(url);
mongoose_1.default.connection.on("connected", () => {
    console.log("MongoDB connected successfuly");
});
mongoose_1.default.connection.on("error", () => {
    console.error("MongoDB connection error");
});
exports.default = app;
