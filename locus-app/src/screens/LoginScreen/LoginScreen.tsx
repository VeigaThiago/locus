import { SafeAreaView } from "react-native";
import { RootStackScreenProps } from "../../../types";
import LoginScreenView from "./LoginScreenView";
import styles from "./styles";

const LoginScreen = ({ navigation }: RootStackScreenProps<"LoggedOut">) => {
  const onFaceBookPress = () => navigation.navigate("Root");

  return (
    <SafeAreaView style={styles.screen}>
      <LoginScreenView onFacebookPress={onFaceBookPress} />
    </SafeAreaView>
  );
};

export default LoginScreen;
