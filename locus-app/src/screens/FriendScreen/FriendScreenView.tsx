import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { FriendList } from "../../components";
import { colors } from "../../ui/tokens";

interface FriendScreenViewProps {}

const FriendScreenView = (props: FriendScreenViewProps) => {
  const confirmedFriends = [
    {
      name: "Mary Green",
      email: "mary@email.com",
      avatarUrl:
        "https://i.pinimg.com/originals/1d/4d/69/1d4d69c694c8ba1034c0e9552f457ecf.jpg",
    },
    {
      name: "Mary Green",
      email: "mary@email.com",
      avatarUrl:
        "https://i.pinimg.com/originals/1d/4d/69/1d4d69c694c8ba1034c0e9552f457ecf.jpg",
    },
  ];
  const pendingFriends = confirmedFriends;
  return (
    <View style={styles.container}>
      <ScrollView>
        <FriendList title={"Confirmados"} data={confirmedFriends} />
        <FriendList title={"Pendentes"} data={pendingFriends} />
      </ScrollView>
    </View>
  );
};

export default FriendScreenView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
