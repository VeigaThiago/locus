/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, View } from "react-native";

import {
  LoggedInStackParamList,
  RootStackParamList,
  RootTabParamList,
  GroupFriendParamList,
} from "../../types";
import { BackgroundTitle } from "../components";
import FriendGroupBackground from "../assets/images/background/FriendAndGroup.png";

import {
  LoginScreen,
  GroupScreen,
  FriendScreen,
  MapScreen,
  AddFriendScreen,
} from "../screens";
import { colors } from "../ui/tokens";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoggedOut"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoggedIn"
        component={LoggedInStackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const TopTab = createMaterialTopTabNavigator<GroupFriendParamList>();

function GroupFriendsTabs() {
  return (
    <View style={{ flex: 1 }}>
      <BackgroundTitle
        backgroundSrc={FriendGroupBackground}
        title={"Grupos & Amigos"}
      />
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          tabBarContentContainerStyle: {
            borderTopWidth: 1,
            borderTopColor: "rgba(0,0,0,0.1)",
          },
          tabBarLabelStyle: { fontWeight: "600" },
        }}
      >
        <TopTab.Screen
          name="Friend"
          component={FriendScreen}
          options={{ title: "Amigos" }}
        />
        <TopTab.Screen
          name="Group"
          component={GroupScreen}
          options={{ title: "Grupos" }}
        />
      </TopTab.Navigator>
    </View>
  );
}

const LoggedInStack = createNativeStackNavigator<LoggedInStackParamList>();

function LoggedInStackNavigator() {
  return (
    <LoggedInStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: "left",
        headerTintColor: colors.primary,
        headerLargeTitle: true,
      }}
    >
      <LoggedInStack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="AddFriend"
        component={AddFriendScreen}
        options={{
          title: "Adicionar amigo",
        }}
      />
    </LoggedInStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="GroupFriends"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <BottomTab.Screen
        name="Profile"
        component={GroupScreen}
        options={() => ({
          title: "Perfil",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="GroupFriends"
        component={GroupFriendsTabs}
        options={() => ({
          title: "Grupos",
          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={() => ({
          headerShown: false,
          title: "Mapa",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="location-pin" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Settings"
        component={GroupScreen}
        options={() => ({
          title: "Configurações",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={color} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof SimpleLineIcons>["name"];
  color: string;
}) {
  return <SimpleLineIcons size={20} style={{ marginBottom: -3 }} {...props} />;
}
