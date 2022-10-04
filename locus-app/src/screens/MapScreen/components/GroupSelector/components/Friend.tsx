import {
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { colors, spacings, typography } from "../../../../../ui/tokens";
import logo from "../../../../../assets/images/Logo.png";

interface FriendProps {
  title: string;
  avatarSrc?: ImageSourcePropType;
  onPress?: () => void;
}

const Friend = ({ title, avatarSrc = logo, onPress }: FriendProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={avatarSrc} style={styles.avatar} />
      <Text ellipsizeMode="tail" style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Friend;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: spacings.x2,
    maxWidth: 75,
  },
  title: {
    ...typography.pBold,
    color: colors.gray,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: spacings.x2,
    marginBottom: spacings.x05,
  },
});
