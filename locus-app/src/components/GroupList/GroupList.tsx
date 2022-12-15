import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { GroupType } from "../../model/Group";
import { colors, spacings } from "../../ui/tokens";

import GroupItem from "../GroupItem";

interface GroupListProps {
  title?: string;
  data?: GroupType[];
  onItemPress?: (id: string) => void;
  pending?: boolean;
}

const GroupList = ({
  title,
  data = [],
  onItemPress = () => {},
  pending = false,
}: GroupListProps) => (
  <>
    <Text style={styles.title}>{title}</Text>
    {data.map(({ id, name, owner }) => (
      <GroupItem
        onPress={() => onItemPress(id)}
        key={id}
        title={name}
        description={`${pending ? "Convite por" : `Grupo de`} ${owner?.name}`}
      />
    ))}
  </>
);

export default GroupList;

const styles = StyleSheet.create({
  title: {
    margin: spacings.x2,
    color: colors.primary,
    fontSize: spacings.x3,
    fontWeight: "600",
  },
});
