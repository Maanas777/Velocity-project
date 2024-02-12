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
const user_1 = __importDefault(require("../models/user"));
const trip_1 = require("../models/trip");
const driver_1 = __importDefault(require("../models/driver"));
const review_1 = __importDefault(require("../models/review"));
const razorpay_1 = __importDefault(require("razorpay"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const jwtToke_1 = __importDefault(require("../utilities/jwtToke"));
const usercontroller = {
    UserLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("userlogin");
        try {
            const { email, password } = req.body;
            const user = yield user_1.default.findOne({ email });
            if (user) {
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (isMatch) {
                    console.log("password is correct");
                    const token = (0, jwtToke_1.default)(user._id);
                    return res.json({
                        message: "logged in successfully",
                        user,
                        token,
                    });
                }
                else {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
            }
            else {
                return res.status(404).json({ message: "User not found" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "An error occurred" });
        }
    }),
    userSignupPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("usersignup");
        try {
            const { username, email, phone, password } = req.body;
            const userExists = yield user_1.default.findOne({ email });
            if (userExists) {
                console.log("User already exists");
                return res.status(400).json({ error: "User already exists" });
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                yield user_1.default.create({
                    username,
                    email,
                    phone,
                    password: hashedPassword,
                });
                return res.json({ message: "User created successfully" });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "An error occurred" });
        }
    }),
    editprofile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("9009809897897");
        try {
            const id = req.params.id;
            const trimmedObjectId = id.trim();
            console.log(id, "kjhjksddhkdjsadhfkjsadfhajk.h");
            const updateUser = yield user_1.default.findByIdAndUpdate(trimmedObjectId, {
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
            }, { new: true });
            if (updateUser) {
                res.json({ msg: 'message: "logged in successfully', updateUser });
            }
        }
        catch (error) {
            console.error(error);
            res.send(error);
        }
    }),
    userprofile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id.trim();
            console.log(id, "lkjlkjflksjf");
            const user = yield user_1.default.findOne({ _id: id }).populate("trips");
            if (user) {
                res.json({ user });
            }
        }
        catch (error) {
            console.error(error);
            res.send(error);
        }
    }),
    createRide: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const driverId = req.body.DriverId;
            const rideData = req.body.rideData;
            const fare = req.body.fare;
            const driver = req.body.driver;
            console.log(driver, "driver");
            const pickuplocation = rideData.pickupLocation;
            const destination = rideData.destinationLocation;
            console.log(pickuplocation, "pickiuppiip");
            const user = yield user_1.default.findById(id).exec();
            if (!user) {
                res.json({ msg: "User not found" });
                return;
            }
            const newTrip = yield trip_1.TripModel.create({
                user: user._id,
                driverId: driverId,
                pickuplocation: pickuplocation,
                destination: destination,
                fare: fare,
                driverDetails: {
                    name: driver.DriverName,
                    phone: driver.DriverPhone,
                    vehicleModel: driver.VehicleModel,
                    vehiclePhoto: driver.vehiclePhoto,
                },
                isCompleted: false,
            });
            user.trips.push(newTrip._id);
            yield user.save();
            const populatedTrip = yield trip_1.TripModel.populate(newTrip, {
                path: "user",
                select: "username phone _id ",
            });
            res.json({ trip: populatedTrip });
        }
        catch (error) {
            console.error("Error creating ride:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }),
    bikes: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const availableBikes = yield driver_1.default.find({ isDriver: true });
            if (availableBikes) {
                res.json({ availableBikes });
            }
        }
        catch (error) {
            res.json({ error });
        }
    }),
    payment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("hello");
        const id = req.body.id;
        console.log(id);
        const trip = yield trip_1.TripModel.findOne({ _id: id });
        const fare = trip === null || trip === void 0 ? void 0 : trip.fare;
        console.log(fare, "fareeeeee");
        try {
            const instance = new razorpay_1.default({
                key_id: process.env.RAZORPAY_KEY_ID || "",
                key_secret: process.env.RAZORPAY_SECRET || "",
            });
            const options = {
                amount: (fare || 10) * 100,
                currency: "INR",
                receipt: crypto_1.default.randomBytes(10).toString("hex"),
            };
            instance.orders.create(options, (error, order) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Something Went Wrong!" });
                }
                try {
                    yield trip_1.TripModel.updateOne({ _id: id }, { Isfarepaid: true });
                }
                catch (updateError) {
                    console.log(updateError);
                    return res
                        .status(500)
                        .json({ message: "Failed to update payment status" });
                }
                res.status(200).json({ data: order });
            }));
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    }),
    Verify_payment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto_1.default
                .createHmac("sha256", process.env.RAZORPAY_SECRET || "")
                .update(sign.toString())
                .digest("hex");
            if (razorpay_signature === expectedSign) {
                console.log("sucessss");
                return res
                    .status(200)
                    .json({ message: "Payment verified successfully" });
            }
            else {
                console.log("errorrr");
                return res.status(400).json({ message: "Invalid signature sent!" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    }),
    findTrip: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const trip = yield trip_1.TripModel.findById(id);
        res.json(trip);
    }),
    createReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviewData = req.body.content;
            const id = req.params.id;
            console.log(reviewData, "reviewwwwwwwwwww");
            console.log(id, "iddddddddddddddddddddd");
            const newReview = yield new review_1.default({
                body: reviewData,
                author: id,
                date: new Date(),
            });
            yield newReview.save();
            res.status(201).json({ message: "Review created successfully" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create the review" });
        }
    }),
};
exports.default = usercontroller;
