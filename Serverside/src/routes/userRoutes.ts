import Express  from "express";
import usercontroller from '../conrollers/usercontroller'
const router=Express.Router()



router.get('/',usercontroller.Userhome)
router.post('/userLogin',usercontroller.UserLogin)
router.get('/signup',usercontroller.userSignup)
router.post('/signup',usercontroller.userSignupPost)
router.get('/finduser/:id',usercontroller.userprofile)
router.put('/editProfile/:id',usercontroller.editprofile)
router.post('/sendOtp',usercontroller.Sentotp)

export default router;