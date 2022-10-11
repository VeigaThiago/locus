import { useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import { GroupType } from "../../model/Group";
import { colors, spacings } from "../../ui/tokens";
import { UserMarker, GroupSelector, UserSelection } from "./components";

export interface MapScreenViewProps {
  groups?: GroupType[];
}

const MapScreenView = ({ groups = [] }: MapScreenViewProps) => {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const selectedGroup = useMemo(
    () => groups[selectedGroupIndex] || { participants: [] },
    [groups, selectedGroupIndex]
  );

  useEffect(() => {
    setTimeout(() => focusAllMap(), 200);
  }, [selectedGroup]);

  const _map = useRef<MapView>();

  const [selectedUserId, setSelectedUserId] = useState<string>();
  const clearSelectedUser = () => setSelectedUserId(undefined);

  const selectedUser = selectedGroup?.participants?.find(
    ({ id }) => id === selectedUserId
  );

  const focusAllMap = () => {
    const markerIds = selectedGroup?.participants?.map(({ id }) => id);
    focusMap(markerIds);
  };

  const focusMap = (markerIds: string[]) => {
    _map.current?.fitToSuppliedMarkers(markerIds, {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
      animated: true,
    });
  };

  const onLeftPress = () => {
    const nextIndex =
      selectedGroupIndex === 0 ? groups.length - 1 : selectedGroupIndex - 1;
    changeGroup(nextIndex);
  };

  const onRightPress = () => {
    const nextIndex =
      selectedGroupIndex === groups.length - 1 ? 0 : selectedGroupIndex + 1;
    changeGroup(nextIndex);
  };

  const changeGroup = (index: number) => {
    clearSelectedUser();
    setSelectedGroupIndex(index);
  };

  const onUserSelect = (uid: string) => {
    if (uid === "") {
      focusAllMap();
    } else {
      focusMap([uid]);
      setSelectedUserId(uid);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <GroupSelector
          onLeftPress={onLeftPress}
          onRightPress={onRightPress}
          name={selectedGroup.name}
          participants={selectedGroup.participants}
          onUserPress={onUserSelect}
        />
        <View style={{ top: 20 }}>
          <MapView ref={_map} style={styles.map} maxZoomLevel={18}>
            {selectedGroup?.participants?.map((user) => (
              <UserMarker
                user={user}
                onPress={onUserSelect}
                isCurrentUser={user.id === selectedUserId}
              />
            ))}
          </MapView>
        </View>
        {selectedUser && <UserSelection user={selectedUser} />}
      </View>
    </SafeAreaView>
  );
};

export default MapScreenView;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: spacings.x4,
  },
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
