import * as dotenv from "dotenv";
import mongoose from "mongoose";
import CommerceModel from "./src/database/mongo/models/commerce.model";

dotenv.config();

export const createCommerce = async () => {
  await mongoose.connect(
    process.env.MONGO_URI ?? "mongodb://localhost:27017/culqi_test"
  );
  await CommerceModel.findOneAndUpdate(
    { username: "commerce_a" },
    {
      username: "commerce_a",
      password: "$2a$04$WeASAQsFR9lFj04gULR5AeupwtV3aHs8EugEueXhz7KzzbgfcEBZW",
      commerce_name: "My commerce",
      isActive: true,
      pk: "pk_test_mol23f2no94bc73d",
    },
    { upsert: true }
  );
};

createCommerce().then(() => {
  mongoose.connection.close();
});
