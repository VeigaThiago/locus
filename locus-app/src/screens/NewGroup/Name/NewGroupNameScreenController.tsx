import { ReactElement, cloneElement, useState } from "react";
import { LoggedInStackProps } from "../../../../types";
import Group from "../../../model/Group";

type NewGroupNameScreenControllerProps = {
  children: ReactElement;
} & LoggedInStackProps<"NewGroupName">;

const NewGroupNameScreenController = ({
  children,
  navigation,
  route,
}: NewGroupNameScreenControllerProps) => {
  const participants = route.params.participants;
  const [name, setName] = useState("");
  const onChangeName = setName;

  const onCreateGroupPress = () => {
    const group = Group.createGroup(name, participants);
    //TODO: Navigate to GroupView
    navigation.navigate("Root");
  };

  return cloneElement(children, {
    name,
    onChangeName,
    participants,
    onCreateGroupPress,
  });
};

export default NewGroupNameScreenController;
