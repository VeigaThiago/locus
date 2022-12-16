import * as React from "react";
import { GroupFriendStackProps } from "../../../types";
import GroupScreenController from "./GroupScreenController";
import GroupScreenView from "./GroupScreenView";

const GroupScreen = (props: GroupFriendStackProps<"Group">) => {
  return (
    <GroupScreenController {...props}>
      <GroupScreenView />
    </GroupScreenController>
  );
};

export default GroupScreen;
