import { Request, Response } from "express";
import driverModel from '../models/driver'

const adminController = {
    
    
  AdminLogin: async (req: Request, res: Response) => {
   
    const { email, password } = req.body;
    // const _name = "admin";

    try {
      if (email === "admin@gmail.com" && password === "123") {
        console.log("989898");
        
        res.status(201).json({ message:'Admin logged succesfull' });
      } else if (email === "admin@gmail.com") {
        res.status(401).json({ message: "Invalid password" });
      } else {
        res.status(401).json({ message: "Invalid email" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  showDrivers:async (_req: Request, res: Response) =>{
    console.log("driver");
    

    const drivers=await driverModel.find({isDriver:false})
    res.json({drivers})


  },
    approve_drivers:async (req: Request, res: Response)=>{
      const userId=req.params.id
     await driverModel.findOneAndUpdate({_id:userId},{isDriver:true},{new:true})
     
    res.json({message:"driver verified succesfully"})
    },

    

  showApprovedDrivers:async (_req: Request, res: Response)=>{

const drivers=await driverModel.find({isDriver:true})
res.json({drivers})

  }






};

export default adminController