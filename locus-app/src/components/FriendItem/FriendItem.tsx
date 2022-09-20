import * as React from "react";
import { Text, View, Image, ImageSourcePropType } from "react-native";
import logo from "../../assets/images/Logo.png";
import styles from "./styles";

interface FriendItemProps {
  title?: string;
  description?: string;
  avatarSrc?: ImageSourcePropType;
}

const FriendItem = ({
  avatarSrc = logo,
  title = "",
  description = "",
}: FriendItemProps) => (
  <View style={styles.container}>
    <Image source={avatarSrc} style={styles.avatar} />
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

export default FriendItem;
