import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

// this will expose the .env file to my server
dotenv.config();

const connectDB = async () => {
  // this url needs to be secured
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("connected to mongoDB:");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
const PORT = 8000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
