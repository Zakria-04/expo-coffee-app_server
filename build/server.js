"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const App_1 = __importDefault(require("./App"));
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(App_1.default);
server.listen(port, (error) => {
    if (error) {
        console.error("error with starting the server");
    }
    else {
        console.log(`Server is running on port ${port}\nwaiting for mongoose connection...`);
    }
});
