import { ReactElement, cloneElement, useMemo } from "react";
import User from "../../model/User";

type MapScreenControllerProps = {
  children: ReactElement;
};

const userId = "2";

const user = new User(userId);

const MapScreenController = ({ children }: MapScreenControllerProps) => {
  const groups = user.getFormattedGroups();

  console.log(groups);
  return cloneElement(children, {
    groups,
  });
};

export default MapScreenController;
