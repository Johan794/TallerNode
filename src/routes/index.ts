import { Express , Request , Response } from "express";
import userController from "../controllers/user.controller";
import auth from "../middleware/auth";

const routes = (app: Express) => {
    app.post("/users", userController.create);
    app.get("/users", auth ,userController.findAll);
    app.get("/users/:id", userController.findById);
    app.put("/users/:id", userController.update);
    app.post("/login", userController.login);
};

export default routes;