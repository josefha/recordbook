/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";

import { createAppContainer } from "react-navigation";

import AppNavigator from "./src/navigation/AppNavigator";

const AppContainer = createAppContainer(AppNavigator);

import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider, Layout } from "react-native-ui-kitten";

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <AppContainer />
  </ApplicationProvider>
);

export default App;
