import { FAB, FABProps } from "@rneui/base";
import { colors } from "../../ui/tokens";

type DefaultFabProps = FABProps;

const DefaultFab = (props: DefaultFabProps) => {
  return (
    <FAB
      placement={"right"}
      icon={{ name: "add", color: "white" }}
      size="large"
      color={colors.primary}
      {...props}
    />
  );
};

export default DefaultFab;
