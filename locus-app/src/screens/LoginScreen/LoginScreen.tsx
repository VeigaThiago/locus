import { View, Image, SafeAreaView } from "react-native";
import { Button } from "../../components";
import logo from "../../assets/images/Logo.png";
import { spacings } from "../../ui/tokens";
import styles from "./styles";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button variant="faceBook" disabled mb={spacings.x3}>
          Login com Facebook
        </Button>
        <Button variant="google">Login com Google</Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
