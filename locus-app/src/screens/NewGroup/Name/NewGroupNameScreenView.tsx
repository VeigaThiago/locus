import * as React from "react";
import { TextInput } from "@react-native-material/core";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import DefaultFab from "../../../components/Fab/Fab";
import User, { UserType } from "../../../model/User";
import { colors, spacings, typography } from "../../../ui/tokens";
import { Friend } from "../../MapScreen/components/GroupSelector/components";

interface NewGroupNameViewProps {
  name?: string;
  participants?: UserType[];
  onChangeName?: (value: string) => void;
  onCreateGroupPress?: () => void;
}

const NewGroupNameView = ({
  participants = [],
  name,
  onChangeName,
  onCreateGroupPress = () => {},
}: NewGroupNameViewProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          label="Nome do grupo"
          variant="outlined"
          value={name}
          color={colors.primary}
          selectionColor={colors.primary}
          placeholderTextColor={colors.primary}
          onChangeText={onChangeName}
        />
        <Text style={styles.title}>{`Participantes: ${
          participants.length + 1
        }`}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.collapse}
        >
          <Friend title={"Você"} avatarSrc={{ uri: User?.avatarUrl || "" }} />
          {participants.map((item) => (
            <Friend
              title={item.name.split(" ")[0]}
              avatarSrc={{ uri: item.avatarUrl }}
            />
          ))}
        </ScrollView>
        <DefaultFab
          visible={name?.length !== 0}
          onPress={onCreateGroupPress}
          icon={{ name: "east", color: "white" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewGroupNameView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: spacings.x2,
    backgroundColor: colors.white,
  },
  title: {
    ...typography.h4,
    color: colors.primary,
    marginVertical: spacings.x2,
  },
  collapse: { maxHeight: 75 },
});
