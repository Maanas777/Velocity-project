import User from '../models/user'
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { Request, Response,NextFunction } from "express";
dotenv.config()

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      auth?: any; // Adjust the type for 'auth' as needed
    }
  }
}




const getAuth = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const token = req.headers.token as string;
   
        console.log(token);
        if(!token){
      
            return res.status(401).json({error: "unauthorized"})
        }
     
        const verifyToken:any = jwt.verify(token, process.env.SECRET as string)
       console.log(verifyToken,"hejkrk");
       

        if(!verifyToken){
          console.log("whhat the fuckk");
          
            return res.status(401).json({error: "unauthorized"})
        }
      
    
        
        const auth = await User.findById(verifyToken.id)
        // console.log(auth);

        req.userId = verifyToken.id
        req.auth = auth
        next()
    } catch (error) {
      
      console.log(error) ;

        res.status(401).json({error: "unauthorized"})
    }
}

export default getAuth;
