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
const group_service_1 = __importDefault(require("../services/group.service"));
class GroupController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupExist = yield group_service_1.default.findByName(req.body.name);
                if (groupExist) {
                    return res.status(400).json({ message: "Group already exists" });
                }
                const group = yield group_service_1.default.create(req.body);
                return res.status(201).json(group);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield group_service_1.default.findAll();
                if (!groups || groups.length === 0) {
                    return res.status(404).json({ message: "Groups not found" });
                }
                return res.status(200).json(groups);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield group_service_1.default.findById(req.params.id);
                if (!group) {
                    return res.status(404).json({ message: "Group not found" });
                }
                return res.status(200).json(group);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield group_service_1.default.update(req.params.id, req.body);
                if (!group) {
                    return res.status(404).json({ message: "Group not found" });
                }
                return res.status(200).json(group);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield group_service_1.default.delete(req.params.id);
                if (!group) {
                    return res.status(404).json({ message: "Group not found" });
                }
                return res.status(200).json(group);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    addMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield group_service_1.default.addMember(req.params.id, req.body);
                return res.status(200).json({ message: "Member added to group" });
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    removeMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield group_service_1.default.removeMember(req.params.groupId, req.params.userId);
                return res.status(200).json({ message: "Member removed from group" });
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
    getGroupsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield group_service_1.default.getGroupsByUser(req.params.userName);
                if (!groups || groups.length === 0) {
                    return res.status(404).json({ message: "Groups not found" });
                }
                return res.status(200).json(groups);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
}
exports.default = new GroupController();
