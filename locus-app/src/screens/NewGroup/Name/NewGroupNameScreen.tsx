import * as React from "react";
import { LoggedInStackProps } from "../../../../types";
import NewGroupNameScreenController from "./NewGroupNameScreenController";
import NewGroupNameScreenView from "./NewGroupNameScreenView";

const NewGroupNameScreen = (props: LoggedInStackProps<"NewGroupName">) => {
  return (
    <NewGroupNameScreenController {...props}>
      <NewGroupNameScreenView />
    </NewGroupNameScreenController>
  );
};

export default NewGroupNameScreen;
