import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  try {
    if (isConnected) {
      console.log("Already connected to DB");
      return;
    }
    if (!process.env.MONGOOSE_URL) {
      console.log("Could not find Mongoose URL");
      return;
    }

    await mongoose.connect(process.env.MONGOOSE_URL);
    isConnected = true;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Could not connect to DB: ", error);
  }
};

export default connectToDB;
