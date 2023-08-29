import Express  from "express";
import usercontroller from '../conrollers/usercontroller'
const router=Express.Router()



router.get('/',usercontroller.Userhome)
router.post('/userLogin',usercontroller.UserLogin)
router.get('/signup',usercontroller.userSignup)
router.post('/signup',usercontroller.userSignupPost)

export default router;