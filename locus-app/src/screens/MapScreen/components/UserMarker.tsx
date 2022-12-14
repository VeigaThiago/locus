import { Image, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { UserType } from "../../../model/User";
import { convertPercentageToColor } from "../../../utils/color";

interface UserMarkerProps {
  user: UserType;
  onPress: (uid: string) => void;
  isCurrentUser: boolean;
}

const UserMarker = ({ user, onPress, isCurrentUser }: UserMarkerProps) => (
  <Marker
    tracksViewChanges
    identifier={user.id}
    coordinate={{
      latitude: parseFloat(user?.coords?.latitude || "0"),
      longitude: parseFloat(user?.coords?.longitude || "0"),
    }}
    title={user.name}
    onPress={() => onPress(user.id)}
  >
    <Image
      source={{ uri: user.avatarUrl }}
      style={[
        styles.avatar,
        { borderColor: convertPercentageToColor(user?.battery?.level || 1) },
      ]}
    />
  </Marker>
);

const styles = StyleSheet.create({
  markerContainer: {},
  avatar: {
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
});

export default UserMarker;
