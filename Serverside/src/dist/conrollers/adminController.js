"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driver_1 = __importDefault(require("../models/driver"));
const user_1 = __importDefault(require("../models/user"));
const trip_1 = require("../models/trip");
const adminController = {
    AdminLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            if (email === "admin@gmail.com" && password === "123") {
                console.log("989898");
                res.status(201).json({ message: "Admin logged succesfull" });
            }
            else if (email === "admin@gmail.com") {
                res.status(401).json({ message: "Invalid password" });
            }
            else {
                res.status(401).json({ message: "Invalid email" });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }),
    showDrivers: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("driver");
        const drivers = yield driver_1.default.find({ isDriver: false });
        res.json({ drivers });
    }),
    approve_drivers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        yield driver_1.default.findOneAndUpdate({ _id: userId }, { isDriver: true }, { new: true });
        res.json({ message: "driver verified succesfully" });
    }),
    showApprovedDrivers: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const drivers = yield driver_1.default.find({ isDriver: true });
        res.json({ drivers });
    }),
    showUsers: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_1.default.find().populate("trips");
        console.log(users, "llll");
        res.json({ users });
    }),
    acceptdriver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        console.log(id);
        try {
            const updatedDriver = yield driver_1.default.findOneAndUpdate({ _id: id }, { isDriver: true }, { new: true });
            if (!updatedDriver) {
                return res.status(404).json({ message: "Driver not found" });
            }
            res.status(200).json(`Accepted ${updatedDriver.Drivername} as driver`);
        }
        catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }),
    blockuser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const blockedUser = yield user_1.default.findOneAndUpdate({ _id: id }, { isBlocked: true }, { new: true });
            if (!blockedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(`Blocked ${blockedUser.username}`);
        }
        catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "error" });
        }
    }),
    Unblockuser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const blockedUser = yield user_1.default.findOneAndUpdate({ _id: id }, { isBlocked: false }, { new: true });
            if (!blockedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(`UnBlocked ${blockedUser.username}`);
        }
        catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "error" });
        }
    }),
    blockDriver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const blockedDriver = yield driver_1.default.findOneAndUpdate({ _id: id }, { isBlocked: true }, { new: true });
            if (!blockedDriver) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(`Blocked ${blockedDriver.Drivername}`);
        }
        catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "error" });
        }
    }),
    UnblockDriver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const UnblockedDriver = yield driver_1.default.findOneAndUpdate({ _id: id }, { isBlocked: false }, { new: true });
            if (!UnblockedDriver) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(`UnBlocked ${UnblockedDriver.Drivername}`);
        }
        catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "error" });
        }
    }),
    calculateTotalEarnings: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const totalEarnings = yield trip_1.TripModel.aggregate([
                {
                    $match: {
                        isCompleted: true,
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
            return 0;
        }
        catch (error) {
            console.error("Error calculating total earnings: " + error);
            throw error;
        }
    }),
    TotalTrips: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const totalCompletedTrips = yield trip_1.TripModel.countDocuments({
                isCompleted: true,
            });
            res.json(totalCompletedTrips);
        }
        catch (error) {
            res.json(error);
        }
    }),
    totalDrivers: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const totalDrivers = yield driver_1.default.countDocuments({ isDriver: true });
            res.json(totalDrivers);
        }
        catch (error) {
            res.json(error);
        }
    }),
    totalUsers: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const totalUsers = yield user_1.default.countDocuments();
            res.json(totalUsers);
        }
        catch (error) {
            res.json(error);
        }
    }),
    monthlyIncome: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const monthlyIncome = yield trip_1.TripModel.aggregate([
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
            res.json(monthlyIncome);
        }
        catch (error) {
            console.log(error);
        }
    }),
    monthlyTrips: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield trip_1.TripModel.aggregate([
                {
                    $match: { isCompleted: true }
                },
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        totalTrips: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        year: '$_id.year',
                        month: '$_id.month',
                        totalTrips: 1
                    }
                }
            ]).exec();
            res.json({ monthlyTrips: result });
        }
        catch (error) {
            console.error('Error aggregating data:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    })
};
exports.default = adminController;
