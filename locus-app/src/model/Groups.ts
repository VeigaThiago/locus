import { fetchGroup } from "../services/groups";
import { GroupType } from "./Group";
import Users from "./Users";

let instance: Groups;

class Groups {
  instance: Groups | undefined = undefined;

  getGroup = async (gid: string) => {
    const group = await fetchGroup(gid);

    const [participants, owner] = await Promise.all([
      Promise.all(group.participants.map((uid) => Users.getUser(uid))),
      Users.getUser(group.owner),
    ]);

    return {
      ...group,
      owner,
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
