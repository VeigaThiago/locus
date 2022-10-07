import { Image, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { convertPercentageToColor } from "../../../utils/color";

interface UserMarkerProps {
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
  onPress: (uid: string) => void;
  isCurrentUser: boolean;
}

const UserMarker = ({ user, onPress, isCurrentUser }: UserMarkerProps) => (
  <Marker
    identifier={user.id}
    coordinate={{
      latitude: parseFloat(user.coords.latitude),
      longitude: parseFloat(user.coords.longitude),
    }}
    title={user.name}
    onPress={() => onPress(user.id)}
  >
    <Image
      source={{ uri: user.photoUrl }}
      style={[
        styles.avatar,
        { borderColor: convertPercentageToColor(user.coords.batteryLevel) },
        isCurrentUser ? styles.selectedStyle : {},
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
  selectedStyle: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },
});

export default UserMarker;
