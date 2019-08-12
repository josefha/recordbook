import React from "react";
import { Screen, Divider, Button, View, Text } from "@shoutem/ui";

import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const logout = async props => {
  props.navigation.navigate("Login");
};

class Lifts extends React.Component {
  static navigationOptions = {
    title: "Lifts"
  };
  render() {
    return (
      <Screen style={styles.Wrapper}>
        <Divider />
        <View styleName="horizontal" />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {}
});

export default Lifts;
