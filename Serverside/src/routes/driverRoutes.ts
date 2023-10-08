import express, { Router } from "express";
import driverController from "../conrollers/driverController";
import multer from "multer";



const router: Router = express.Router();

const storage = multer.memoryStorage();
const uploader = multer({ storage: storage });

// const upload = multer({
//     storage: storage,
//     fileFilter: (_req, _file, cb) => {
       
//         cb(null, true);
//     }
// });







router.post('/driverLogin', driverController.driverlogin);
router.post('/driversignup', uploader.fields([ { name: 'driverPhoto', maxCount: 1 },
{ name: 'vehiclePhoto', maxCount: 1 }]), driverController.driverSignup);
router.put('/editProfile/:id',driverController.editprofile)
router.get('/rides',driverController.rides)
router.get('/userRequest/:id',driverController.userRequest)

export default router;
