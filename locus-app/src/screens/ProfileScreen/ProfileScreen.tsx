import * as React from "react";
import { RootTabScreenProps } from "../../../types";
import ProfileScreenController from "./ProfileScreenController";
import ProfileScreenView from "./ProfileScreenView";

const ProfileScreen = (props: RootTabScreenProps<"Profile">) => {
  return (
    <ProfileScreenController {...props}>
      <ProfileScreenView />
    </ProfileScreenController>
  );
};

export default ProfileScreen;
