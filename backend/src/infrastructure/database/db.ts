import mongoose from "mongoose";
import { config } from "../../config/config";

export const connectDB = async () => {
  const mongoURL = config.DATABASE_URL;
  try {
    await mongoose.connect(mongoURL);
    console.log(`🍃 Database connected successfully🍃`);
  } catch (error: any) {
    console.error(`❌ Database Connection failed`);
    console.error(error.message);
    process.exit(1);
  }
};
