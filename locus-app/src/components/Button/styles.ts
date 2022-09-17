import { StyleSheet } from "react-native";
import { colors, spacings, typography } from "../../ui/tokens";

export default StyleSheet.create({
  container: {
    paddingVertical: spacings.x3,
    paddingHorizontal: spacings.x4,
    borderRadius: spacings.x1,
    alignItems: "center",
    textAlign: "center",

    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  text: {
    ...typography.body,
  },
});
