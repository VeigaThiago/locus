import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { GroupList } from "../../components";
import DefaultFab from "../../components/Fab/Fab";
import { GroupType } from "../../model/Group";
import { colors } from "../../ui/tokens";

interface GroupScreenViewProps {
  onCreateNewGroupPress?: () => void;
  confirmedGroups?: GroupType[];
  pendingGroups?: GroupType[];
  onConfirmedGroupPress?: (gid: string) => void;
  onPendingGroupPress?: (gid: string) => void;
}

const GroupScreenView = ({
  confirmedGroups,
  pendingGroups,
  onCreateNewGroupPress,
  onConfirmedGroupPress,
  onPendingGroupPress,
}: GroupScreenViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ minHeight: 350 }}>
          <GroupList
            title={"Confirmados"}
            data={confirmedGroups}
            onItemPress={onConfirmedGroupPress}
          />
          <GroupList
            title={"Pendentes"}
            data={pendingGroups}
            onItemPress={onPendingGroupPress}
            pending={true}
          />
        </View>
      </ScrollView>
      <DefaultFab onPress={onCreateNewGroupPress} />
    </SafeAreaView>
  );
};

export default GroupScreenView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
