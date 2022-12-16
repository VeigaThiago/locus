import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk";

export async function facebookLogin() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);

  if (result.isCancelled) {
    throw "User cancelled the login process";
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw "Something went wrong obtaining access token";
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken
  );

  await auth().signInWithCredential(facebookCredential);
  const currentUser = auth().currentUser;
  // Sign-in the user with the credential
  return currentUser;
}
