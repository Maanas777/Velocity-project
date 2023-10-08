import mongoose, { Schema, Document } from "mongoose";

interface IDriver extends Document {
    Drivername?: string;
    email: string;
    phone: number;
    licenseno: string;
    DriverPhoto:string
    vehiclePhoto:string
    VehicleModel: string;
    vehicleNo: string;
    RCNo: string;
    isavailable: boolean
    password: string;
    isBlocked?: boolean;
    isDriver?:boolean;
    socketId: String,

    
}

const driverSchema: Schema<IDriver> = new Schema<IDriver>({

    Drivername: {
        type: String,
        required: true
    },

    DriverPhoto: {
        type: String,
        required: true, 
    },
        email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    licenseno: {
        type: String,
        required: true
    },
    socketId:{
        type:String,
       
    },

    vehiclePhoto: {
        type: String,
        required: true, 
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
    isDriver:{
        type:Boolean,
        default:false
    }
});

const UserModel = mongoose.model<IDriver>("Driver", driverSchema);

export default UserModel;
