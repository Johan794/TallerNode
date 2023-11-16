import GroupModel, { GroupInput, GroupDocument } from "../models/group.model";
import UserModel, { UserInput} from "../models/user.model";


class GroupService {
  public async create(groupInput: GroupInput): Promise<GroupDocument> {
    try {
      const group = await GroupModel.create(groupInput);
      return group;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<GroupDocument[]> {
    try {
      const groups = await GroupModel.find();
      return groups;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<GroupDocument | null> {
    try {
      const group = await GroupModel.findById(id);
      return group;
    } catch (error) {
      throw error;
    }
  }

  public async update(
    id: string,
    groupInput: GroupInput
  ): Promise<GroupDocument | null> {
    try {
      const groupUpdated = await GroupModel.updateOne({ _id: id }, groupInput);
      if (groupUpdated) {
        const group = await GroupModel.findById(id);
        return group;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

    public async delete(id: string): Promise<GroupDocument | null> {
        try {
            const group = await GroupModel.findByIdAndDelete(id);
            return group;
        } catch (error) {
            throw error;
        }
 
    }



    //add members to group it finds the group by id and then adds the user to the group
    public async addMember(id: string, userInput: UserInput): Promise<void> {
        try{
            console.log("Entro al metodo agregar miembro") 
            const user = await UserModel.findOne({name: userInput.name});
            if(!user){
                throw new Error("User not found");
            }

            const groupToAdd = await GroupModel.findById(id);
            if(!groupToAdd){
                throw new Error("Group not found");
            }

            if(groupToAdd.users.includes(user._id)){
                throw new Error("User already in group");
            }

            groupToAdd.users.push(user._id);
            user.groups?.push(groupToAdd._id);
            await user.save();
            await groupToAdd.save();
        }catch(error){
            throw error;
        }
    
    }

    //remove members from group it finds the group by id and then removes the user from the group
    public async removeMember(id: string, userId: string): Promise<void> {
            try{
                const userToRemove = await UserModel.findById(userId);
                if(!userToRemove){
                    throw new Error("User not found");
                }

                const group = await GroupModel.findById(id);
                if(!group){
                    throw new Error("Group not found");
                }

                if(!group.users.includes(userToRemove._id)){
                    throw new Error("User not in group");
                }
                const deletedAtUsers = await GroupModel.updateOne({_id: id}, {$pull: {users: userToRemove._id}});
                const deletedAtGroups = await UserModel.updateOne({_id: userId}, {$pull: {groups: group._id}});
                
                if(!deletedAtGroups || !deletedAtUsers){
                    throw new Error("Error during the trasanction");
                }
            }catch(error){
                throw error;
            }
    }

    public async findByName(name: string): Promise<GroupDocument | null> {
        try{
            const group = await GroupModel.findOne({name: name});
            return group;
        }catch(error){
            throw error;
        }
    }

    public async getGroupsByUser(userName: string): Promise<GroupDocument[]> {
        try{
            const userExist = await UserModel.findOne({name: userName});
            if(!userExist){
                throw new Error("User not found");
            }

            const groups = await GroupModel.find({users: userExist._id});

            return groups;
        }catch(error){
            throw error;
        }
    }
}

export default new GroupService();
