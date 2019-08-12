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

class Home extends React.Component {
  static navigationOptions = {
    title: "Records"
  };
  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ backgroundColor: "#f2f2f2" }} />
        {/* <NavigationBar centerComponent={<Title>Text</Title>} /> */}
        <Screen style={styles.Box}>
          <Divider />
          <Heading style={styles.Heading}>Josefs RecordBook</Heading>
          <Divider />
          <View styleName="horizontal" />
        </Screen>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  SafeArea: { backgroundColor: "#000" },
  Box: {},
  Wrapper: { width: "100%", height: "100%" },
  Heading: {
    paddingLeft: "5%"
  }
});

export default Home;
