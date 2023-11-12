import express from "express";
import { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import driverRoutes from "./routes/driverRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";
import http from "http";
import path from "path"; // Import the 'path' module

import { Server } from "socket.io";
import connectDB from "./connection/connection";

const app = express();
const port = 3003;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://velocityy.online",
      "http://velocityy.online",
      "*"
    ],
  },
});

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://velocityy.online",
    "http://localhost:3003",
    "http://velocityy.online",
  ],
  methods: "GET,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.set("io", io);
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/admin", adminRoutes);

// Serve the React app as static files
app.use(express.static(path.join(__dirname, "../")));

// Serve the React app for any other routes
app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  socket.on("driverConnected", (driverId) => {
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
    console.log("hello are you there");
    io.emit("newRideRequest", data);
  });
});

server.listen(port, () => {
  console.log("Server started successfully");
});
