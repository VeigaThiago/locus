import { fetchGroups } from "../services/groups";
import { GroupType } from "./Group";

let instance: Groups;

class Groups {
  instance: Groups | undefined = undefined;

  groups: { [gid: string]: GroupType } | undefined = undefined;

  getGroups = async () => {
    if (this.groups) return this.groups;
    else {
      await this.fetchGroups();
      return this.groups;
    }
  };

  fetchGroups = async () => {
    const fGroups = await fetchGroups();
    this.groups = fGroups.reduce((acc, group) => {
      return { ...acc, [group.id]: group };
    }, {});
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
