import e, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET || "secret"
const auth = async (req:Request,res:Response,next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Not authorized"});
        }
        const decoded = jwt.verify(token, secretKey);
        req.body.loggedUser = decoded;
        next();
    }catch(error){
        return res.status(500).json(error);
    }
    
}

const generateToken = (user: UserDocument) => {
    try{
        const token = jwt.sign({ email: user.email },secretKey , {
          expiresIn: "24h",
        });
        return token;
      }catch(error){
        throw error;
      }
}

const verifryUserRole = (requiredRole: string)=>(req:Request,res:Response,next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Not authorized" });
        }
        if (!isJwtPayload(decoded) || decoded.role !== requiredRole) {
            return res.status(403).json({
                message:
                    "You do not have the authorization and permissions to access this resource.",
            });
        }

        next();
    });

    
}


function isJwtPayload(decoded: any): decoded is jwt.JwtPayload {
    return decoded && typeof decoded === "object" && "role" in decoded;
}
const authServices ={
    auth , 
    generateToken,
    verifryUserRole
}
export default authServices;