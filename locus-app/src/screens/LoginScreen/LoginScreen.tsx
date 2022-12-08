import { RootStackScreenProps } from "../../../types";
import LoginScreenView from "./LoginScreenView";

const LoginScreen = ({ navigation }: RootStackScreenProps<"LoggedOut">) => {
  const onFaceBookPress = () => navigation.navigate("LoggedIn");

  return <LoginScreenView onFacebookPress={onFaceBookPress} />;
};

export default LoginScreen;
