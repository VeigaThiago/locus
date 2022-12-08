import { View, StyleSheet, SafeAreaView } from "react-native";
import { TextInput, IconButton } from "@react-native-material/core";
import { colors, spacings } from "../../ui/tokens";
import { AntDesign as Icon } from "@expo/vector-icons";
import { useCallback, useState } from "react";

interface AddFriendScreenViewProps {
  searchFriend?: (searchTerm: string) => void;
}

const AddFriendScreenView = ({
  searchFriend = () => {},
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
