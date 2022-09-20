import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface GroupScreenViewProps {}

const GroupScreenView = (props: GroupScreenViewProps) => {
  return (
    <View style={styles.container}>
      <Text>GroupScreenView</Text>
    </View>
  );
};

export default GroupScreenView;

const styles = StyleSheet.create({
  container: {},
});
