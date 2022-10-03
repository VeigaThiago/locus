import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { FriendList } from "../../components";
import { colors } from "../../ui/tokens";

type FriendData = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
};

interface FriendScreenViewProps {
  confirmedFriends: FriendData[];
  pendingFriends: FriendData[];
  onConfirmedFriendPress: (fdi: string) => void;
  onPendingFriendPress: (fdi: string) => void;
}

const FriendScreenView = ({
  confirmedFriends,
  pendingFriends,
  onConfirmedFriendPress,
  onPendingFriendPress,
}: FriendScreenViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendScreenView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
