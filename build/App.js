"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Routes_1 = __importDefault(require("./API/Routes/Routes"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", Routes_1.default);
const url = "mongodb+srv://expo-coffee-app_server:expo-coffee-app_server@cluster0.0waqbd5.mongodb.net/";
mongoose_1.default.connect(url);
mongoose_1.default.connection.on("connected", () => {
    console.log("MongoDB connected successfuly");
});
mongoose_1.default.connection.on("error", () => {
    console.error("MongoDB connection error");
});
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "public")));
const jsonFilePath = path_1.default.join(__dirname, "./res/data.json");
app.get("/products", (req, res) => {
    fs_1.default.readFile(jsonFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return res.status(500).json({ error: "Failed to read products data" });
        }
        try {
            const jsonData = JSON.parse(data);
            res.status(200).json(jsonData);
        }
        catch (parseError) {
            console.error("Error parsing JSON data:", parseError);
            res.status(500).json({ error: "Failed to parse products data" });
        }
    });
});
exports.default = app;
