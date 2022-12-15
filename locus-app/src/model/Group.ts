import {
  acceptGroupRequest,
  createGroup,
  rejectGroupRequest,
  sendGroupRequest,
} from "../services/groups";
import Groups from "./Groups";
import { UserType } from "./User";

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

  static acceptRequest = async (userId: string, gid: string) => {
    if (userId) {
      await acceptGroupRequest(userId, gid);
    }
  };

  static rejectRequest = async (userId: string, gid: string) => {
    if (userId) {
      await rejectGroupRequest(userId, gid);
    }
  };

  static createGroup = async (
    ownerId: string,
    name: string,
    participants: Array<UserType>
  ) => {
    try {
      if (ownerId) {
        const group = await createGroup({
          name,
          owner: ownerId,
          participants: [ownerId],
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
