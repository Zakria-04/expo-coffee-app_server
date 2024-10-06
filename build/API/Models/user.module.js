"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userItemsSchema = new mongoose_1.Schema({
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
const userSchema = new mongoose_1.Schema({
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
const USER_MODEL = (0, mongoose_1.model)("expo_coffee_app_users", userSchema);
exports.default = USER_MODEL;
