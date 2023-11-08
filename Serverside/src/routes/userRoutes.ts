import Express  from "express";
import usercontroller from '../conrollers/usercontroller'
import getAuth from "../middlewares/jwtmiddleware";
const router=Express.Router()


router.post('/userLogin',usercontroller.UserLogin)

router.post('/signup',usercontroller.userSignupPost)
router.get('/finduser/:id',usercontroller.userprofile)
router.put('/editProfile/:id',usercontroller.editprofile)
// router.post('/sendOtp',usercontroller.Sentotp)
// router.post('/verifyOtp',usercontroller.verifyOtp)
router.post('/createRide/:id',getAuth,usercontroller.createRide)
router.get('/availableBikes',usercontroller.bikes)
router.post('/payment',usercontroller.payment)
router.get('/findTrip/:id',usercontroller.findTrip)
router.post('/verify',usercontroller.Verify_payment)
router.post('/review/:id',usercontroller.createReview)

export default router;