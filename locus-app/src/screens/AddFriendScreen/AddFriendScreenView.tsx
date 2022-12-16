import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { TextInput, IconButton } from "@react-native-material/core";
import { colors, spacings } from "../../ui/tokens";
import { AntDesign as Icon } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { UserType } from "../../model/User";
import { FriendItem, Error } from "../../components";

interface AddFriendScreenViewProps {
  searchFriend?: (searchTerm: string) => void;
  users?: UserType[];
  hasSearchError?: boolean;
  addFriend?: (user: UserType) => void;
}

const AddFriendScreenView = ({
  searchFriend = () => {},
  users = [],
  hasSearchError = false,
  addFriend = () => {},
}: AddFriendScreenViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchButtonPress = useCallback(
    () => searchFriend(searchTerm),
    [searchTerm]
  );

  const onAddFriendPress = useCallback((user: UserType) => addFriend(user), []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          label="Nome do amigo"
          variant="outlined"
          color={colors.primary}
          selectionColor={colors.primary}
          placeholderTextColor={colors.primary}
          onChangeText={setSearchTerm}
          trailing={(props) => (
            <IconButton
              onPress={onSearchButtonPress}
              icon={(props) => (
                <Icon name="search1" {...props} color={colors.grayLight} />
              )}
              {...props}
            />
          )}
        />
        <FlatList
          ListEmptyComponent={
            hasSearchError ? (
              <Error description="Usuário não encontrado" />
            ) : null
          }
          data={users}
          renderItem={({ item }) => {
            const { id, email, name, avatarUrl } = item;
            return (
              <FriendItem
                key={email}
                title={name}
                avatarSrc={{ uri: avatarUrl }}
                rightContent={{
                  icon: {
                    onPress: () => onAddFriendPress(item),
                    name: "plus",
                    color: colors.primary,
                  },
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddFriendScreenView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: spacings.x2,
    backgroundColor: colors.white,
  },
});
