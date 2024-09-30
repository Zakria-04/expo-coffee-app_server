import USER_MODEL from "../Models/user.module";
import { Request, Response } from "express";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import { getUserByID } from "../../res/utils";

const registerUser = async (req: Request, res: Response) => {
  const { userName, userPass, email } = req.body;

  const hashPass = await bcrypt.hash(userPass, 10);
  USER_MODEL.create({
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
};

const signinUser = async (req: any, res: any) => {
  try {
    const { userName, userPass } = req.body;

    const user = await USER_MODEL.findOne({ userName });

    if (!user) {
      return res.status(401).json({
        auth: false,
        errorMessage: "UserName or Password is incorrect",
      });
    }

    const isPasswordValid = await bcrypt.compare(userPass, user.userPass);
    // const isPasswordValid = user.userPass === userPass

    if (!isPasswordValid) {
      return res.status(401).json({
        auth: false,
        errorMessage: "UserName or Password is incorrect",
        test: user,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in user: ");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req: any, res: any) => {
  try {
    const { userID, updatedData } = req.body;

    const hashTheNewUpdatedPass = await bcrypt.hash(updatedData.userPass, 10);

    let user = await getUserByID(userID);

    if (!user) {
      return res
        .status(404)
        .json({ error: true, errorMessage: "user not found" });
    }
    user.userName = updatedData.userName || user.userName;
    user.userPass = hashTheNewUpdatedPass || user.userPass;
    // user.userPass = updatedData.userPass || user.userPass;
    user.email = updatedData.email || user.email;
    user
      .save()
      .then((updatedRes) => res.status(200).json({ user: updatedRes }))
      .catch((e) =>
        res.status(500).json({ error: true, errorMessage: e.message })
      );
  } catch (error) {
    console.error({ error: true, errorMessage: error });
  }
};

const deleteUser = async (req: any, res: any) => {
  try {
    const { userID } = req.body;
    let checkUserByID = await getUserByID(userID);

    if (checkUserByID) {
      USER_MODEL.findByIdAndDelete(userID)
        .then(() => {
          res.status(200).send("user has been deleted successfully");
        })
        .catch((err) => {
          res.status(500).json({ err: true, errorMessage: err.message });
        });
    } else {
      res.status(500).json({ error: "user is not available" });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export { registerUser, signinUser, updateUser, deleteUser };
