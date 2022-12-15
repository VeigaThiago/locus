import { StyleSheet } from "react-native";
import { colors, spacings } from "../../ui/tokens";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: spacings.x05,
    paddingHorizontal: spacings.x3,
    alignItems: "center",
    marginBottom: spacings.x1,
  },
  icon: {
    marginRight: spacings.x3,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: colors.black,
    fontSize: spacings.x3,
    fontWeight: "600",
  },
  description: {
    color: colors.grayLight,
    fontSize: spacings.x2,
  },
});
