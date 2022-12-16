import { FontAwesome as Icon } from "@expo/vector-icons";
import { Text, View, Pressable, PressableProps } from "react-native";
import { colors } from "../../ui/tokens";
import styles from "./styles";

interface GroupItemProps {
  title?: string;
  description?: string;
  onPress?: PressableProps["onPress"];
}

const GroupItem = ({
  title = "",
  description = "",
  onPress = () => {},
}: GroupItemProps) => (
  <Pressable onPress={onPress} style={styles.container}>
    <Icon size={25} name="group" color={colors.primary} style={styles.icon} />
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  </Pressable>
);

export default GroupItem;
