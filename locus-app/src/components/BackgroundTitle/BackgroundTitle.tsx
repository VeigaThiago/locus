import { Octicons as Icon } from "@expo/vector-icons";
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
  iconName?: React.ComponentProps<typeof Icon>["name"];
}

const BackgroundTitle = ({
  backgroundSrc,
  title,
  iconName,
}: BackgroundTitleProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundSrc} style={styles.background}>
        <View style={styles.titleContainer}>
          {iconName && (
            <Icon
              size={40}
              name={iconName}
              color={colors.primary}
              style={styles.icon}
            />
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
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
  icon: {
    marginHorizontal: spacings.x1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: spacings.x3,
    marginBottom: spacings.x3,
  },
  title: {
    color: colors.primary,
    ...typography.pageTitle,
  },
});
