import { StyleSheet } from "react-native";
import { colors, spacings } from "../../ui/tokens";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: spacings.x05,
    paddingHorizontal: spacings.x3,
    alignItems: "center",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: spacings.x2,
    marginRight: spacings.x3,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  rightContent: {
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    color: colors.black,
    fontSize: spacings.x3,
  },
  description: {
    color: colors.grayLight,
    fontSize: spacings.x2,
  },
  rightDescription: {
    color: colors.grayLight,
    fontSize: spacings.x2,
  },
});
