"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    deletedAt: { type: Date, default: null },
}, { timestamps: true, collection: "groups" });
const Group = mongoose_1.default.model("Group", groupSchema);
exports.default = Group;
