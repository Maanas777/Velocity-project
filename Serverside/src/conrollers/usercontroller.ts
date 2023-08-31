import { Request, Response } from "express";
 import userModel from '../models/user'
import bcrypt from  'bcrypt'
import { ObjectId } from "mongoose";

export interface IUser {
    _id: ObjectId; 
    username: string;
    email: string;
    password: string;
    
}


 const usercontroller={


    Userhome:(_req:Request,res:Response)=>{
    
        res.json('home page')
    
     },

     UserLogin: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
    
            const user = await userModel.findOne({ email }) as IUser;
    
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
    
                if (isMatch) {
                    res.json({
                        message: 'logged in successfully',
                        user: {
                            name: user.username,
                            email: user.email
                        }
                    });
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'An error occurred' });
        }
    }
    
     ,
        userSignup:async(_req:Request,res:Response)=>{
    
            
            res.json('signup page')

        },


        userSignupPost: async (req: Request, res: Response) => {
          try{
            const { username, email, phone, password } = req.body;
           
            const userExists = await userModel.findOne({ email });

            if (userExists) {
                console.log("jiuji");
                
                res.status(400).json({ error: 'User already exists' });

          }
          
          
          else {

            const hashedPassword = await bcrypt.hash(password, 10);

            await userModel.create({
                username,
                email,
                phone,
                password:hashedPassword
            })
            
            res.json({ message: 'User created successfully' });
       
        
            } 
        
            }catch (error) {
                console.error(error);
                res.status(500).json({ error: 'An error occurred' });
            }
        }
        








 }
 export  default usercontroller;

 