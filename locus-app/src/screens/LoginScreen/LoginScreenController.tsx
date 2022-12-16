import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ReactElement, cloneElement } from "react";
import { RootStackScreenProps } from "../../../types";
import User from "../../model/User";
import { facebookLogin } from "../../services/Auth";

type LoginScreenControllerProps = {
  children: ReactElement;
} & RootStackScreenProps<"LoggedOut">;

const LoginScreenController = ({
  children,
  navigation,
}: LoginScreenControllerProps) => {
  const onFacebookPress = async () => {
    try {
      const currentUser = await facebookLogin();
      if (currentUser) {
        await User.login(currentUser as FirebaseAuthTypes.User);
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
