import * as React from "react";
import { SafeAreaView } from "react-native";
import GroupScreenView from "./GroupScreenView";

interface GroupScreenProps {}

const GroupScreen = (props: GroupScreenProps) => {
  return (
    <SafeAreaView>
      <GroupScreenView />
    </SafeAreaView>
  );
};

export default GroupScreen;
