import { Alert } from "react-native";
import FriendScreenController from "./FriendScreenController";
import FriendScreenView from "./FriendScreenView";

interface FriendScreenProps {}

const FriendScreen = ({}: FriendScreenProps) => {
  return (
    <FriendScreenController>
      <FriendScreenView />
    </FriendScreenController>
  );
};

export default FriendScreen;
