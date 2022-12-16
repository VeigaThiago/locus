import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ReactElement, cloneElement } from "react";
import { RootStackScreenProps } from "../../../types";
import User from "../../model/User";
import { facebookLogin } from "../../services/Auth";

type LoginScreenControllerProps = {
  children: ReactElement;
} & RootStackScreenProps<"LoggedOut">;

const SKIP_LOGIN = false;
const MOCKED_USER = {
  displayName: "Cássio de Sá",
  email: "sss.cassio@gmail.com",
  emailVerified: false,
  isAnonymous: false,
  metadata: { creationTime: 1670950130108, lastSignInTime: 1671059297430 },
  multiFactor: { enrolledFactors: [Array] },
  phoneNumber: null,
  photoURL: "https://graph.facebook.com/3176179832598999/picture",
  providerData: [[Object]],
  providerId: "firebase",
  refreshToken:
    "AOkPPWQU5RthN7R3_MJhCH61MY-ZZhqnc-dhliSIbVZAupEdeIG24ywN0HdagCxZIijMvJlXssUsC81vohiFXa7CdbHqUAPNpr-6PXf6R9-PO1jnBG1fAc7ReaQNME74-ol-_0VXryZ1Cdymdhg2ZbhGKT93l1WNna0MqykuwJCI4yVzNH0NqZUhc7F9YXxdyizIQQXAi-_7INjnC83jWqqGUpQf2fNmtZ1ypV4eN2ijm74SBzhYQk_Z1iMSX4I-mL3IPz9mS90uKHdM8WYZsV3tpKUv4P8IepTu3z-xWHePxGoic5BFikyBVP4J6sEvL7Rj3Z5Nxtg8y2vCeX_IcCQRN_OLdro_9w",
  tenantId: null,
  uid: "3wj2JWRUQuVWewmsHTn3TGR7JQU2",
};

const LoginScreenController = ({
  children,
  navigation,
}: LoginScreenControllerProps) => {
  const onFacebookPress = async () => {
    try {
      const currentUser = SKIP_LOGIN ? MOCKED_USER : await facebookLogin();
      if (currentUser) {
        await User.login(currentUser as FirebaseAuthTypes.User);
        navigation.navigate("LoggedIn");
      }
    } catch (err) {
      // TODO: erro ao logar
    }
  };

  return cloneElement(children, {
    onFacebookPress,
  });
};

export default LoginScreenController;
