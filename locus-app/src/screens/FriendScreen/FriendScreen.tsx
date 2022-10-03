import { Alert } from "react-native";
import FriendScreenView from "./FriendScreenView";

interface FriendScreenProps {}

const FriendScreen = ({}: FriendScreenProps) => {
  const confirmedFriends = [
    {
      id: "1",
      name: "Mary Green",
      email: "mary@email.com",
      avatarUrl:
        "https://i.pinimg.com/originals/1d/4d/69/1d4d69c694c8ba1034c0e9552f457ecf.jpg",
    },
    {
      id: "2",
      name: "Mary Green",
      email: "mary@email.com",
      avatarUrl:
        "https://i.pinimg.com/originals/1d/4d/69/1d4d69c694c8ba1034c0e9552f457ecf.jpg",
    },
    {
      id: "3",
      name: "Mary Green",
      email: "",
      avatarUrl:
        "https://i.pinimg.com/originals/1d/4d/69/1d4d69c694c8ba1034c0e9552f457ecf.jpg",
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
