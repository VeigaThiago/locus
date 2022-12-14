import { fetchGroup } from "../services/groups";
import { getUser } from "../services/users";
import { GroupType } from "./Group";

let instance: Groups;

class Groups {
  instance: Groups | undefined = undefined;

  getGroup = async (gid: string) => {
    const group = await fetchGroup(gid);

    const participants = await Promise.all(
      group.participants.map((uid) => getUser(uid))
    );

    return {
      ...group,
      participants,
    };
  };

  static getInstance = () => {
    if (instance) return instance;
    else {
      instance = new Groups();
      return instance;
    }
  };
}

export default Groups.getInstance();
