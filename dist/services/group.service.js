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
const group_model_1 = __importDefault(require("../models/group.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
class GroupService {
    create(groupInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield group_model_1.default.create(groupInput);
                return group;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield group_model_1.default.find();
                return groups;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield group_model_1.default.findById(id);
                return group;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, groupInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupUpdated = yield group_model_1.default.updateOne({ _id: id }, groupInput);
                if (groupUpdated) {
                    const group = yield group_model_1.default.findById(id);
                    return group;
                }
                return null;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield group_model_1.default.findByIdAndDelete(id);
                return group;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //add members to group it finds the group by id and then adds the user to the group
    addMember(id, userInput) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Entro al metodo agregar miembro");
                const user = yield user_model_1.default.findOne({ name: userInput.name });
                if (!user) {
                    throw new Error("User not found");
                }
                const groupToAdd = yield group_model_1.default.findById(id);
                if (!groupToAdd) {
                    throw new Error("Group not found");
                }
                if (groupToAdd.users.includes(user._id)) {
                    throw new Error("User already in group");
                }
                groupToAdd.users.push(user._id);
                (_a = user.groups) === null || _a === void 0 ? void 0 : _a.push(groupToAdd._id);
                yield user.save();
                yield groupToAdd.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    //remove members from group it finds the group by id and then removes the user from the group
    removeMember(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToRemove = yield user_model_1.default.findById(userId);
                if (!userToRemove) {
                    throw new Error("User not found");
                }
                const group = yield group_model_1.default.findById(id);
                if (!group) {
                    throw new Error("Group not found");
                }
                if (!group.users.includes(userToRemove._id)) {
                    throw new Error("User not in group");
                }
                const deletedAtUsers = yield group_model_1.default.updateOne({ _id: id }, { $pull: { users: userToRemove._id } });
                const deletedAtGroups = yield user_model_1.default.updateOne({ _id: userId }, { $pull: { groups: group._id } });
                if (!deletedAtGroups || !deletedAtUsers) {
                    throw new Error("Error during the trasanction");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield group_model_1.default.findOne({ name: name });
                return group;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getGroupsByUser(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExist = yield user_model_1.default.findOne({ name: userName });
                if (!userExist) {
                    throw new Error("User not found");
                }
                const groups = yield group_model_1.default.find({ users: userExist._id });
                return groups;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new GroupService();
