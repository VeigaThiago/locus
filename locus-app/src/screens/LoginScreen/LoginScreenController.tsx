import { ReactElement, cloneElement, useMemo } from "react";
import { RootStackScreenProps } from "../../../types";
import User from "../../model/User";
import Users from "../../model/Users";
import { facebookLogin } from "../../services/Auth";

type LoginScreenControllerProps = {
  children: ReactElement;
} & RootStackScreenProps<"LoggedOut">;

const LoginScreenController = ({
  children,
  navigation,
}: LoginScreenControllerProps) => {
  const onFacebookPress = async () => {
    console.log("Called2");
    try {
      const currentUser = await facebookLogin();
      if (currentUser) {
        await Users.createUser(currentUser);
        navigation.navigate("LoggedIn");
      }
    } catch (err) {
      // TODO: erro ao logar
    }
  };

  return cloneElement(children, {
    onFacebookPress,
  });
};

export default LoginScreenController;
