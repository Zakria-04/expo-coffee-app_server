import { Router } from "express";
import {
  signinUser,
  registerUser,
  updateUser,
} from "../Controllers/user.controller";

const userRouter = Router();

userRouter.post("/registerUser", registerUser);
userRouter.post("/signinUser", signinUser);
userRouter.post("/updateUser", updateUser);

export default userRouter;
