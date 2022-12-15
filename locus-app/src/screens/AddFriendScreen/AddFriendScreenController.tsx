import { ReactElement, cloneElement, useState } from "react";
import { Alert } from "react-native";

import { LoggedInStackProps } from "../../../types";
import User, { UserType } from "../../model/User";
import Users from "../../model/Users";

type AddFriendScreenControllerProps = {
  children: ReactElement;
} & LoggedInStackProps<"AddFriend">;

const filterUsers = (users: UserType[], friends: UserType[], me: UserType) =>
  users.filter(({ id: uId }) => {
    return ![...friends.map(({ id: fId }) => fId), me.id].includes(uId);
  });

const AddFriendScreenController = ({
  children,
  navigation,
}: AddFriendScreenControllerProps) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [hasSearchError, setHasSearchError] = useState<boolean>(false);

  const searchFriend = async (searchTerm: string) => {
    if (!searchFriend) return;
    const [findUsers, friends, me] = await Promise.all([
      Users.fetchUsers(searchTerm),
      User.getFriends(),
      User.me(),
    ]);
    if (findUsers && findUsers.length) {
      const filteredUsers = filterUsers(findUsers as UserType[], friends, me);
      setUsers(filteredUsers);
    } else {
      setHasSearchError(true);
    }
  };

  const addFriend = (user: UserType) => {
    Alert.alert(
      "Adicionar como amigo",
      `Deseja adicionar ${user.name} como amigo?`,
      [
        {
          text: "Sim",
          style: "default",
          onPress: () => {
            //TODO:
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  return cloneElement(children, {
    searchFriend,
    users,
    hasSearchError,
    addFriend,
  });
};

export default AddFriendScreenController;
