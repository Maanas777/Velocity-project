import mongoose, { Schema, Document, Model, Types } from "mongoose";
import  UserModel  from "./user"; // Import the UserModel from the user module

interface ITrip extends Document {
  user: Types.ObjectId | typeof UserModel; // Reference to the User model
  pickuplocation: {
    name: string;
    lat: number;
    lon: number;
  };
  destination: {
    name: string;
    lat: number;
    lon: number;
  };


  isCompleted: boolean;
}

const rideSchema = new Schema<ITrip>({
  user: {
    type: Schema.Types.ObjectId,
    ref: UserModel, 
  },
  pickuplocation: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  destination: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const TripModel: Model<ITrip> = mongoose.model<ITrip>("Ride", rideSchema);