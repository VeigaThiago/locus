import * as React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import ErrorBackground from "../../assets/images/background/Error.png";
import { colors, spacings, typography } from "../../ui/tokens";

interface ErrorProps {
  description: string;
}

const Error = ({ description }: ErrorProps) => {
  return (
    <View style={styles.container}>
      <Image source={ErrorBackground} style={styles.background} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: "100%",
  },
  description: {
    ...typography.title,
    color: colors.primary,
    marginHorizontal: spacings.x3,
    textAlign: "center",
  },
});
