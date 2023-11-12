"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const driverRoutes_1 = __importDefault(require("./routes/driverRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const connection_1 = __importDefault(require("./connection/connection"));
const app = (0, express_1.default)();
const port = 3003;
const server = http_1.default.createServer(app);
const _dirname = path_1.default.dirname("");
const buildPath = path_1.default.join(_dirname, "../../Clientside/dist");
const io = new socket_io_1.Server(server, {
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
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static(buildPath));
app.get("/*", function (_req, res) {
    console.log("called");
    res.sendFile(path_1.default.join(__dirname, "../../Clientside/dist/index.html"), function (err) {
        if (err) {
            console.log("eror occured");
            res.status(500).send(err);
            console.log(err);
        }
    });
});
app.set("io", io);
(0, connection_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", userRoutes_1.default);
app.use("/api/drivers", driverRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.get("/", (_req, res) => {
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
        console.log("hello aree you there");
        io.emit("newRideRequest", data);
    });
});
server.listen(port, () => {
    console.log("Server started successfully");
});
