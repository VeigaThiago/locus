/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GroupType } from "./src/model/Group";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  LoggedIn: NavigatorScreenParams<LoggedInStackParamList> | undefined;
  LoggedOut: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type LoggedInStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AddFriend: undefined;
  NewGroupParticipants: undefined;
  GroupView: {
    group: GroupType;
    status: "pending" | "confirmed";
  };
};

export type LoggedInStackProps<Screen extends keyof LoggedInStackParamList> =
  NativeStackScreenProps<LoggedInStackParamList, Screen>;

export type RootTabParamList = {
  Profile: undefined;
  GroupFriends: NavigatorScreenParams<GroupFriendParamList>;
  Map: undefined;
  Settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type GroupFriendParamList = {
  Group: undefined;
  Friend: undefined;
};

export type GroupFriendStackProps<Screen extends keyof GroupFriendParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<LoggedInStackParamList>,
    NativeStackScreenProps<GroupFriendParamList, Screen>
  >;
