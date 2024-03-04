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
const user_service_1 = __importDefault(require("../services/user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = __importDefault(require("../middleware/auth"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExist = yield user_service_1.default.findByEmail(req.body.email);
                if (userExist) {
                    return res.status(400).json({ message: "User already exists" });
                }
                req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
                const user = yield user_service_1.default.create(req.body);
                return res.status(201).json(user);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.findAll();
                if (!users || users.length === 0) {
                    return res.status(404).json({ message: "Users not found" });
                }
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.findByEmail(req.body.email);
                if (!user) {
                    return res.status(401).json({ message: "Invalid email" });
                }
                const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
                if (!validPassword) {
                    return res.status(401).json({ message: "Invalid password" });
                }
                const token = auth_1.default.generateToken(user);
                return res.status(200).json({ email: user.email, token: token });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                if (req.body.password) {
                    req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
                }
                const updatedUser = yield user_service_1.default.update(req.params.id, req.body);
                return res.status(200).json(updatedUser);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield user_service_1.default.delete(req.params.id);
                if (!deletedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json(deletedUser);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    getUsersByGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.getUsersByGroup(req.params.groupName);
                if (!users || users.length === 0) {
                    return res.status(404).json({ message: "Users not found" });
                }
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
}
exports.default = new UserController();
