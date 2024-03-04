"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const group_controller_1 = __importDefault(require("../controllers/group.controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
const routes = (app) => {
    //LOGIN
    app.post("/login", user_controller_1.default.login);
    //C
    app.post("/users", auth_1.default.auth, auth_1.default.hasAnyRole("superadmin"), user_controller_1.default.create);
    app.post("/groups", auth_1.default.auth, group_controller_1.default.create);
    //R
    app.get("/users", auth_1.default.auth, user_controller_1.default.findAll);
    app.get("/groups", auth_1.default.auth, group_controller_1.default.findAll);
    app.get("/users/:id", auth_1.default.auth, user_controller_1.default.findById);
    app.get("/groups/:id", auth_1.default.auth, group_controller_1.default.findById);
    //U
    app.put("/users/:id", auth_1.default.auth, user_controller_1.default.update);
    app.put("/groups/:id", auth_1.default.auth, group_controller_1.default.update);
    //D
    app.delete("/users/:id", auth_1.default.auth, user_controller_1.default.delete);
    app.delete("/groups/:id", auth_1.default.auth, group_controller_1.default.delete);
    //Get all users in a group
    app.get("/users/groups/:groupName", auth_1.default.auth, user_controller_1.default.getUsersByGroup);
    //Get all groups of a user
    app.get("/groups/users/:userName", auth_1.default.auth, group_controller_1.default.getGroupsByUser);
    //Add a user to a group
    app.patch("/groups/add/:id", auth_1.default.auth, group_controller_1.default.addMember);
    //Remove a user from a group
    app.patch("/groups/remove/:groupId/user/:userId", auth_1.default.auth, group_controller_1.default.removeMember);
};
exports.default = routes;
