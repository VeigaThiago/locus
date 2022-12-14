import { ReactElement, cloneElement, useMemo } from "react";
import { Alert } from "react-native";
import { GroupFriendStackProps } from "../../../types";
import User from "../../model/User";

type GroupScreenControllerProps = {
  children: ReactElement;
} & GroupFriendStackProps<"Friend">;

const user = new User("1");

const GroupScreenController = ({
  children,
  navigation,
}: GroupScreenControllerProps) => {
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

  const onAddNewFriendPress = () => navigation.navigate("AddFriend");

  return cloneElement(children, {
    onConfirmedFriendPress,
    pendingFriends,
    confirmedFriends,
    onPendingFriendPress,
    onAddNewFriendPress,
  });
};

export default GroupScreenController;
