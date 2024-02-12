import mongoose from "mongoose";

let username = 'velocity';
let password = 'velocity';

let uri = `mongodb+srv://${username}:${password}@cluster0.4le7hci.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Db connected");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
};

export default connectDB;
