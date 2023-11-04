"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (userId) => {
    try {
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.SECRET, {
            expiresIn: '30d',
        });
        return token;
    }
    catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};
exports.default = generateToken;
