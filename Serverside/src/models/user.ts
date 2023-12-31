import mongoose, { Schema, Document ,Types} from "mongoose";
import { ITrip } from "./trip"; 

export interface IUser extends Document {
    username?: string;
    email: string;
    phone: number;
    password: string;
    isBlocked?: boolean;
    trips: Types.ObjectId[] | ITrip[];
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },

    trips: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ride', 
        },
      ]



});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
