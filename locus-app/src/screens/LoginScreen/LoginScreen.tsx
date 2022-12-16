import { RootStackScreenProps } from "../../../types";
import LoginScreenController from "./LoginScreenController";
import LoginScreenView from "./LoginScreenView";

const LoginScreen = (props: RootStackScreenProps<"LoggedOut">) => {
  return (
    <LoginScreenController {...props}>
      <LoginScreenView />
    </LoginScreenController>
  );
};

export default LoginScreen;
