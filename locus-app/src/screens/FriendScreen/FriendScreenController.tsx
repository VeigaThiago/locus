import { ReactElement, cloneElement, useMemo } from "react";
import { Alert } from "react-native";
import { GroupFriendStackProps } from "../../../types";
import User from "../../model/User";

type FriendScreenControllerProps = {
  children: ReactElement;
} & GroupFriendStackProps<"Friend">;

const FriendScreenController = ({
  children,
  navigation,
}: FriendScreenControllerProps) => {
  const confirmedFriends = useMemo(() => User.getConfirmedFriends(), [User]);
  const pendingFriends = useMemo(() => User.getPendingFriends(), [User]);

  const onPendingFriendPress = (fid: string) => {
    Alert.alert(
      "Aceitar amizade?",
      `Deseja aceitar o convite de amizade de ${
        pendingFriends.find(({ id }) => (id = fid))?.name
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
    pendingFriends,
    confirmedFriends,
    onPendingFriendPress,
    onAddNewFriendPress,
  });
};

export default FriendScreenController;
