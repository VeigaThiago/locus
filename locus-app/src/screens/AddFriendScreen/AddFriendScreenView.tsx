import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { TextInput, IconButton } from "@react-native-material/core";
import { colors, spacings } from "../../ui/tokens";
import { AntDesign as Icon } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { UserType } from "../../model/User";
import { FriendItem } from "../../components";

interface AddFriendScreenViewProps {
  searchFriend?: (searchTerm: string) => void;
  users?: UserType[];
  hasSearchError?: boolean;
}

const AddFriendScreenView = ({
  searchFriend = () => {},
  users = [],
  hasSearchError = false,
}: AddFriendScreenViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchButtonPress = useCallback(
    () => searchFriend(searchTerm),
    [searchTerm]
  );

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
          data={users}
          renderItem={({ item: { email, name, avatarUrl } }) => (
            <FriendItem
              key={email}
              title={name}
              description={email}
              avatarSrc={{ uri: avatarUrl }}
            />
          )}
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
