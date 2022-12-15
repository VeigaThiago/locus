import * as React from "react";
import { RootTabScreenProps } from "../../../types";
import SettingsScreenController from "./SettingsScreenController";
import SettingsScreenView from "./SettingsScreenView";

const SettingsScreen = (props: RootTabScreenProps<"Settings">) => {
  return (
    <SettingsScreenController {...props}>
      <SettingsScreenView />
    </SettingsScreenController>
  );
};

export default SettingsScreen;
