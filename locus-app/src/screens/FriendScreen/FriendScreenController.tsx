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

  const fetchFriends = async () => {
    const [confirmedFriends, pendingFriends] = await Promise.all([
      User.getConfirmedFriends(),
      User.getPendingFriends(),
    ]);
    setFriends({ confirmedFriends, pendingFriends });
  };

  useEffect(() => {
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
          onPress: () => User.confirmFriend(fid).then(() => fetchFriends()),
        },
        {
          text: "Rejeitar",
          style: "destructive",
          onPress: () => User.rejectFriend(fid).then(() => fetchFriends()),
        },
      ]
    );
  };

  const onConfirmedFriendPress = (fid: string) => {
    Alert.alert(
      "Remover amigo",
      `Deseja remover ${
        friends.pendingFriends.find(({ id }) => (id = fid))?.name
      } da sua lista de amigos? Vocês não poderão mais adicionar um no grupo do outro.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => User.removeFriend(fid).then(() => fetchFriends()),
        },
      ]
    );
  };

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
