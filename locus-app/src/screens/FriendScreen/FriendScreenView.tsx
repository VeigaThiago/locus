import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { FriendList } from "../../components";
import { colors } from "../../ui/tokens";
import DefaultFab from "../../components/Fab/Fab";

type FriendData = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
};

interface FriendScreenViewProps {
  confirmedFriends?: FriendData[];
  pendingFriends?: FriendData[];
  onConfirmedFriendPress?: (fdi: string) => void;
  onPendingFriendPress?: (fdi: string) => void;
  onAddNewFriendPress?: () => void;
}

const FriendScreenView = ({
  confirmedFriends = [],
  pendingFriends = [],
  onConfirmedFriendPress = () => {},
  onPendingFriendPress = () => {},
  onAddNewFriendPress = () => {},
}: FriendScreenViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ minHeight: 350 }}>
          <FriendList
            title={"Confirmados"}
            data={confirmedFriends}
            onItemPress={onConfirmedFriendPress}
          />
          <FriendList
            title={"Pendentes"}
            data={pendingFriends}
            onItemPress={onPendingFriendPress}
          />
        </View>
      </ScrollView>
      <DefaultFab onPress={onAddNewFriendPress} />
    </SafeAreaView>
  );
};

export default FriendScreenView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
