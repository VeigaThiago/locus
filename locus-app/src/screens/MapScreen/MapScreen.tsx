import { useMemo } from "react";
import { SafeAreaView } from "react-native";
import User from "../../model/User";
import MapScreenController from "./MapScreenController";
import MapScreenView, { MapScreenViewProps } from "./MapScreenView";

interface MapScreenProps {}

const MapScreen = (props: MapScreenProps) => {
  return (
    <MapScreenController>
      <MapScreenView />
    </MapScreenController>
  );
};

export default MapScreen;
