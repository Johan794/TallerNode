import UserModel, { UserInput, UserDocument } from "../models/user.model";
import GroupModel from '../models/group.model';

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

  public async update(
    id: string,
    userInput: UserInput
  ): Promise<UserDocument | null> {
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

  public async delete(id: string): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async getUsersByGroup(groupName: string): Promise<UserDocument[]> {
    try {
      const group = await GroupModel.findOne({ name: groupName });
      if (group) {
        const users = await UserModel.find({ _id: { $in: group.users } });
        return users;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
