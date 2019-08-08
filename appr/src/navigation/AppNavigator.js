// In App.js in a new project

import React from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import Login from "../screens/Login";
// import Home from "../screens/Home";
// import CreateAccount from "../screens/CreateAccount";

// const AuthNavigator = createStackNavigator(
//   {
//     Login: { screen: Login, navigationOptions: { header: null } },
//     CreateAccount: {
//       screen: CreateAccount,
//       navigationOptions: { header: null }
//     }
//   },
//   {
//     initialRouteName: "Login"
//   }
// );

const AppNavigator = createSwitchNavigator(
  {
    Auth: Login
    // Home: Home
  },
  { navigationOptions: { header: null } }
);

export default createAppContainer(AppNavigator);
