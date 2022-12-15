import {
  ReactElement,
  cloneElement,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Alert } from "react-native";
import { GroupFriendStackProps } from "../../../types";
import User, { UserType } from "../../model/User";

type FriendScreenControllerProps = {
  children: ReactElement;
} & GroupFriendStackProps<"Friend">;

const FriendScreenController = ({
  children,
  navigation,
}: FriendScreenControllerProps) => {
  const [friends, setFriends] = useState<{
    confirmedFriends: UserType[];
    pendingFriends: UserType[];
  }>({
    confirmedFriends: [],
    pendingFriends: [],
  });

  useEffect(() => {
    const fetchFriends = async () => {
      const [confirmedFriends, pendingFriends] = await Promise.all([
        User.getConfirmedFriends(),
        User.getPendingFriends(),
      ]);
      setFriends({ confirmedFriends, pendingFriends });
    };
    fetchFriends();
  }, []);

  const onPendingFriendPress = (fid: string) => {
    Alert.alert(
      "Aceitar amizade?",
      `Deseja aceitar o convite de amizade de ${
        friends.pendingFriends.find(({ id }) => (id = fid))?.name
      }? Ele poderá lhe convidar para participar de grupos.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Aceitar",
          style: "default",
          onPress: () => User.confirmFriend(fid),
        },
        {
          text: "Rejeitar",
          style: "destructive",
          onPress: () => User.rejectFriend(fid),
        },
      ]
    );
  };

  const onConfirmedFriendPress = (fid: string) => {};

  const onAddNewFriendPress = () => navigation.navigate("AddFriend");

  return cloneElement(children, {
    onConfirmedFriendPress,
    pendingFriends: friends.pendingFriends,
    confirmedFriends: friends.confirmedFriends,
    onPendingFriendPress,
    onAddNewFriendPress,
  });
};

export default FriendScreenController;
