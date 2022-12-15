import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  ImageSourcePropType,
  Pressable,
  PressableProps,
} from "react-native";
import logo from "../../assets/images/Logo.png";
import { spacings } from "../../ui/tokens";
import styles from "./styles";

interface FriendItemProps {
  title?: string;
  description?: string;
  avatarSrc?: ImageSourcePropType;
  rightDescription?: string;
  rightContent?: {
    rightDescription?: string;
    icon?: {
      type?: string;
      name?: React.ComponentProps<
        typeof FontAwesome | typeof MaterialCommunityIcons
      >["name"];
      color?: string;
      onPress?: () => void;
    };
  };
  onPress?: PressableProps["onPress"];
}

const FriendItem = ({
  avatarSrc = logo,
  title = "",
  description = "",
  rightContent: {
    rightDescription,
    icon: {
      type: iconType = "font-awesome",
      onPress: onIconPress = undefined,
      ...iconProps
    } = {},
  } = {},
  onPress = () => {},
}: FriendItemProps) => {
  const Icon =
    iconType === "material-community" ? MaterialCommunityIcons : FontAwesome;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={avatarSrc} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={styles.rightContent}>
        {rightDescription && (
          <Text style={styles.rightDescription}>{rightDescription}</Text>
        )}
        {iconProps && (
          <Pressable
            onPress={onIconPress}
            hitSlop={spacings.x1}
            style={{ marginLeft: spacings.x2 }}
          >
            <Icon size={20} {...iconProps} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default FriendItem;
