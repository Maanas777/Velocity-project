import { Request, Response } from "express";
import driverModel from '../models/driver'
import { ObjectId } from "mongoose";

import bcrypt from "bcrypt";

export interface IDriver {
    _id: ObjectId;
    Drivername: string;
    email: string;
    password: string;
}






const drivercontroller = {

    driverloginpage: (_req: Request, res: Response) => {
        res.json("driver login")

    },

    driverlogin: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const driver = await driverModel.findOne({ email }) as IDriver

            if (driver) {
                const isMatch = await bcrypt.compare(password, driver.password)


                if (isMatch) {
                    res.json({
                        message: "driver logged successfully",
                        user: {
                            name: driver.Drivername,
                            email: driver.email

                        }

                    })

                }
                else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            } else {
                res.status(404).json({ message: 'Driver not found' });
            }

        }
        catch (error) {
            res.status(500).json({ message: 'An error occurred' });
        }

    },




    driverSignup: async (req: Request, res: Response) => {
        console.log("hooo");

        const {
            Drivername,
            email,
            phone,
            password,
            licenseno,
            VehicleModel,
            vehicleNo,
            RCNo

        } = req.body;


        try {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const DriverPhoto: string = files['driverPhoto'][0].filename;
            console.log(DriverPhoto,"79879");
            

            const vehiclePhoto: string = files['vehiclePhoto'][0].filename;

            const driverExist = await driverModel.findOne({ email });
            if (driverExist) {
                res.json('Driver already exists');
            }
            else {

                const hashedPassword = await bcrypt.hash(password, 10);
                await driverModel.create({
                    Drivername,
                    email,
                    phone,
                    password: hashedPassword,
                    licenseno,
                    VehicleModel,
                    vehicleNo,
                    RCNo,
                    DriverPhoto,
                    vehiclePhoto
                });
                res.json({ message: 'Driver created successfully' });
            }
        } catch (error) {
            console.error('Error creating driver:', error);
            res.status(500).json({ message: 'Error creating driver' });
        }
    }


}
export default drivercontroller