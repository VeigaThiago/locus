import * as React from "react";
import { LoggedInStackProps } from "../../../types";
import GroupViewScreenController from "./GroupViewScreenController";
import GroupViewScreenView from "./GroupViewScreenView";

const GroupScreen = (props: LoggedInStackProps<"GroupView">) => {
  return (
    <GroupViewScreenController {...props}>
      <GroupViewScreenView />
    </GroupViewScreenController>
  );
};

export default GroupScreen;
