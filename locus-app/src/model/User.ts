import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import {
  getUserConfirmedFriendsIds,
  getUserConfirmedGroupsIds,
  getUserPendingFriendsIds,
  getUserPendingGroupsIds,
} from "../services/users";
import Group, { GroupType } from "./Group";
import Groups from "./Groups";
import Users from "./Users";

let instance: User;

export type UserType = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  coords?: {
    latitude: string;
    longitude: string;
  };
  battery?: {
    level: number;
    charging: boolean;
  };
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

  me = async () => {
    return Users.getUser(this.id || "");
  };

  getFriends = async () => {
    const [confirmed, pending] = await Promise.all([
      this.getConfirmedFriends(),
      this.getPendingFriends(),
    ]);
    return [...confirmed, ...pending];
  };

  getConfirmedFriends = async (): Promise<UserType[]> => {
    const confirmedGroupsIds = await getUserConfirmedFriendsIds(this.id || "");

    const mapped = await Promise.all(
      confirmedGroupsIds.map((gid) => Users.getUser(gid))
    );
    return mapped;
  };

  getPendingFriends = async (): Promise<UserType[]> => {
    const pendingFriendsIds = await getUserPendingFriendsIds(this.id || "");

    const mapped = await Promise.all(
      pendingFriendsIds.map((gid) => Users.getUser(gid))
    );
    return mapped;
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

  getPendingGroups = async (): Promise<GroupType[]> => {
    const pendingGroupIds = await getUserPendingGroupsIds(this.id || "");
    const mapped = await Promise.all(
      pendingGroupIds.map((gid) => Group.getGroup(gid))
    );
    return mapped;
  };

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
