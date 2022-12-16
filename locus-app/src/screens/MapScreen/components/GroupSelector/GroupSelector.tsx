import { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { colors, spacings, typography } from "../../../../ui/tokens";
import { Friend } from "./components";
import GroupIcon from "../../../../assets/images/Group.png";

interface GroupSelectorProps {
  name: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  participants: { id: string; name: string; avatarUrl: string }[];
  onUserPress?: (uid: string) => void;
}

const GroupSelector = ({
  name,
  onLeftPress,
  onRightPress,
  participants,
  onUserPress = () => {},
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
        <ScrollView
          horizontal
          style={styles.collapse}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <Friend
            title={"Todos"}
            avatarSrc={GroupIcon}
            onPress={() => onUserPress("")}
          />
          {participants.map((item) => (
            <Friend
              key={item.id}
              title={item.name.split(" ")[0]}
              avatarSrc={{ uri: item.avatarUrl }}
              onPress={() => onUserPress(item.id)}
            />
          ))}
        </ScrollView>
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
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 1,
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
