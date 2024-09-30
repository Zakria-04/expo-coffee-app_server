import mongoose, { Document, model, Schema } from "mongoose";

export interface PricesTypes {
  size: string;
  price: number;
  quantity: number;
}

export interface ProductsTypes extends Document {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
  detailsImg: string;
  prices: PricesTypes[];
  ingredients: string;
  average_rating: number;
  favorite: boolean;
}

const priceSchema: Schema<PricesTypes> = new Schema({
  size: { type: String, required: false },
  price: { type: Number, required: false },
  quantity: { type: Number, required: false },
});

const coffeeAppSchema: Schema<ProductsTypes> = new Schema({
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

const STORE_DATA_BASE = model<ProductsTypes>("coffee_app_db", coffeeAppSchema);
export default STORE_DATA_BASE
