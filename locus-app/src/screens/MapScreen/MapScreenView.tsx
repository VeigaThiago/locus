import { useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import { Error } from "../../components";
import { GroupType } from "../../model/Group";
import { colors, spacings } from "../../ui/tokens";
import { UserMarker, GroupSelector, UserSelection } from "./components";

export interface MapScreenViewProps {
  groups?: GroupType[];
  loading?: boolean;
}

const MapScreenView = ({ groups = [], loading = true }: MapScreenViewProps) => {
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
      setSelectedUserId(undefined);
    } else {
      focusMap([uid]);
      setSelectedUserId(uid);
    }
  };

  if (groups.length === 0 && !loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.error}>
          <Error description="Voc?? ainda n??o faz parte de nenhum grupo. Retorne ap??s entrar em um." />
        </View>
      </SafeAreaView>
    );
  }

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
          <MapView
            ref={_map}
            style={styles.map}
            maxZoomLevel={18}
            mapPadding={{
              top: 200,
              right: 0,
              bottom: 200,
              left: 0,
            }}
          >
            {selectedGroup?.participants?.map((user) => (
              <UserMarker
                key={user.id}
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
  error: {
    justifyContent: "center",
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 100,
  },
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
