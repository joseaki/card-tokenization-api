import mongoose from "mongoose";

let cachedDB: typeof mongoose | null = null;

async function connectToDatabase(uri = process.env.MONGO_URI) {
  if (!cachedDB) cachedDB = await mongoose.connect(uri);
}

export default connectToDatabase;
