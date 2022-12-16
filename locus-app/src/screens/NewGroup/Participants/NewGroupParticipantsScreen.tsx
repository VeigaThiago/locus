import * as React from "react";
import { LoggedInStackProps } from "../../../../types";
import NewGroupParticipantsScreenController from "./NewGroupParticipantsScreenController";
import NewGroupParticipantsScreenView from "./NewGroupParticipantsScreenView";

const NewGroupParticipantsScreen = (
  props: LoggedInStackProps<"NewGroupParticipants">
) => {
  return (
    <NewGroupParticipantsScreenController {...props}>
      <NewGroupParticipantsScreenView />
    </NewGroupParticipantsScreenController>
  );
};

export default NewGroupParticipantsScreen;
