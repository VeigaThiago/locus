import { Alert } from "react-native";
import { groups } from "../__fixtures__/groups";

export type GroupType = {
  name: string;
  participants: {
    id: string;
    name: string;
    photoUrl: string;
    coords: {
      latitude: string;
      longitude: string;
      batteryLevel: number;
      lastUpdate: Date;
    };
  }[];
};

class Group {
  userId: string = "";

  constructor(id: string) {
    this.userId = id;
  }

  static getGroup = (gid: string): GroupType => {
    return groups[gid];
  };
}

export default Group;
