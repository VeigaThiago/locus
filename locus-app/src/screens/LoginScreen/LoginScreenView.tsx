import { View, Image, SafeAreaView } from "react-native";
import { Button } from "@react-native-material/core";
import logo from "../../assets/images/Logo.png";
import { colors } from "../../ui/tokens";
import styles from "./styles";

type LoginScreenViewProps = {
  onFacebookPress?: () => void;
  onGooglePress?: () => void;
};

const LoginScreenView = ({
  onFacebookPress = () => {},
  onGooglePress = () => {},
}: LoginScreenViewProps) => (
  <SafeAreaView style={styles.screen}>
    <View style={styles.imageContainer}>
      <Image source={logo} style={styles.image} />
    </View>
    <View style={styles.buttonsContainer}>
      <Button
        onPress={onFacebookPress}
        style={styles.faceBookButton}
        color={colors.faceBook}
        title={"Login com Facebook"}
        uppercase={false}
      />
      <Button
        onPress={onGooglePress}
        color={colors.google}
        tintColor={colors.white}
        title={"Login com Google"}
        uppercase={false}
      />
    </View>
  </SafeAreaView>
);

export default LoginScreenView;
