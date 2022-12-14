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

  static getGroup = async (gid: string) => {
    const group = await Groups.getGroup(gid);
    return group;
  };
}

export default Group;
