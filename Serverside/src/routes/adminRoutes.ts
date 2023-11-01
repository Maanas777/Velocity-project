import express, { Router } from "express";
import adminController from "../conrollers/adminController";

const router: Router = express.Router();

router.post('/adminlogin',adminController.AdminLogin)
router.get('/driver',adminController.showDrivers)
router.get('/approvedDriver',adminController.showApprovedDrivers)
router.get('/users',adminController.showUsers)
router.put('/acceptdriver/:id',adminController.acceptdriver)
router.put('/blockUser/:id',adminController.blockuser)
router.put('/UnblockUser/:id',adminController.Unblockuser)
router.put('/blockdriver/:id',adminController.blockDriver)
router.put('/Unblockdriver/:id',adminController.UnblockDriver)
router.get('/calculateTotalEarnings',adminController.calculateTotalEarnings)
router.get('/totalTrips',adminController.TotalTrips)
router.get('/totalDrivers',adminController.totalDrivers)
router.get('/totalUsers',adminController.totalUsers)
router.get('/monthlyIncome',adminController.monthlyIncome)
router.get('/monthlyTrips',adminController.monthlyTrips)


export default router;