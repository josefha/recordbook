import React, { Fragment } from "react";
import {
  Screen,
  Heading,
  Divider,
  Button,
  View,
  Text,
  NavigationBar,
  Title
} from "@shoutem/ui";

import { SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const logout = async props => {
  // Try to login
  props.navigation.navigate("Login");
};

const doSomething = async () => {
  const value = await AsyncStorage.getItem("userToken");
  console.log("TCL: doSomething -> value", value);
};

const Home = props => {
  return (
    <Fragment>
      <SafeAreaView style={{ backgroundColor: "#f2f2f2" }} />
      {/* <NavigationBar centerComponent={<Title>Text</Title>} /> */}
      <Screen style={styles.Box}>
        <Divider />
        <Heading style={styles.Heading}>You are logged in</Heading>
        <Divider />
        <View styleName="horizontal">
          <Button
            styleName="confirmation"
            onPress={() => {
              doSomething(props);
            }}
          >
            <Text>Do something</Text>
          </Button>

          <Button
            styleName="confirmation secondary"
            onPress={() => {
              logout(props);
            }}
          >
            <Text>Logout</Text>
          </Button>
        </View>
      </Screen>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  SafeArea: { backgroundColor: "#000" },
  Box: {},
  Wrapper: { width: "100%", height: "100%" },
  Heading: {
    paddingLeft: "5%"
  }
});

export default Home;
