import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import UserMarker from "./components/UserMarker";

interface MapScreenViewProps {}

const MapScreenView = (props: MapScreenViewProps) => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <UserMarker />
      </MapView>
    </View>
  );
};

export default MapScreenView;

const styles = StyleSheet.create({
  container: {},
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
