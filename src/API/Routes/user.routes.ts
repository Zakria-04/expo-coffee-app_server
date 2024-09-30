import { Router } from "express";
import {
  signinUser,
  registerUser,
  updateUser,
  deleteUser,
} from "../Controllers/user.controller";

const userRouter = Router();

userRouter.post("/registerUser", registerUser);
userRouter.post("/signinUser", signinUser);
userRouter.post("/updateUser", updateUser);
userRouter.post("/deleteUser", deleteUser)

export default userRouter;
