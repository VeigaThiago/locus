import { LoggedInStackProps } from "../../../types";
import AddFriendScreenController from "./AddFriendScreenController";
import AddFriendScreenView from "./AddFriendScreenView";

const FriendScreen = (props: LoggedInStackProps<"AddFriend">) => {
  return (
    <AddFriendScreenController {...props}>
      <AddFriendScreenView />
    </AddFriendScreenController>
  );
};

export default FriendScreen;
