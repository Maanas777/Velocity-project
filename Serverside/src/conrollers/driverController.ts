import { Request, Response } from "express";

import driverModel from "../models/driver";

import cloudinary from "../utilities/cloudinary";
import { TripModel } from "../models/trip";

// import { Server } from 'socket.io';
import bcrypt from "bcrypt";
import generateToken from "../utilities/jwtToke";

// export interface IDriver {
//   _id: ObjectId;
//   user: Types.ObjectId | typeof UserModel;
//   Drivername: string;
//   email: string;
//   password: string;
// }

const drivercontroller = {
  driverlogin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const driver = (await driverModel.findOne({ email })) ;

      if (driver) {
        const isMatch = await bcrypt.compare(password, driver.password);

        if (isMatch) {
          const token = generateToken(driver._id)

          res.json({
            message: "driver logged successfully",
            driver,
            token
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        res.status(404).json({ message: "Driver not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred" });
    }
  },

  driverSignup: async (req: Request, res: Response) => {
    const {
      Drivername,
      email,
      phone,
      password,
      licenseno,
      VehicleModel,
      vehicleNo,
      RCNo,
    } = req.body;

    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const DriverPhoto = files["driverPhoto"][0];
      const vehiclePhoto = files["vehiclePhoto"][0];

      let driver: string | null = null; // Initialize with null'
      let vehicle: string | null = null;

      const uploadDriverImagePromise = new Promise<void>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "auto" },
            async (error, result: any) => {
              if (error) {
                return reject(error);
              }
              driver = result.secure_url;
              resolve();
            }
          )
          .end(DriverPhoto.buffer);
      });

      await Promise.all([uploadDriverImagePromise]);

      const uploadVehicleImagePromise = new Promise<void>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "auto" },
            async (error, result: any) => {
              if (error) {
                return reject(error);
              }
              vehicle = result.secure_url;
              resolve();
            }
          )
          .end(vehiclePhoto.buffer);
      });

      await Promise.all([uploadVehicleImagePromise]);

      const driverExist = await driverModel.findOne({ email });
      if (driverExist) {
        res.json("Driver already exists");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        function generateUniqueSocketId() {
          const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string
          const timestamp = Date.now(); // Get the current timestamp
          return `${randomString}_${timestamp}`;
        }

        const uniqueSocketId = generateUniqueSocketId();
        console.log(uniqueSocketId, "sockerrr");

        try {
          await driverModel.create({
            Drivername,
            email,
            phone,
            password: hashedPassword,
            licenseno,
            VehicleModel,
            vehicleNo,
            RCNo,
            DriverPhoto: driver,
            vehiclePhoto: vehicle,
            socketId: uniqueSocketId,
          });

          // Send the response only after the driver is successfully created
          res.json({ message: "Driver created successfully" });
        } catch (error) {
          // Handle any errors that occur during the create operation
          res.status(500).json({ message: "An error occurred" });
        }
      }
    } catch (error) {
      console.error("Error creating driver:", error);
      res.status(500).json({ message: "Error creating driver" });
    }
  },

  editprofile: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const trimmedObjectId = id.trim();
      console.log(req.body.Drivername);

      const updateUser = await driverModel.findByIdAndUpdate(
        trimmedObjectId,

        {
          Drivername: req.body.Drivername,
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

  rides: async (_req: Request, res: Response) => {
    const trips = await TripModel.find().populate({
      path: "user",
      select: "username phone",
    });

    res.json({ trips });
  },


tripcomplete: async (req: Request, res: Response) =>  {
  
    const id = req.params.id;
    console.log(id,"tripiddddd");
    

    try {
        const trip = await TripModel.findOne({ _id: id });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        if (trip.isCompleted) {
          return res.status(400).json({ message: 'Trip is already completed' });
      }

        trip.isCompleted = true;
        await trip.save();

        return res.status(200).json({ message: 'Trip completed successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
},

driverhistory:async (req: Request, res: Response) => {
  const driverId=req.params.id
  try {
    const trips= await TripModel.find({ driverId })
    console.log(trips,"trip historyyyyyyy");
  res.json(trips)
    
  } catch (error) {
    res.status(500).json({ error: "Error fetching trip data" });
    
  }

}
 
}
      
    


    

export default drivercontroller;
