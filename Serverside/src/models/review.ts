import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './user';


    interface IReview extends Document {
    
        body: string;
        author: Types.ObjectId | IUser; 
        date: Date;
      }

      const reviewSchema = new Schema<IReview>({
        body: { type: String, required: true },
        author: {
          type: Schema.Types.ObjectId,
          ref: 'User', 
          required: true,
        },
        date: { type: Date, default: Date.now },
      });

      const ReviewModel = mongoose.model<IReview>('Review', reviewSchema);
      export default ReviewModel;