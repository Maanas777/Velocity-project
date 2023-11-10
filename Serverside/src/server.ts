import express from "express";
import { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import driverRoutes from "./routes/driverRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";
import http from "http";
import path from "path";

import { Server } from "socket.io";

import connectDB from "./connection/connection";

const filePath = "/Clientside/dist/index.html";
const resolvedPath = path.resolve(filePath);

const app = express();
const port = 3003;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://velocityy.online",
      "http://velocityy.online",
    ],
    
  },
});



const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://velocityy.online",
    "http://localhost:3003",
    "http://velocityy.online"
  ],
  methods: "GET,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../../../Clientside/dist")));

// app.use(express.static(path.join(__dirname,'../../Clientside/dist')));

app.get("*", function (_req, res) {
  res.sendFile(resolvedPath, function (err) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
  });

  // res.sendFile(
  //   (path.join(__dirname,'../../Clientside/dist/index.html')),
  //     function (err) {
  //       if (err) {
  //         res.status(500).send(err);
  //         console.log(err);

  //       }
  //     }
  //   );
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

  socket.on("acceptedride", (data) => {
    io.emit("acceptedride", data);
  });

  socket.on("ride_started", (data) => {
    io.emit("ride_started", data);
  });
  socket.on("ride_completed", (data) => {
    io.emit("ride_completed", data);
  });

  socket.on("createdride", (data) => {
    console.log("hello aree you there");

    io.emit("newRideRequest", data);
  });
});

server.listen(port, () => {
  console.log("Server started successfully");
});
