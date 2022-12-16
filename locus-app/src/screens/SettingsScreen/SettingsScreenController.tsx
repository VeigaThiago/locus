import { ReactElement, cloneElement } from "react";

import { RootTabScreenProps } from "../../../types";
import User from "../../model/User";

type SettingsScreenControllerProps = {
  children: ReactElement;
} & RootTabScreenProps<"Settings">;

const SettingsScreenController = ({
  children,
  navigation,
}: SettingsScreenControllerProps) => {
  const onLogoutPress = () => {
    User.logout();
    navigation.navigate("LoggedOut");
  };

  return cloneElement(children, {
    onLogoutPress,
  });
};

export default SettingsScreenController;
