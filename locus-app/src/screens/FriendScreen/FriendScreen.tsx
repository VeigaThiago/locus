import { Alert } from "react-native";
import FriendScreenView from "./FriendScreenView";

interface FriendScreenProps {}

const FriendScreen = ({}: FriendScreenProps) => {
  const confirmedFriends = [
    // TODO: Fetch
    {
      id: "1",
      name: "Mary Green",
      email: "mary@email.com",
      avatarUrl: "https://source.unsplash.com/50x50/?portrait",
    },
    {
      id: "2",
      name: "Mary Green",
      email: "mary@email.com",
      avatarUrl: "https://source.unsplash.com/50x50/?portrait",
    },
    {
      id: "3",
      name: "Mary Green",
      email: "",
      avatarUrl: "https://source.unsplash.com/50x50/?portrait",
    },
  ];

  const pendingFriends = confirmedFriends;

  const onPendingFriendPress = (fid: string) => {
    Alert.alert(
      "Aceitar amizade?",
      `Deseja aceitar o convite de amizade de ${fid}? Ele poderá lhe convidar para participar de grupos.`,
      [{ text: "Cancelar" }, { text: "Aceitar" }]
    );
  };

  const onConfirmedFriendPress = (fid: string) => {
    Alert.alert(
      "Aceitar amizade?",
      `Deseja aceitar o convite de amizade de ${fid}? Ele poderá lhe convidar para participar de grupos.`,
      [{ text: "Cancelar" }, { text: "Aceitar" }]
    );
  };
  const viewProps = {
    onConfirmedFriendPress,
    pendingFriends,
    confirmedFriends,
    onPendingFriendPress,
  };

  return <FriendScreenView {...viewProps} />;
};

export default FriendScreen;
