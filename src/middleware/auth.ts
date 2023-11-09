import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = async (req:Request,res:Response,next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Not authorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        req.body.loggedUser = decoded;
        next();
    }catch(error){
        return res.status(500).json(error);
    }
    
}

export default auth;