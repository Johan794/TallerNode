"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Dependencies
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
//enviroment variables
dotenv_1.default.config();
//database connection url 
const connectionString = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/AppDB";
//database connection
exports.db = mongoose_1.default.connect(connectionString).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});
