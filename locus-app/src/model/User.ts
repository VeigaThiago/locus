import { Alert } from "react-native";
import Group from "./Group";

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

  getGroups = () => {
    const userGroups = ["0001", "0002"];

    return userGroups.map((gid) => Group.getGroup(gid));
  };

  getFormattedGroups = () =>
    this.getGroups().map((group) => {
      const user = group.participants.find((user) => user.id === this.id);
      const friends = group.participants.filter((user) => user.id !== this.id);
      return {
        ...group,
        participants: [{ ...user, name: "Você" }, ...friends],
      };
    });
}

export default User;
