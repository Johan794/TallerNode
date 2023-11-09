import UserModel, { UserInput, UserDocument } from "../models/user.model";
import jwt from "jsonwebtoken";
class UserService {
  public async create(userInput: UserInput): Promise<UserDocument> {
    try {
      const user = await UserModel.create(userInput);
      return user;
    } catch (error) {
      throw error;
    }
  }

    public async findByEmail(email: string): Promise<UserDocument | null> {
        try {
        const user = await UserModel.findOne({ email: email });
        return user;
        } catch (error) {
        throw error;
        }
    }

    public async findAll(): Promise<UserDocument[]> {
        try {
        const users = await UserModel.find();
        return users;
        } catch (error) {
        throw error;
        }
    }

    public async findById(id: string): Promise<UserDocument | null> {
      try {
        const user = await UserModel.findById(id);
        return user;
      } catch (error) {
        throw error;
      }
    
    }

    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
      try {
        const userUpdated = await UserModel.updateOne({ _id: id }, userInput);
        if (userUpdated) {
          const user = await UserModel.findById(id);
          return user;
        }
        return null;
      } catch (error) {
        throw error;
      }
    
    }

    public async generateToken(user: UserDocument): Promise<string> {
      try{
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "secret", {
          expiresIn: "24h",
        });
        return token;
      }catch(error){
        throw error;
      }
    }


}

export default new UserService();
