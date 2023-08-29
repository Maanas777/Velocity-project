"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usercontroller = {
    Userhome: (_req, res) => {
        res.json('home page');
    },
    UserLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (user) {
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (isMatch) {
                res.send('userlogged');
            }
            else {
                res.json('invalid creds');
            }
        }
    }),
    userSignup: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("kayari");
        res.json('signup page');
    }),
    userSignupPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, phone, password } = req.body;
        const userExists = yield user_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ error: 'User already exists' });
        }
        else {
            yield user_1.default.create({
                name,
                email,
                phone,
                password
            });
            res.json({ message: 'User created successfully' });
        }
    })
};
exports.default = usercontroller;
