import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Text, View, StyleSheet, Image } from "react-native";
import { colors, spacings, typography } from "../../../ui/tokens";
import { convertPercentageToColor } from "../../../utils/color";

interface UserSelectionProps {
  user: {
    id: string;
    name: string;
    photoUrl: string;
    coords: {
      latitude: string;
      longitude: string;
      batteryLevel: number;
      lastUpdate: Date;
    };
  };
}

const UserSelection = ({ user }: UserSelectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>{user.name}</Text>
          <View style={styles.description}>
            <Icon
              size={30}
              name="battery-charging-50"
              color={convertPercentageToColor(user.coords.batteryLevel)}
            />
            <Text style={{ marginLeft: 5, fontSize: 17 }}>
              {Math.floor(user.coords.batteryLevel * 100) + "%"}
            </Text>
          </View>
        </View>
        <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
      </View>
    </View>
  );
};

export default UserSelection;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 1,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: spacings.x05,
    marginHorizontal: spacings.x2,
    marginBottom: spacings.x2,
    paddingHorizontal: spacings.x4,
    paddingVertical: spacings.x4,
  },
  leftContent: {
    justifyContent: "space-between",
  },
  title: {
    ...typography.h4,
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 5,
  },
});
