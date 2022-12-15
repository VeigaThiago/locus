import { ReactElement, cloneElement, useState } from "react";
import { LoggedInStackProps } from "../../../../types";
import User from "../../../model/User";

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
    const group = User.createGroup(name, participants);
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
