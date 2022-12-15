import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  acceptFriendRequest,
  getUserConfirmedFriendsIds,
  getUserConfirmedGroupsIds,
  getUserPendingFriendsIds,
  getUserPendingGroupsIds,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest,
  updateUser,
} from "../services/users";
import Group, { GroupType } from "./Group";
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

  confirmFriend = async (fid: string) => {
    if (this.id) {
      await acceptFriendRequest(this.id, fid);
    }
  };

  rejectFriend = async (fid: string) => {
    if (this.id) {
      await rejectFriendRequest(this.id, fid);
    }
  };

  addFriend = async (fid: string) => {
    if (this.id) {
      await sendFriendRequest(this.id, fid);
    }
  };

  removeFriend = async (fid: string) => {
    if (this.id) {
      await removeFriend(this.id, fid);
    }
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

  update = async ({ name, email }: { name: string; email: string }) => {
    if (this.id) {
      await updateUser({ id: this.id, name, email });
      this.name = name;
      this.email = email;

      return true;
    }
  };

  logout = () => {
    instance = new User();
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
