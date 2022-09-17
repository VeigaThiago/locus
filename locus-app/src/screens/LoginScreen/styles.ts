import { StyleSheet } from "react-native";
import { colors, spacings } from "../../ui/tokens";

export default StyleSheet.create({
  screen: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacings.x6,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 240,
    width: 240,
  },
});
