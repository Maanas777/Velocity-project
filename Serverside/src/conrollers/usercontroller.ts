import { Request, Response } from "express";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

import generateToken from "../utilities/jwtToke";

const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;
const serviceId = "VAa73f82e318c35b309ad7c8dbf41892bf";
const client = twilio(accountSid, authToken);

// export interface IUser {
//   _id: import("mongoose").Types.ObjectId;
//   username: string;
//   email: string;
//   password: string;
// }

const usercontroller = {
  Userhome: (_req: Request, res: Response) => {
    // Send a JSON response
    return res.json({ message: "home page" });
  },

  UserLogin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const token = generateToken(user._id);
          console.log(token);

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

  userSignup: async (_req: Request, res: Response) => {
    // Send a JSON response
    return res.json({ message: "signup page" });
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
        res.json({ updateUser });
      }
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  userprofile: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const user = await userModel.findOne({ _id: id });

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
    console.log(phone,"phonenumber");
    

    const existingUser = await userModel.findOne({ phone: phone });
    if (!existingUser) {
      res.json({ msg: "Phone number not found" });
    }
    try {
    await client.verify.v2
        .services(serviceId)
        .verifications.create({
          to: "+91" + phone,
          channel: "sms",
        });
      res.json({ msg: "OTP sent succesfully" });
    }
    
    catch (error) {
      res.json({ Error: error });
    }
  },
};

////verify otp

verifyOtp:async (req: Request, res: Response)=>{

  const verificationCode = req.body.otp
  const phone = req.body.phone;

  try{
     // Verify the SMS code entered by the user
     const verification_check = await client.verify.v2
     .services(serviceId)
     .verificationChecks.create
     ({
       to: '+91' + phone,
       code: verificationCode
     });

     if(verification_check.status === 'approved'){
      res.json({msg:'verified user'})
     }
     else{
      res.json({msg:'invalid user'})
     }

  }catch(error){
    res.json({msg:error})
  }


}
















export default usercontroller;
