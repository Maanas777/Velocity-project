import express, { Router } from "express";
import driverController from "../conrollers/driverController";
import multer from "multer";
const router: Router = express.Router();
const storage = multer.memoryStorage();
const uploader = multer({ storage: storage });






router.post('/driverLogin', driverController.driverlogin);
router.post('/driversignup', uploader.fields([ { name: 'driverPhoto', maxCount: 1 },
{ name: 'vehiclePhoto', maxCount: 1 }]), driverController.driverSignup);
router.put('/editProfile/:id',driverController.editprofile);
router.get('/rides',driverController.rides);
router.put('/completeride/:id',driverController.tripcomplete);
router.get('/driverhistory/:id',driverController.driverhistory);


export default router;
