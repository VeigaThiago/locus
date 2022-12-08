import { GroupFriendStackProps } from "../../../types";
import FriendScreenController from "./FriendScreenController";
import FriendScreenView from "./FriendScreenView";

const FriendScreen = (props: GroupFriendStackProps<"Friend">) => {
  return (
    <FriendScreenController {...props}>
      <FriendScreenView />
    </FriendScreenController>
  );
};

export default FriendScreen;
