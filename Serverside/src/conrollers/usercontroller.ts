import { Request, Response } from "express";
import userModel from "../models/user";
import {TripModel} from '../models/trip'
import driverModel from '../models/driver'
// import { Server } from 'socket.io';

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

import generateToken from "../utilities/jwtToke";

const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;
const serviceId = process.env.Service_SID;
const client = twilio(accountSid, authToken);

// export interface IUser {
//   _id: import("mongoose").Types.ObjectId;
//   username: string;
//   email: string;
//   password: string;
// }

const usercontroller = {
 

  UserLogin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const token = generateToken(user._id);
    
         return res.json({
            message: "logged in successfully",
            user,
            token,
          });
        } else {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "An error occurred" });
    }
  },



  userSignupPost: async (req: Request, res: Response) => {
    try {
      const { username, email, phone, password } = req.body;

      const userExists = await userModel.findOne({ email });

      if (userExists) {
        console.log("User already exists");
        return res.status(400).json({ error: "User already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
          username,
          email,
          phone,
          password: hashedPassword,
        });

        return res.json({ message: "User created successfully" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred" });
    }
  },

  editprofile: async (req: Request, res: Response) => {
    console.log("9009809897897");

    try {
      const id = req.params.id;
      const trimmedObjectId = id.trim();
      console.log(id, "kjhjksddhkdjsadhfkjsadfhajk.h");

      const updateUser = await userModel.findByIdAndUpdate(
        trimmedObjectId,

        {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
        },
        { new: true }
      );

      if (updateUser) {
        res.json({ msg: 'message: "logged in successfully', updateUser });
      }
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  userprofile: async (req: Request, res: Response) => {
    try {
      const id = req.params.id.trim();
      console.log(id,"lkjlkjflksjf");
      

      const user = await userModel.findOne({ _id: id }).populate('trips');

      if (user) {
        res.json({ user });
      }
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  ///sent otp

  Sentotp: async (req: Request, res: Response) => {
    const phone = req.body.phone;
    console.log(phone, "phonenumber");

    try {
      const existingUser = await userModel.findOne({ phone: phone });

      if (!existingUser) {
        console.log("User not found");
        return res.status(404).json({ error: "Phone number not found" });
      }

      if (typeof serviceId === "string") {
        await client.verify.v2.services(serviceId).verifications.create({
          to: "+91" + phone,
          channel: "sms",
        });
        res.json({ msg: "OTP sent successfully", existingUser });
      } else {
        // Handle the case where serviceId is undefined or not a string
        res.json({ Error: "Invalid serviceId" });
      }
    } catch (error) {
      res.json({ Error: error });
    }
  },

  ////verify otp

  verifyOtp: async (req: Request, res: Response) => {
    const { OTP, phone } = req.body;
    console.log("Received OTP:", OTP);
    console.log("Received phone:", phone);

    try {
      if (typeof serviceId === "string") {
        const formattedPhone = phone.replace(/"/g, "");
        const verification_check = await client.verify.v2
          .services(serviceId)
          .verificationChecks.create({
            to: "+91" + formattedPhone,
            code: OTP,
          });

        if (verification_check.status === "approved") {
          res.json({ msg: "verified user" });
        } else {
          res.json({ msg: "invalid user" });
        }
      } else {
        // Handle the case where serviceId is undefined or not a string
        res.json({ Error: "Invalid serviceId" });
      }
    } catch (error: any) {
      console.error("Error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        res.status(400).json({ error: error.response.data.message });
      } else {
        res.status(500).json({ error: "An error occurred" });
      }
    }
  },


  createRide: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
 
     
      
      const pickuplocation = req.body.pickupLocation;
      const destination = req.body.destinationLocation;
     
    
      const user = await userModel.findById(id).exec();
  
      if (!user) {
        res.json({ msg: 'User not found' });
        return;
      }
  
      const newTrip = await TripModel.create({
        user: user._id, 
        pickuplocation: pickuplocation,
        destination: destination,
        isCompleted: false
      });
  
      user.trips.push(newTrip._id);
      await user.save();

      // Populate the 'user' field to get user details including 'username'
      const populatedTrip = await TripModel.populate(newTrip, { path: 'user', select: 'username phone' });
  
      

      
  
      // Send the populated trip in the response
      res.json({ trip: populatedTrip });
    } catch (error) {
      // Handle errors
      console.error('Error creating ride:', error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
  ,
  bikes:async (_req: Request, res: Response) =>{
    try {
      const availableBikes=await driverModel.find({isDriver:true})
      if(availableBikes){
        res.json({availableBikes})
      }


      
    } catch (error) {
      res.json({error})
      
    }



  }

















};

export default usercontroller;
