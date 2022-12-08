import { ReactElement, cloneElement, useMemo } from "react";
import { Alert } from "react-native";
import { LoggedInStackProps } from "../../../types";

type AddFriendScreenControllerProps = {
  children: ReactElement;
} & LoggedInStackProps<"AddFriend">;

const AddFriendScreenController = ({
  children,
  navigation,
}: AddFriendScreenControllerProps) => {
  const searchFriend = (searchTerm: string) => {
    Alert.alert("termo da pesquisa", searchTerm);
  };

  return cloneElement(children, {
    searchFriend,
  });
};

export default AddFriendScreenController;
