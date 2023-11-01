import express from "express";
import { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import driverRoutes from "./routes/driverRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./connection/connection";



const app = express();
const port = 3003;

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }, // Allow all methods
});

app.set("io", io);

connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello world");
});

// const drivers = new Map();



io.on("connection", (socket) => {
  socket.on("driverConnected", (driverId) => {
    // drivers.set(driverId, socket);
    socket.join(driverId);
    console.log(`Driver ${driverId} connected.`);
  });

  socket.on('acceptedride',(data)=>{


    io.emit('acceptedride',data)
    
  })
 
  socket.on('ride_started',(data)=>{
  
    io.emit('ride_started',data)

  })
  socket.on("ride_completed", (data)=>{
    io.emit('ride_completed',data)
  })

  

  socket.on("createdride", (data) => {
console.log("hello aree you there");

    io.emit("newRideRequest",data)

  });
});

server.listen(port, () => {
  console.log("Server started successfully");
});
