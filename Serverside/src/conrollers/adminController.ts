import { Request, Response } from "express";
import driverModel from "../models/driver";
import UserModel from "../models/user";
import { TripModel } from "../models/trip";

const adminController = {
  AdminLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // const _name = "admin";

    try {
      if (email === "admin@gmail.com" && password === "123") {
        console.log("989898");

        res.status(201).json({ message: "Admin logged succesfull" });
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

  showDrivers: async (_req: Request, res: Response) => {
    console.log("driver");

    const drivers = await driverModel.find({ isDriver: false });
    res.json({ drivers });
  },
  approve_drivers: async (req: Request, res: Response) => {
    const userId = req.params.id;
    await driverModel.findOneAndUpdate(
      { _id: userId },
      { isDriver: true },
      { new: true }
    );

    res.json({ message: "driver verified succesfully" });
  },

  showApprovedDrivers: async (_req: Request, res: Response) => {
    const drivers = await driverModel.find({ isDriver: true });
    res.json({ drivers });
  },

  showUsers: async (_req: Request, res: Response) => {
    // const users = await UserModel.find({}).populate(['trips']);
    // res.json({ users });

    const users = await UserModel.find().populate("trips");
    console.log(users, "llll");

    res.json({ users });
  },

  acceptdriver: async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);

    try {
      const updatedDriver = await driverModel.findOneAndUpdate(
        { _id: id },
        { isDriver: true },
        { new: true }
      );

      if (!updatedDriver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      res.status(200).json(`Accepted ${updatedDriver.Drivername} as driver`);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  blockuser: async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const blockedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        { isBlocked: true },
        { new: true }
      );

      if (!blockedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(`Blocked ${blockedUser.username}`);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "error" });
    }
  },

  Unblockuser: async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const blockedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        { isBlocked: false },
        { new: true }
      );

      if (!blockedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(`UnBlocked ${blockedUser.username}`);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "error" });
    }
  },

  blockDriver: async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const blockedDriver = await driverModel.findOneAndUpdate(
        { _id: id },
        { isBlocked: true },
        { new: true }
      );

      if (!blockedDriver) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(`Blocked ${blockedDriver.Drivername}`);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "error" });
    }
  },

  UnblockDriver: async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const UnblockedDriver = await driverModel.findOneAndUpdate(
        { _id: id },
        { isBlocked: false },
        { new: true }
      );

      if (!UnblockedDriver) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(`UnBlocked ${UnblockedDriver.Drivername}`);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "error" });
    }
  },

  calculateTotalEarnings: async (_req: Request, res: Response) => {
    try {
      const totalEarnings = await TripModel.aggregate([
        {
          $match: {
            isCompleted: true, // Filter completed trips
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$fare" },
          },
        },
      ]);

      res.json(totalEarnings);

      return 0; // No completed trips, so total earnings are 0
    } catch (error) {
      console.error("Error calculating total earnings: " + error);
      throw error;
    }
  },

  TotalTrips: async (_req: Request, res: Response) => {
    try {
      const totalCompletedTrips = await TripModel.countDocuments({
        isCompleted: true,
      });
      res.json(totalCompletedTrips);
    } catch (error) {
      res.json(error);
    }
  },
  totalDrivers: async (_req: Request, res: Response) => {
    try {
      const totalDrivers = await driverModel.countDocuments({ isDriver: true });
      res.json(totalDrivers);
    } catch (error) {
      res.json(error);
    }
  },
  totalUsers: async (_req: Request, res: Response) => {
    try {
      const totalUsers = await UserModel.countDocuments();
      res.json(totalUsers);
    } catch (error) {
      res.json(error);
    }
  },

  
  monthlyIncome: async (_req: Request, res: Response) => {
    try {
      const monthlyIncome = await TripModel.aggregate([
        {
          $match: {
            Isfarepaid: true,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalIncome: { $sum: "$fare" },
          },
  
        },
        

      ]);
  

      res.json(monthlyIncome)

    } catch (error) {
      console.log(error);
      
    }
  },

  monthlyTrips:async (_req: Request, res: Response) =>{
   

    try {
      const result = await TripModel.aggregate([
        {
          $match: { isCompleted: true } // Filter only completed trips
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' }, // Extract year from createdAt field
              month: { $month: '$createdAt' } // Extract month from createdAt field
            },
            totalTrips: { $sum: 1 } // Count the number of trips in each group
          }
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            year: '$_id.year',
            month: '$_id.month',
            totalTrips: 1
          }
        }
      ]).exec();
  
      res.json({ monthlyTrips: result });
    } catch (error) {
      console.error('Error aggregating data:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }




};

export default adminController;
