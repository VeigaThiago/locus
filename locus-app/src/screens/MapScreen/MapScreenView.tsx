import { useMemo, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import GroupSelector from "./components/GroupSelector";
import UserMarker from "./components/UserMarker";

type Group = {
  name: string;
  participants: {
    id: string;
    name: string;
    photoUrl: string;
    coords: {
      latitude: string;
      longitude: string;
    };
  }[];
};
interface MapScreenViewProps {
  groups: Group[];
}

const MapScreenView = ({ groups = [] }: MapScreenViewProps) => {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const selectedGroup = useMemo(
    () => groups[selectedGroupIndex] || {},
    [groups, selectedGroupIndex]
  );

  const onLeftPress = () => {
    const nextIndex =
      selectedGroupIndex === 0 ? groups.length - 1 : selectedGroupIndex - 1;
    setSelectedGroupIndex(nextIndex);
  };

  const onRightPress = () => {
    const nextIndex =
      selectedGroupIndex === groups.length - 1 ? 0 : selectedGroupIndex + 1;
    setSelectedGroupIndex(nextIndex);
  };

  return (
    <View style={styles.container}>
      <GroupSelector
        onLeftPress={onLeftPress}
        onRightPress={onRightPress}
        name={selectedGroup.name}
        participants={selectedGroup.participants}
      />
      <View style={{ top: -20 }}>
        <MapView style={styles.map}>
          {selectedGroup.participants.map((user) => (
            <UserMarker user={user} />
          ))}
        </MapView>
      </View>
    </View>
  );
};

export default MapScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
