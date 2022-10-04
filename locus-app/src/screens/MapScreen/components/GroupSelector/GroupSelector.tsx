import { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Animated,
  FlatList,
  Alert,
  Easing,
} from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { colors, spacings, typography } from "../../../../ui/tokens";
import { FriendItem } from "../../../../components";
import { Friend } from "./components";

interface GroupSelectorProps {
  name: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  participants: { id: string; name: string; photoUrl: string }[];
}

const GroupSelector = ({
  name,
  onLeftPress,
  onRightPress,
  participants,
}: GroupSelectorProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapsedHeight = useRef(new Animated.Value(0)).current;

  const _toggleCollapsed = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    const toValue = isCollapsed ? 1 : 0;
    Animated.timing(collapsedHeight, {
      toValue,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  }, [isCollapsed]);

  const maxHeight = collapsedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 70],
  });

  return (
    <View style={styles.container}>
      <View style={styles.groupChooser}>
        <Pressable onPress={onLeftPress} hitSlop={15}>
          <Icon name="arrow-left" size={17} color={colors.primary} />
        </Pressable>
        <Text style={styles.groupName}>{name}</Text>
        <Pressable onPress={onRightPress} hitSlop={15}>
          <Icon name="arrow-right" size={17} color={colors.primary} />
        </Pressable>
      </View>
      <Animated.View style={{ maxHeight }}>
        <FlatList
          horizontal
          style={styles.collapse}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          data={participants}
          renderItem={({ item }) => (
            <Friend
              title={item.name.split(" ")[0]}
              avatarSrc={{ uri: item.photoUrl }}
              onPress={() => Alert.alert(`Chamou ${item.id}`)}
            />
          )}
        />
      </Animated.View>
      <View style={{ alignItems: "center" }}>
        <Pressable
          style={styles.collapseButton}
          onPress={_toggleCollapsed}
          hitSlop={15}
        >
          <Icon
            name={`arrow-${isCollapsed ? "up" : "down"}`}
            size={17}
            color={colors.primary}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default GroupSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 15,
    zIndex: 2,
    width: "100%",
    position: "absolute",
  },
  collapseButton: {
    padding: spacings.x1,
  },
  collapse: {
    marginBottom: spacings.x2,
  },
  groupChooser: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupName: {
    ...typography.title,
    color: colors.primary,
  },
});
