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
exports.deleteUser = exports.updateUser = exports.signinUser = exports.registerUser = void 0;
const user_module_1 = __importDefault(require("../Models/user.module"));
// import bcrypt from "bcrypt";
// import bcrypt from "bcryptjs"
const utils_1 = require("../../res/utils");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userPass, email } = req.body;
    // const hashPass = await bcrypt.hash(userPass, 10);
    user_module_1.default.create({
        userName: userName,
        // userPass: hashPass,
        userPass: userPass,
        email: email,
    })
        .then((Cres) => {
        res.status(200).json({ user: Cres });
    })
        .catch((error) => {
        res.status(500).json({ error: true, errorMessage: error.message });
    });
});
exports.registerUser = registerUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userPass } = req.body;
        const user = yield user_module_1.default.findOne({ userName });
        if (!user) {
            return res.status(401).json({
                auth: false,
                errorMessage: "UserName or Password is incorrect",
            });
        }
        // const isPasswordValid = await bcrypt.compare(userPass, user.userPass);
        const isPasswordValid = user.userPass === userPass;
        if (!isPasswordValid) {
            return res.status(401).json({
                auth: false,
                errorMessage: "UserName or Password is incorrect",
                test: user,
            });
        }
        res.status(200).json({ auth: true, user });
    }
    catch (error) {
        console.error("Error logging in user: ");
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.signinUser = signinUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, updatedData } = req.body;
        // const hashTheNewUpdatedPass = await bcrypt.hash(updatedData.userPass, 10);
        let user = yield (0, utils_1.getUserByID)(userID);
        if (!user) {
            return res
                .status(404)
                .json({ error: true, errorMessage: "user not found" });
        }
        user.userName = updatedData.userName || user.userName;
        // user.userPass = hashTheNewUpdatedPass || user.userPass;
        user.userPass = updatedData.userPass || user.userPass;
        user.email = updatedData.email || user.email;
        user
            .save()
            .then((updatedRes) => res.status(200).json({ user: updatedRes }))
            .catch((e) => res.status(500).json({ error: true, errorMessage: e.message }));
    }
    catch (error) {
        console.error({ error: true, errorMessage: error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.body;
        let checkUserByID = yield (0, utils_1.getUserByID)(userID);
        if (checkUserByID) {
            user_module_1.default.findByIdAndDelete(userID)
                .then(() => {
                res.status(200).send("user has been deleted successfully");
            })
                .catch((err) => {
                res.status(500).json({ err: true, errorMessage: err.message });
            });
        }
        else {
            res.status(500).json({ error: "user is not available" });
        }
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
});
exports.deleteUser = deleteUser;
