import * as React from "react";
import { StyleSheet, SafeAreaView, Image, ScrollView } from "react-native";
import User, { UserType } from "../../../model/User";
import NewGroupBackground from "../../../assets/images/background/NewGroup.png";
import { colors } from "../../../ui/tokens";
import { Friend } from "../../MapScreen/components/GroupSelector/components";
import Error from "../../../components/Error";
import { FriendItem } from "../../../components";
import { CheckBox } from "@rneui/base";
import DefaultFab from "../../../components/Fab/Fab";

interface NewGroupParticipantsScreenViewProps {
  selectedFriendsIds?: string[];
  selectedFriends?: UserType[];
  friends?: UserType[];
  onFriendPress?: (fid: string) => void;
  onNextPress?: () => void;
  loading?: boolean;
}

const NewGroupParticipantsScreenView = ({
  selectedFriendsIds = [],
  selectedFriends = [],
  friends = [],
  onFriendPress = () => {},
  loading = true,
  onNextPress = () => {},
}: NewGroupParticipantsScreenViewProps) => {
  if (friends.length === 0 && !loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Error description="Você ainda não possui amigos, adicione amigos para conseguir criar grupos" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={NewGroupBackground} style={styles.background} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.collapse}
      >
        <Friend title={"Você"} avatarSrc={{ uri: User?.avatarUrl || "" }} />
        {selectedFriends.map((item) => (
          <Friend
            key={item.id}
            title={item.name.split(" ")[0]}
            avatarSrc={{ uri: item.avatarUrl }}
          />
        ))}
      </ScrollView>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
        {friends?.map(({ id, name, email, avatarUrl }) => (
          <FriendItem
            key={email}
            title={name}
            avatarSrc={{ uri: avatarUrl }}
            onPress={() => onFriendPress(id)}
            leftContent={
              <CheckBox
                onPress={() => onFriendPress(id)}
                checked={selectedFriendsIds?.includes(id) || false}
                checkedColor={colors.confirm}
                uncheckedColor={colors.grayLight}
                size={30}
              />
            }
          />
        ))}
      </ScrollView>
      <DefaultFab
        visible={selectedFriendsIds.length !== 0}
        onPress={onNextPress}
        icon={{ name: "east", color: "white" }}
      />
    </SafeAreaView>
  );
};

export default NewGroupParticipantsScreenView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 5,
  },
  collapse: { maxHeight: 75 },
  background: {
    width: "100%",
  },
});
