import express from 'express';
import { Request, Response } from "express";
import userRoutes from './routes/userRoutes'
import cors from 'cors'
import connectDB from './connection/connection'

const app = express();
const port = 3003;

connectDB();



app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.use('/api/users', userRoutes);


app.get('/', (_req:Request, res:Response) => {
    res.send('Hello world');
});


app.listen(port, () => {
    console.log("Server started successfully");
});
