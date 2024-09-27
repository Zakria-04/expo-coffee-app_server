"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.createNewUser = void 0;
const user_module_1 = __importDefault(require("../Models/user.module"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userPass, email } = req.body;
    const hashPass = yield bcrypt_1.default.hash(userPass, 10);
    user_module_1.default.create({
        userName: userName,
        userPass: hashPass,
        email: email,
    })
        .then((Cres) => {
        res.status(200).json({ user: Cres });
    })
        .catch((error) => {
        res.status(500).json({ error: true, errorMessage: error.message });
    });
});
exports.createNewUser = createNewUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userPass } = req.body;
        const user = yield user_module_1.default.findOne({ userName });
        if (!user) {
            return res.status(401).json({
                auth: false,
                errorMessage: "UserName or Password is incorrect1",
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(userPass, user.userPass);
        console.log(isPasswordValid);
        // if (!isPasswordValid) {
        //   return res.status(401).json({
        //     auth: false,
        //     errorMessage: "UserName or Password is incorrect2",
        //     test: user
        //   });
        // }
        // res.status(200).json({ auth: true, user });
    }
    catch (error) {
        console.error("Error logging in user: ");
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.registerUser = registerUser;
