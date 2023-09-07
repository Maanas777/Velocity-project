import { Request, Response } from "express";
import driverModel from "../models/driver";
import UserModel from "../models/user";

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
    const users = await UserModel.find();
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









};

export default adminController;
