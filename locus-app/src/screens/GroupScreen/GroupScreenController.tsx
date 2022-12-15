import { ReactElement, cloneElement, useState, useEffect } from "react";
import { GroupFriendStackProps } from "../../../types";
import { GroupType } from "../../model/Group";
import User from "../../model/User";

type GroupScreenControllerProps = {
  children: ReactElement;
} & GroupFriendStackProps<"Group">;

const GroupScreenController = ({
  children,
  navigation,
}: GroupScreenControllerProps) => {
  const [groups, setGroups] = useState<{
    confirmedGroups: GroupType[];
    pendingGroups: GroupType[];
  }>({
    confirmedGroups: [],
    pendingGroups: [],
  });
  const fetchGroups = async () => {
    const [confirmedGroups, pendingGroups] = await Promise.all([
      User.getConfirmedGroups(),
      User.getPendingGroups(),
    ]);
    setGroups({ confirmedGroups, pendingGroups });
  };

  // navigation.addListener("focus", () => {
  //   fetchGroups();
  // });

  useEffect(() => {
    fetchGroups();
  }, []);

  const onCreateNewGroupPress = () =>
    navigation.navigate("NewGroupParticipants");

  const onConfirmedGroupPress = (gid: string) => {
    const group = groups.confirmedGroups.find(({ id }) => gid == id);

    if (group) {
      navigation.navigate("GroupView", {
        group,
        status: "confirmed",
      });
    }
  };

  const onPendingGroupPress = (gid: string) => {
    const group = groups.pendingGroups.find(({ id }) => gid == id);

    if (group) {
      navigation.navigate("GroupView", {
        group,
        status: "pending",
      });
    }
  };

  return cloneElement(children, {
    onCreateNewGroupPress,
    confirmedGroups: groups.confirmedGroups,
    pendingGroups: groups.pendingGroups,
    onConfirmedGroupPress,
    onPendingGroupPress,
  });
};

export default GroupScreenController;
