"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["superadmin", "user"], default: "user" },
    groups: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Group" }],
    deletedAt: { type: Date, default: null },
}, { timestamps: true, collection: "users" });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
