import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

import { Text, View, StyleSheet, Image } from "react-native";
import { UserType } from "../../../model/User";
import { colors, spacings, typography } from "../../../ui/tokens";
import { convertPercentageToColor } from "../../../utils/color";

interface UserSelectionProps {
  user: UserType;
}

const UserSelection = ({ user }: UserSelectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View>
            <Text style={styles.title}>{user.name}</Text>
            <View style={styles.description}>
              <Icon
                size={30}
                name={`battery${user.battery.charging ? "-charging" : ""}-50`}
                color={convertPercentageToColor(user.battery.level)}
              />
              <Text style={{ marginLeft: 5, fontSize: 15 }}>
                {Math.floor(user.battery.level * 100) + "%"}
              </Text>
            </View>
          </View>
          <Text style={styles.updateText}>
            Última atualização há {moment(user.lastUpdate).fromNow()}
          </Text>
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
    paddingHorizontal: spacings.x3,
    paddingVertical: spacings.x3,
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
  updateText: {
    ...typography.p,
    color: colors.gray,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 5,
  },
});
