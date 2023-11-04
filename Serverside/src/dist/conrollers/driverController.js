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
const cloudinary_1 = __importDefault(require("../utilities/cloudinary"));
const trip_1 = require("../models/trip");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtToke_1 = __importDefault(require("../utilities/jwtToke"));
const drivercontroller = {
    driverlogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const driver = (yield driver_1.default.findOne({ email }));
            if (driver) {
                const isMatch = yield bcrypt_1.default.compare(password, driver.password);
                if (isMatch) {
                    const token = (0, jwtToke_1.default)(driver._id);
                    res.json({
                        message: "driver logged successfully",
                        driver,
                        token
                    });
                }
                else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            }
            else {
                res.status(404).json({ message: "Driver not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    }),
    driverSignup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { Drivername, email, phone, password, licenseno, VehicleModel, vehicleNo, RCNo, } = req.body;
        try {
            const files = req.files;
            const DriverPhoto = files["driverPhoto"][0];
            const vehiclePhoto = files["vehiclePhoto"][0];
            let driver = null;
            let vehicle = null;
            const uploadDriverImagePromise = new Promise((resolve, reject) => {
                cloudinary_1.default.uploader
                    .upload_stream({ resource_type: "auto" }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                    if (error) {
                        return reject(error);
                    }
                    driver = result.secure_url;
                    resolve();
                }))
                    .end(DriverPhoto.buffer);
            });
            yield Promise.all([uploadDriverImagePromise]);
            const uploadVehicleImagePromise = new Promise((resolve, reject) => {
                cloudinary_1.default.uploader
                    .upload_stream({ resource_type: "auto" }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                    if (error) {
                        return reject(error);
                    }
                    vehicle = result.secure_url;
                    resolve();
                }))
                    .end(vehiclePhoto.buffer);
            });
            yield Promise.all([uploadVehicleImagePromise]);
            const driverExist = yield driver_1.default.findOne({ email });
            if (driverExist) {
                res.json("Driver already exists");
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                function generateUniqueSocketId() {
                    const randomString = Math.random().toString(36).substring(2, 15);
                    const timestamp = Date.now();
                    return `${randomString}_${timestamp}`;
                }
                const uniqueSocketId = generateUniqueSocketId();
                console.log(uniqueSocketId, "sockerrr");
                try {
                    yield driver_1.default.create({
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
                    res.json({ message: "Driver created successfully" });
                }
                catch (error) {
                    res.status(500).json({ message: "An error occurred" });
                }
            }
        }
        catch (error) {
            console.error("Error creating driver:", error);
            res.status(500).json({ message: "Error creating driver" });
        }
    }),
    editprofile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const trimmedObjectId = id.trim();
            console.log(req.body.Drivername);
            const updateUser = yield driver_1.default.findByIdAndUpdate(trimmedObjectId, {
                Drivername: req.body.Drivername,
                email: req.body.email,
                phone: req.body.phone,
            }, { new: true });
            if (updateUser) {
                res.json({ updateUser });
            }
        }
        catch (error) {
            console.error(error);
            res.send(error);
        }
    }),
    rides: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const trips = yield trip_1.TripModel.find().populate({
            path: "user",
            select: "username phone",
        });
        res.json({ trips });
    }),
    tripcomplete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        console.log(id, "tripiddddd");
        try {
            const trip = yield trip_1.TripModel.findOne({ _id: id });
            if (!trip) {
                return res.status(404).json({ message: 'Trip not found' });
            }
            if (trip.isCompleted) {
                return res.status(400).json({ message: 'Trip is already completed' });
            }
            trip.isCompleted = true;
            yield trip.save();
            return res.status(200).json({ message: 'Trip completed successfully' });
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }),
    driverhistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const driverId = req.params.id;
        try {
            const trips = yield trip_1.TripModel.find({ driverId: driverId }).populate("user");
            res.json({ trips });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching trip data" });
        }
    })
};
exports.default = drivercontroller;
