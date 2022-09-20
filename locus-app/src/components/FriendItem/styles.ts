import { StyleSheet } from "react-native";
import { colors, spacings } from "../../ui/tokens";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: spacings.x05,
    paddingHorizontal: spacings.x3,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: spacings.x2,
    marginRight: spacings.x3,
  },
  content: {
    justifyContent: "center",
  },
  title: {
    color: colors.black,
    fontSize: spacings.x3,
  },
  description: {
    color: colors.grayLight,
    fontSize: spacings.x2,
  },
});
