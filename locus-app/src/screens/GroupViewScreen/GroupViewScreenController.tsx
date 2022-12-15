import { ReactElement, cloneElement, useMemo } from "react";
import { Alert } from "react-native";
import { LoggedInStackProps } from "../../../types";
import Group from "../../model/Group";
import User from "../../model/User";

type GroupViewScreenControllerProps = {
  children: ReactElement;
} & LoggedInStackProps<"GroupView">;

const GroupViewScreenController = ({
  children,
  navigation,
  route,
}: GroupViewScreenControllerProps) => {
  const group = route.params.group;

  const isOwner = useMemo(() => group.owner?.id === User.id, [group, User]);
  const isPending = useMemo(() => route.params.status === "pending", [route]);

  const onGroupAcceptPress = () => {
    Alert.alert(
      `Aceitar convite?`,
      `Deseja aceitar o convite para entrar no grupo ${group.name}? Sua localização será compartilhada com outros membros do grupo.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Aceitar",
          style: "default",
          onPress: () => Group.acceptRequest(group.id),
        },
      ]
    );
  };

  const onGroupRejectPress = () =>
    Alert.alert(
      `Rejeitar convite?`,
      `Deseja rejeitar o convite para entrar no grupo ${group.name}? O dono do grupo terá que solicitar novamente caso mude de ideia.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Rejeitar",
          style: "destructive",
          onPress: () => Group.rejectRequest(group.id),
        },
      ]
    );

  return cloneElement(children, {
    isOwner,
    isPending,
    group,
    onGroupAcceptPress,
    onGroupRejectPress,
  });
};

export default GroupViewScreenController;
