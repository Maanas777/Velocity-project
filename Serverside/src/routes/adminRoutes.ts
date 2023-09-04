import express, { Router } from "express";
import adminController from "../conrollers/adminController";

const router: Router = express.Router();

router.post('/adminlogin',adminController.AdminLogin)
router.get('/driver',adminController.showDrivers)
router.get('/approvedDriver',adminController.showApprovedDrivers)

export default router;