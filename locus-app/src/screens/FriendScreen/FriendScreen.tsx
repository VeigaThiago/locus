import * as React from "react";
import { SafeAreaView } from "react-native";
import FriendScreenView from "./FriendScreenView";

interface FriendScreenProps {}

const FriendScreen = (props: FriendScreenProps) => {
  return (
    <SafeAreaView>
      <FriendScreenView />
    </SafeAreaView>
  );
};

export default FriendScreen;
