import { ReactElement, cloneElement, useEffect, useState } from "react";
import { GroupType } from "../../model/Group";
import User from "../../model/User";

type MapScreenControllerProps = {
  children: ReactElement;
};

const userId = "2";

const user = new User(userId);

const MapScreenController = ({ children }: MapScreenControllerProps) => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  useEffect(() => {
    const saveUserGroups = async () => {
      const fGroups = await user.getFormattedGroups();
      setGroups(fGroups);
    };
    saveUserGroups();
  }, []);

  return cloneElement(children, {
    groups,
  });
};

export default MapScreenController;
