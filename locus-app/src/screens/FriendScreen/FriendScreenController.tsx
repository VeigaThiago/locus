import { ReactElement, cloneElement, useMemo } from "react";
import { Alert } from "react-native";
import User from "../../model/User";

type FriendScreenControllerProps = {
  children: ReactElement;
};

const user = new User("1");

const FriendScreenController = ({ children }: FriendScreenControllerProps) => {
  const confirmedFriends = useMemo(() => user.getConfirmedFriends(), [user]);
  const pendingFriends = useMemo(() => user.getPendingFriends(), [user]);

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
          onPress: () => user.confirmFriend(fid),
        },
        {
          text: "Rejeitar",
          style: "destructive",
          onPress: () => user.rejectFriend(fid),
        },
      ]
    );
  };

  const onConfirmedFriendPress = (fid: string) => {};

  return cloneElement(children, {
    onConfirmedFriendPress,
    pendingFriends,
    confirmedFriends,
    onPendingFriendPress,
  });
};

export default FriendScreenController;
