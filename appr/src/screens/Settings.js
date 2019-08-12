import React from "react";
import { Screen, Divider, Button, View, Text } from "@shoutem/ui";

import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const logout = async props => {
  AsyncStorage.removeItem("userToken");
  props.navigation.navigate("Login");
};

class Settings extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  render() {
    return (
      <Screen style={styles.Wrapper}>
        <Divider />
        <View styleName="horizontal">
          <Button
            styleName="confirmation secondary"
            onPress={() => {
              logout(this.props);
            }}
          >
            <Text>Logout</Text>
          </Button>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {}
});

export default Settings;
