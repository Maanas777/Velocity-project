import express from 'express';
import { Request, Response } from "express";
import userRoutes from './routes/userRoutes'
import driverRoutes from './routes/driverRoutes'
import adminRoutes  from './routes/adminRoutes'
import cors from 'cors'
import http from 'http';
import { Server } from 'socket.io'

import connectDB from './connection/connection'

const app = express();
const port = 3003;

const server=http.createServer(app)
// const io= new Server(server)


app.use(cors());

const io = new Server(server, {
    cors: {origin:"http://localhost:5173", methods: ["GET", "POST"]},
});


app.set('io', io);

connectDB();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/admin',adminRoutes)


app.get('/', (_req:Request, res:Response) => {
    res.send('Hello world');
});





io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);
    
    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data);
    });
  });



server.listen(port, () => {
    console.log("Server started successfully");
});
