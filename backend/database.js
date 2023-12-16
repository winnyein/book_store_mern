import mongoose from "mongoose";
export const connectToDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.brgdahb.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Database is connected.");
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};
