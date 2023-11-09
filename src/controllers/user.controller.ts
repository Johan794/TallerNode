import { Request , Response } from "express";
import userService from "../services/user.service";
import { UserInput , UserDocument} from "../models/user.model";
import bcrypt from "bcrypt";

class UserController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const userExist: UserDocument | null = await userService.findByEmail(req.body.email);
            if (userExist) {
                return res.status(400).json({ message: "User already exists" });
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user: UserDocument = await userService.create(req.body);
            return res.status(201).json(user);
        } catch (error) {
           return res.status(500).json({ error: error });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const users: UserDocument[] = await userService.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const user: UserDocument | null = await userService.findByEmail(req.body.email);
            if (!user) {
                return res.status(401).json({ message: "Invalid email   " });
            }
            const validPassword: boolean = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const token = await userService.generateToken(user);

            return res.status(200).json({email: user.email, token: token});
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }


    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if(req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const updatedUser: UserDocument | null = await userService.update(req.params.id, req.body);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
   
}

export default new UserController();