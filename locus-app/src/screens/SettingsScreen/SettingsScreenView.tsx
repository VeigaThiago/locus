import * as React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { BackgroundTitle } from "../../components";
import SettingsBackground from "../../assets/images/background/Settings.png";
import { colors, typography } from "../../ui/tokens";
import { Button } from "@rneui/base";
interface SettingsScreenViewProps {
  onLogoutPress?: () => void;
}

const SettingsScreenView = ({ onLogoutPress }: SettingsScreenViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackgroundTitle
          backgroundSrc={SettingsBackground}
          title={"Configurações"}
          iconName="gear"
        />
      </View>
      <View style={styles.content}>
        <Button
          onPress={onLogoutPress}
          icon={{
            name: "exit-outline",
            type: "ionicon",
            size: 30,
            color: colors.primary,
          }}
          title="Logout"
          type="clear"
          titleStyle={{ ...typography.title, color: colors.primary }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
  },
});
