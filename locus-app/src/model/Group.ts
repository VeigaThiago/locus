import {
  acceptGroupRequest,
  createGroup,
  rejectGroupRequest,
  sendGroupRequest,
} from "../services/groups";
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
    const userId = User?.id;
    if (userId) {
      await acceptGroupRequest(userId, gid);
    }
  };

  static rejectRequest = async (gid: string) => {
    const userId = User?.id;
    if (userId) {
      await rejectGroupRequest(userId, gid);
    }
  };

  static createGroup = async (name: string, participants: Array<UserType>) => {
    try {
      if (User?.id) {
        const group = await createGroup({
          name,
          owner: User.id,
          participants: [User?.id],
        });
        await Promise.all(
          participants.map(({ id }) => sendGroupRequest(id, group.id))
        );
        return true;
      }
    } catch {
      return false;
    }
  };
}

export default Group;
