import {
  ReactElement,
  cloneElement,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Alert } from "react-native";
import { LoggedInStackProps } from "../../../../types";
import User, { UserType } from "../../../model/User";

type NewGroupParticipantsScreenControllerProps = {
  children: ReactElement;
} & LoggedInStackProps<"NewGroupParticipants">;

const NewGroupParticipantsScreenController = ({
  children,
  navigation,
  route,
}: NewGroupParticipantsScreenControllerProps) => {
  const [friends, setFriends] = useState<UserType[]>([]);
  const [selectedFriendsIds, setSelectedFriendsIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedFriends = useMemo(
    () => friends?.filter(({ id }) => selectedFriendsIds?.includes(id)),
    [friends, selectedFriendsIds]
  );

  useEffect(() => {
    const fetchFriends = async () => {
      setFriends(await User.getConfirmedFriends());
      setLoading(false);
    };
    fetchFriends();
  }, []);

  const toggleFriend = (action: "remove" | "add", fid: string) => {
    switch (action) {
      case "add":
        setSelectedFriendsIds(selectedFriendsIds.concat([fid]));
        break;
      case "remove":
      default:
        setSelectedFriendsIds(selectedFriendsIds.filter((id) => !(fid === id)));
        break;
    }
  };

  const onFriendPress = (fid: string) => {
    const action = selectedFriendsIds.includes(fid) ? "remove" : "add";
    toggleFriend(action, fid);
  };

  const onNextPress = () => {
    navigation.navigate("NewGroupName", {
      participants: selectedFriends,
    });
  };

  return cloneElement(children, {
    selectedFriends,
    selectedFriendsIds,
    friends,
    onFriendPress,
    loading,
    onNextPress,
  });
};

export default NewGroupParticipantsScreenController;
