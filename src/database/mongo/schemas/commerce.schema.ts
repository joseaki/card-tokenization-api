import mongoose from "mongoose";
import { ICommerce } from "src/interface/commerce.types";

const commerce = new mongoose.Schema<ICommerce>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    commerce_name: { type: String, default: null },
    isActive: { type: Boolean, default: false },
    pk: { type: String, required: true },
  },
  { timestamps: true, collection: "commerce" }
);

export default commerce;
