import { RootTabScreenProps } from "../../../types";

import MapScreenController from "./MapScreenController";
import MapScreenView from "./MapScreenView";

const MapScreen = (props: RootTabScreenProps<"Map">) => {
  return (
    <MapScreenController {...props}>
      <MapScreenView />
    </MapScreenController>
  );
};

export default MapScreen;
