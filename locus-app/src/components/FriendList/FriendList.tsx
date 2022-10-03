import * as React from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { colors, spacings } from "../../ui/tokens";
import FriendItem from "../FriendItem";

interface FriendListProps {
  title?: string;
  data?: { name: string; email: string; avatarUrl: string }[];
  onItemPress?: (id: string) => void;
}

const FriendList = ({
  title,
  data = [],
  onItemPress = () => {},
}: FriendListProps) => (
  <>
    <Text style={styles.title}>{title}</Text>
    {data.map(({ id, name, email, avatarUrl }) => (
      <FriendItem
        onPress={() => onItemPress(id)}
        key={email}
        title={name}
        description={email}
        avatarSrc={{ uri: avatarUrl }}
      />
    ))}
  </>
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
