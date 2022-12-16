import { ReactElement, cloneElement, useState, useMemo } from "react";

import { RootTabScreenProps } from "../../../types";
import User from "../../model/User";

type ProfileScreenControllerProps = {
  children: ReactElement;
} & RootTabScreenProps<"Profile">;

const ProfileScreenController = ({
  children,
}: ProfileScreenControllerProps) => {
  const [name, setName] = useState<string>(User?.name || "");
  const [email, setEmail] = useState<string>(User?.email || "");
  const [databaseName, setDatabaseName] = useState<string>(User?.name || "");
  const onSavePress = () => {
    User.update({
      name,
      email,
    }).then(async () => {
      const user = await User.me();
      setName(user.name);
      setDatabaseName(user.name);
      setEmail(user.email);
    });
  };

  const onChangeName = setName;
  const onChangeEmail = setEmail;

  const canSave = useMemo(
    () => name !== User.name || email !== User.email,
    [name, email, User.name, User.email]
  );

  return cloneElement(children, {
    user: {
      name,
      databaseName,
      email,
      avatarUrl: User.avatarUrl,
    },
    onChangeName,
    onChangeEmail,
    onSavePress,
    canSave,
  });
};

export default ProfileScreenController;
