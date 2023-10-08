import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './user';


    interface IReview extends Document {
        title: string;
        body: string;
        rating: number;
        author: Types.ObjectId | IUser; 
        date: Date;
      }

      const reviewSchema = new Schema<IReview>({
        title: { type: String, required: true },
        body: { type: String, required: true },
        rating: { type: Number, required: true },
        author: {
          type: Schema.Types.ObjectId,
          ref: 'User', 
          required: true,
        },
        date: { type: Date, default: Date.now },
      });

      const ReviewModel = mongoose.model<IReview>('Review', reviewSchema);
      export default ReviewModel;