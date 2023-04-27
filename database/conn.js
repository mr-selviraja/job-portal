import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Successfully connected to MongoDB!`);
  } catch (err) {
    console.log(`MondoDB Error: ${err}`);
  }
};

export default connectDB;
