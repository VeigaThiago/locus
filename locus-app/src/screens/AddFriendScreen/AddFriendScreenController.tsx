import { ReactElement, cloneElement, useState } from "react";
import { Alert } from "react-native";

import { LoggedInStackProps } from "../../../types";
import { UserType } from "../../model/User";
import Users from "../../model/Users";

type AddFriendScreenControllerProps = {
  children: ReactElement;
} & LoggedInStackProps<"AddFriend">;

const AddFriendScreenController = ({
  children,
  navigation,
}: AddFriendScreenControllerProps) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [hasSearchError, setHasSearchError] = useState<boolean>(false);

  const searchFriend = async (searchTerm: string) => {
    const findUsers = await Users.fetchUsers(searchTerm);
    if (findUsers && findUsers.length) {
      //TODO: Filter friends and yourself
      setUsers(findUsers);
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
