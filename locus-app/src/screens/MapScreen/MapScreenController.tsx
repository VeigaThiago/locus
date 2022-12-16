import { ReactElement, cloneElement, useEffect, useState } from "react";
import { RootTabScreenProps } from "../../../types";
import { GroupType } from "../../model/Group";
import User from "../../model/User";

type MapScreenControllerProps = {
  children: ReactElement;
} & RootTabScreenProps<"Map">;

const MapScreenController = ({
  navigation,
  children,
}: MapScreenControllerProps) => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getGroups = async () => {
    const fGroups = await User.getFormattedConfirmedGroups();
    setGroups(fGroups);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      User.updateLocation();
      getGroups();
    });

    getGroups();

    return () => {
      unsubscribe();
    };
  }, []);

  return cloneElement(children, {
    loading,
    groups,
  });
};

export default MapScreenController;
