import { Alert } from "react-native";
import Group, { GroupType } from "./Group";

export type UserType = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

class User {
  id: string = "";

  constructor(id: string) {
    this.id = id;
  }

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

  getGroups = async () => {
    const userGroups = ["0001", "0002"];
    const mapped = await Promise.all(
      userGroups.map((gid) => Group.getGroup(gid))
    );
    return mapped;
  };

  getFormattedGroups = async (): Promise<GroupType[]> => {
    const userGroups = (await this.getGroups()) as GroupType[];
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
}

export default User;
