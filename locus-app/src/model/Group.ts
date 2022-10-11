import { groups } from "../__fixtures__/groups";
import Groups from "./Groups";
import { UserType } from "./User";

export type GroupType = {
  name: string;
  id: string;
  participants: UserType[];
};

class Group {
  userId: string = "";

  constructor(id: string) {
    this.userId = id;
  }

  static getGroup = async (gid: string): Promise<GroupType | undefined> => {
    const groups = await Groups.getGroups();
    return groups?.[gid];
  };
}

export default Group;
