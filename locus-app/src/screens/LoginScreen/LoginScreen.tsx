import { SafeAreaView } from "react-native";
import { RootStackScreenProps } from "../../../types";
import LoginScreenView from "./LoginScreenView";
import styles from "./styles";

const LoginScreen = ({ navigation }: RootStackScreenProps<"LoggedOut">) => {
  const onFaceBookPress = () => navigation.navigate("Root");

  return <LoginScreenView onFacebookPress={onFaceBookPress} />;
};

export default LoginScreen;
