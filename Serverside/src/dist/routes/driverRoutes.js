"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverController_1 = __importDefault(require("../conrollers/driverController"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const uploader = (0, multer_1.default)({ storage: storage });
router.post('/driverLogin', driverController_1.default.driverlogin);
router.post('/driversignup', uploader.fields([{ name: 'driverPhoto', maxCount: 1 },
    { name: 'vehiclePhoto', maxCount: 1 }]), driverController_1.default.driverSignup);
router.put('/editProfile/:id', driverController_1.default.editprofile);
router.get('/rides', driverController_1.default.rides);
router.put('/completeride/:id', driverController_1.default.tripcomplete);
router.get('/driverhistory/:id', driverController_1.default.driverhistory);
exports.default = router;
