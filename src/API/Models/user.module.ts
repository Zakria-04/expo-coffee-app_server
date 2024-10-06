import { model, Schema } from "mongoose";

const userItemsSchema = new Schema({
  id: Number,
  category: String,
  name: String,
  description: String,
  image: String,
  detailsImage: String,
  prices: [
    {
      size: String,
      price: Number,
      quantity: Number,
    },
  ],
  ingredients: String,
  average_rating: Number,
  favorite: Boolean,
});

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
  userCart: {
    type: [userItemsSchema],
    default: [],
  },
  userFavorite: {
    type: [userItemsSchema],
    default: [],
  },
  userOrderHistory: {
    type: [userItemsSchema],
    default: [],
  },
});

const USER_MODEL = model("expo_coffee_app_users", userSchema);
export default USER_MODEL;
