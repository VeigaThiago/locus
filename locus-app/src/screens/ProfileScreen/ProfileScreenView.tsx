import * as React from "react";
import { View, StyleSheet, SafeAreaView, Text, Image } from "react-native";
import { colors, spacings, typography } from "../../ui/tokens";
import { Button } from "@rneui/base";
import { TextInput } from "@react-native-material/core";

interface ProfileScreenViewProps {
  user?: {
    databaseName: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  onChangeName?: (value: string) => void;
  onChangeEmail?: (value: string) => void;
  onSavePress?: () => void;
  canSave?: boolean;
}

const ProfileScreenView = ({
  user = { databaseName: "", name: "", email: "", avatarUrl: "" },
  onChangeName,
  onChangeEmail,
  onSavePress,
  canSave,
}: ProfileScreenViewProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{user.databaseName}</Text>
        <View style={styles.separator}>
          <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.spacing}>
          <TextInput
            label="Nome:"
            variant="standard"
            value={user.name}
            color={colors.primary}
            selectionColor={colors.primary}
            placeholderTextColor={colors.primary}
            onChangeText={onChangeName}
          />
        </View>
        <View style={styles.spacing}>
          <TextInput
            label="Email"
            variant="standard"
            value={user.email}
            color={colors.primary}
            selectionColor={colors.primary}
            placeholderTextColor={colors.primary}
            onChangeText={onChangeEmail}
          />
        </View>
        <View style={{ flex: 1 }} />
        <View style={styles.footer}>
          <Button
            disabled={!canSave}
            onPress={onSavePress}
            icon={{
              name: "md-save-outline",
              type: "ionicon",
              size: 30,
              color: !canSave ? colors.grayLight : colors.primary,
            }}
            title="Salvar"
            type="clear"
            titleStyle={{
              ...typography.title,
              color: colors.primary,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreenView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    padding: spacings.x2,
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: spacings.x2,
    marginRight: spacings.x3,
  },
  title: {
    ...typography.pageTitle,
    color: colors.primary,
    marginBottom: spacings.x6,
    paddingHorizontal: spacings.x2,
  },
  footer: {
    borderTopColor: colors.grayLighter,
    borderTopWidth: 1,
  },
  separator: {
    paddingVertical: spacings.x1,
    marginBottom: spacings.x6,
    borderBottomColor: colors.grayLighter,
    borderBottomWidth: 1,
  },
  spacing: {
    paddingVertical: spacings.x1,
  },
});
