import { ReactElement, cloneElement, useEffect, useState } from "react";
import { GroupType } from "../../model/Group";
import User from "../../model/User";

type MapScreenControllerProps = {
  children: ReactElement;
};

const MapScreenController = ({ children }: MapScreenControllerProps) => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getGroups = async () => {
    const fGroups = await User.getFormattedConfirmedGroups();
    setGroups(fGroups);
    setLoading(false);
  };

  useEffect(() => {
    getGroups();
  }, []);

  return cloneElement(children, {
    loading,
    groups,
  });
};

export default MapScreenController;
