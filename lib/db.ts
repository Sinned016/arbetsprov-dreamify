import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "arbetsprov-dreamify",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error: ", err.message);
      throw new Error(err.message);
    } else {
      console.error("Unexpected error: ", err);
      throw new Error("Unknown error occurred during DB connection.");
    }
  }
};

export default connect;
