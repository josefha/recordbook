// In App.js in a new project

import React from "react";
import { View, Text, Image } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Login from "../screens/Login";
import Home from "../screens/Home";
import CreateAccount from "../screens/CreateAccount";
import Onboarding from "../screens/Onboarding";
import OnboardingDone from "../screens/OnboardingDone";
import Settings from "../screens/Settings";
import Lifts from "../screens/Lifts";

const AuthNavigator = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { header: null } },
    Onboarding: Onboarding,
    OnboardingDone: OnboardingDone,
    CreateAccount: {
      screen: CreateAccount
    }
  },
  {
    initialRouteName: "Login"
  }
);

const LiftsNavigator = createStackNavigator(
  {
    Lifts: Lifts
  },
  {
    initialRouteName: "Lifts"
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: Home
  },
  {
    initialRouteName: "Home"
  }
);

const SettingNavigator = createStackNavigator(
  {
    Settings: Settings
  },
  {
    initialRouteName: "Settings"
  }
);

const MainTabNavigator = createBottomTabNavigator({
  Records: {
    screen: HomeNavigator,

    navigationOptions: {
      title: "Records",
      tabBarIcon: ({ focused }) =>
        focused ? (
          <Image source={require("../assets/icons/group207.png")} />
        ) : (
          <Image source={require("../assets/icons/group207.png")} />
        )
    }
  },
  Lifts: {
    screen: LiftsNavigator,

    navigationOptions: {
      title: "Lifts",
      tabBarIcon: ({ focused }) =>
        focused ? (
          <Image source={require("../assets/icons/group207.png")} />
        ) : (
          <Image source={require("../assets/icons/group207.png")} />
        )
    }
  },
  Settings: {
    screen: SettingNavigator,

    navigationOptions: {
      title: "Settings",
      tabBarIcon: ({ focused }) =>
        focused ? (
          <Image source={require("../assets/icons/group207.png")} />
        ) : (
          <Image source={require("../assets/icons/group207.png")} />
        )
    }
  }
});

const AppNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Home: MainTabNavigator
});

export default createAppContainer(AppNavigator);
