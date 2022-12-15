import Groups from "./Groups";
import User, { UserType } from "./User";

export type GroupType = {
  name: string;
  id: string;
  participants: UserType[];
  owner?: UserType;
};

class Group {
  static getGroup = async (gid: string) => {
    const group = await Groups.getGroup(gid);
    return group;
  };

  static acceptRequest = async (gid: string) => {
    const userId = User.id;
    // TODO: Update group adding participant
    // Change groupRequest data
  };

  static rejectRequest = async (gid: string) => {
    const userId = User.id;
    // TODO: Update group adding participant
    // Change groupRequest data
  };
}

export default Group;
