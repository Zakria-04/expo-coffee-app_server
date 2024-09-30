"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const priceSchema = new mongoose_1.Schema({
    size: { type: String, required: false },
    price: { type: Number, required: false },
    quantity: { type: Number, required: false },
});
const coffeeAppSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    detailsImg: { type: String, required: true },
    prices: { type: [priceSchema], required: true },
    ingredients: { type: String, required: true },
    average_rating: { type: Number, required: true },
    favorite: { type: Boolean, required: true },
});
const STORE_DATA_BASE = (0, mongoose_1.model)("coffee_app_db", coffeeAppSchema);
exports.default = STORE_DATA_BASE;
