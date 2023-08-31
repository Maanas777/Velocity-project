import express, { Router } from "express";
import driverController from "../conrollers/driverController";
import multer from "multer";

const router: Router = express.Router();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (_req, _file, cb) => {
       
        cb(null, true);
    }
});






router.get('/driverLogin', driverController.driverloginpage);
router.post('/driverLogin', driverController.driverlogin);
router.post('/driversignup', upload.fields([ { name: 'driverPhoto', maxCount: 1 },
{ name: 'vehiclePhoto', maxCount: 1 }]), driverController.driverSignup);

export default router;
