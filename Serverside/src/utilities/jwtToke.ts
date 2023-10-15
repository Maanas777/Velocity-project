import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import { Types } from 'mongoose';
dotenv.config()

const generateToken = (userId: Types.ObjectId): string => {
  try {
   
    
    const token = jwt.sign({ userId }, process.env.SECRET as string, {
      expiresIn: '30d',
    });

    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

export default generateToken;
