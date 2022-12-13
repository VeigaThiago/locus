import {
  ReactElement,
  cloneElement,
  useMemo,
  useState,
  useEffect,
} from "react";
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
      setUsers(findUsers);
    } else {
      setHasSearchError(true);
    }
  };

  return cloneElement(children, {
    searchFriend,
    users,
    hasSearchError,
  });
};

export default AddFriendScreenController;
