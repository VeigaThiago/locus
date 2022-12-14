import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { getUserConfirmedGroupsIds } from "../services/users";
import Group, { GroupType } from "./Group";
import Groups from "./Groups";
import Users from "./Users";

let instance: User;

export type UserType = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

class User {
  id: string | undefined;
  avatarUrl: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;

  login = (user: FirebaseAuthTypes.User) => {
    this.id = user.uid;
    this.avatarUrl = user?.photoURL;
    this.name = user.displayName;
    this.email = user.email;
    Users.createUser(user);
  };

  getFriends = () => {};

  getConfirmedFriends = () => {
    return [
      {
        id: "1",
        name: "Mary Green",
        email: "mary2@email.com",
        avatarUrl: "https://source.unsplash.com/50x50/?portrait",
      },
      {
        id: "2",
        name: "Mary Green",
        email: "mary@email.com",
        avatarUrl: "https://source.unsplash.com/50x50/?portrait",
      },
      {
        id: "3",
        name: "Mary Green",
        email: "",
        avatarUrl: "https://source.unsplash.com/50x50/?portrait",
      },
    ];
  };

  getPendingFriends = () => {
    return [
      {
        id: "1",
        name: "Mary Green",
        email: "mary@email.com",
        avatarUrl: "https://source.unsplash.com/50x50/?portrait",
      },
      {
        id: "2",
        name: "Mary Green",
        email: "mary@email.com",
        avatarUrl: "https://source.unsplash.com/50x50/?portrait",
      },
      {
        id: "3",
        name: "Mary Green",
        email: "",
        avatarUrl: "https://source.unsplash.com/50x50/?portrait",
      },
    ];
  };

  confirmFriend = (fid: string) => {
    Alert.alert(`Convite de amizade aceito == ${fid}`);
  };

  rejectFriend = (fid: string) => {
    Alert.alert(`Convite de amizade rejeitado == ${fid}`);
  };

  getConfirmedGroups = async () => {
    const confirmedGroupIds = await getUserConfirmedGroupsIds(this.id || "");

    const mapped = await Promise.all(
      confirmedGroupIds.map((gid) => Group.getGroup(gid))
    );
    return mapped;
  };

  getPendingGroups = () => {};

  getFormattedConfirmedGroups = async (): Promise<GroupType[]> => {
    const userGroups = await this.getConfirmedGroups();
    return userGroups
      .filter((group) => group !== undefined)
      .map((group) => {
        const user = group.participants.find((user) => user.id === this.id);
        const friends = group.participants.filter(
          (user) => user.id !== this.id
        );
        return {
          ...group,
          participants: [{ ...(user as UserType), name: "Você" }, ...friends],
        };
      });
  };

  static getInstance = () => {
    if (instance) return instance;
    else {
      instance = new User();
      return instance;
    }
  };
}

export default User.getInstance();
