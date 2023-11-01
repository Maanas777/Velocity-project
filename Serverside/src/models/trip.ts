import mongoose, { Schema, Document, Model, Types } from "mongoose";
import UserModel from "./user"; // Import the UserModel from the user module
import DriverModel from './driver'

export interface ITrip extends Document {
  user: Types.ObjectId | typeof UserModel; // Reference to the User model
  driverId:Types.ObjectId | typeof DriverModel;

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
  fare: number;

  Isfarepaid: boolean;

  isCompleted: boolean;
  

  driverDetails: {
    name: string;
    phone: number;
    vehicleModel: string;
    vehiclePhoto: string;
  };


}



const rideSchema = new Schema<ITrip>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
    },

    driverId: {
      type: Schema.Types.ObjectId,
      ref: DriverModel, 
    },
    
    driverDetails: {
      name: { type: String, required: true },
      phone: { type: Number, required: true },
      vehicleModel: { type: String, required: true },
      vehiclePhoto: { type: String, required: true },
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
    fare: {
      type: Number,
      required: true,
    },

    Isfarepaid: {
      type: Boolean,
      default: false,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const TripModel: Model<ITrip> = mongoose.model<ITrip>(
  "Ride",
  rideSchema
);
