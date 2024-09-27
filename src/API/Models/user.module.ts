import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userPass: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  userMemberDate: {
    type: Date,
    default: new Date(),
  },
});

const USER_MODEL = model("expo_coffee_app_users", userSchema);
export default USER_MODEL;
