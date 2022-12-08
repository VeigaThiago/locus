import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Text,
  ImageBackground,
} from "react-native";
import { colors, spacings, typography } from "../../ui/tokens";

interface BackgroundTitleProps {
  backgroundSrc: ImageSourcePropType;
  title: string;
}

const BackgroundTitle = ({ backgroundSrc, title }: BackgroundTitleProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundSrc} style={styles.background}>
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </View>
  );
};

export default BackgroundTitle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    color: colors.primary,
    ...typography.pageTitle,
    marginLeft: spacings.x3,
    marginBottom: spacings.x3,
    textDecorationLine: "underline",
  },
});
