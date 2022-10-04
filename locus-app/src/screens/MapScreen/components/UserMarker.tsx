import { forwardRef, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { colors } from "../../../ui/tokens";

interface UserMarkerProps {
  user: {
    id: string;
    name: string;
    photoUrl: string;
    coords: {
      latitude: string;
      longitude: string;
    };
  };
}

const UserMarker = ({ user }: UserMarkerProps) => {
  return (
    <Marker
      coordinate={{
        latitude: parseFloat(user.coords.latitude),
        longitude: parseFloat(user.coords.longitude),
      }}
      title={user.name}
    >
      <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {},
  avatar: {
    borderWidth: 2,
    borderColor: "green", //TODO
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
});

export default UserMarker;
