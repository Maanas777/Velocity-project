import mongoose, { Schema, Document } from "mongoose";

interface IDriver extends Document {
    Drivername?: string;
    email: string;
    phone: number;
    DrivingId: string;
    VehicleModel: string;
    vehicleNo: string;
    RCNo: string;
    isavailable: boolean
    password: string;
    isBlocked?: boolean;
}

const driverSchema: Schema<IDriver> = new Schema<IDriver>({

    Drivername: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    DrivingId: {
        type: String,
        required: true
    },
    VehicleModel: {
        type: String,
        required: true
    },
    vehicleNo: {
        type: String,
        required: true
    },
    RCNo: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isavailable: {
        type: Boolean,
        default: false,
    },
});

const UserModel = mongoose.model<IDriver>("User", driverSchema);

export default UserModel;
