import * as React from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";

interface UserMarkerProps {
  latitude?: string;
  longitude?: string;
}

const UserMarker = ({ latitude, longitude }: UserMarkerProps) => {
  return (
    <Marker
      coordinate={{
        latitude: parseFloat("-12.0"),
        longitude: parseFloat("-38.0"),
      }}
    />
  );
};

export default UserMarker;

const styles = StyleSheet.create({
  container: {},
});
