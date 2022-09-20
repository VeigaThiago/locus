import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { colors, spacings } from "../../ui/tokens";
import FriendItem from "../FriendItem";

interface FriendListProps {
  title?: string;
  data?: { name: string; email: string; avatarUrl: string }[];
}

const FriendList = ({ title, data = [] }: FriendListProps) => (
  <FlatList
    data={data}
    ListHeaderComponent={<Text style={styles.title}>{title}</Text>}
    renderItem={({ item: { name, email, avatarUrl } }) => (
      <FriendItem
        title={name}
        description={email}
        avatarSrc={{ uri: avatarUrl }}
      />
    )}
  />
);

export default FriendList;

const styles = StyleSheet.create({
  title: {
    margin: spacings.x2,
    color: colors.primary,
    fontSize: spacings.x3,
    fontWeight: "600",
  },
});
