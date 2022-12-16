import { Button } from "@rneui/base";
import * as React from "react";
import { useMemo } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { FriendItem } from "../../components";
import { GroupType } from "../../model/Group";
import { UserType } from "../../model/User";
import { colors, spacings } from "../../ui/tokens";
import { convertPercentageToColor } from "../../utils/color";

interface GroupViewScreenViewProps {
  isOwner?: boolean;
  isPending?: boolean;
  group?: GroupType;
  onGroupRejectPress?: () => {};
  onGroupAcceptPress?: () => {};
}

const renderPendingItems =
  (ownerId: string) =>
  ({ id, name, avatarUrl }: UserType) =>
    (
      <View key={id} style={styles.itemContainer}>
        <FriendItem
          title={name}
          rightContent={{ rightDescription: ownerId === id ? "Adm" : "" }}
          avatarSrc={{ uri: avatarUrl }}
        />
      </View>
    );

const renderConfirmedItems =
  (ownerId: string) =>
  ({ id, name, avatarUrl, battery }: UserType) =>
    (
      <View key={id} style={styles.itemContainer}>
        <FriendItem
          title={name}
          rightContent={{
            rightDescription: Math.floor((battery?.level || 0) * 100) + "%",
            icon: {
              type: "material-community",
              name: `battery${battery?.charging ? "-charging" : ""}-50`,
              color: convertPercentageToColor(battery?.level || 0),
            },
          }}
          avatarSrc={{ uri: avatarUrl }}
        />
      </View>
    );

const GroupViewScreenView = ({
  isPending,
  group,
  onGroupRejectPress,
  onGroupAcceptPress,
}: GroupViewScreenViewProps) => {
  const renderFunction = useMemo(
    () => (isPending ? renderPendingItems : renderConfirmedItems),
    [isPending]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {group?.participants.map(renderFunction(group?.owner?.id || ""))}
      </ScrollView>

      {isPending && (
        <View style={styles.footerBar}>
          <Button
            onPress={onGroupRejectPress}
            icon={{
              name: "user-times",
              type: "font-awesome-5",
              size: 20,
              color: colors.reject,
            }}
            title="Negar"
            type="clear"
            titleStyle={{ ...styles.buttonText, color: colors.reject }}
          />
          <Button
            onPress={onGroupAcceptPress}
            icon={{
              name: "user-check",
              type: "font-awesome-5",
              size: 20,
              color: colors.white,
            }}
            title="Aceitar"
            buttonStyle={{ backgroundColor: colors.confirm }}
            titleStyle={{ ...styles.buttonText, color: colors.white }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default GroupViewScreenView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  itemContainer: {
    marginVertical: spacings.x1,
  },
  footerBar: {
    a: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonText: {
    fontWeight: "600",
    marginHorizontal: 10,
  },
});
