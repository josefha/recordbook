import React, { Fragment, useState } from "react";
import {
  Screen,
  TextInput,
  Heading,
  Divider,
  Button,
  View,
  Text
} from "@shoutem/ui";

import AsyncStorage from "@react-native-community/async-storage";
import { StyleSheet, SafeAreaView, Alert } from "react-native";
import { login } from "../api/serverApi";

const callServer = async (props, email, password) => {
  console.log("TCL: callServer -> password", password);
  console.log("TCL: callServer -> email", email);
  const response = await login(email, password);
  console.log("TCL: callServer -> response", response);

  if (response.status == 200) {
    const token = response.data.token;
    await AsyncStorage.setItem("userToken", token);
    props.navigation.navigate("Home");
  } else if (response.status == 401) {
    Alert.alert("wrong email or password");
  } else {
    Alert.alert("could not login");
  }
};

const Login = props => {
  const [emailTextValue, setEmailTextValue] = useState("");
  const [passwordTextValue, setPasswordTextValue] = useState("");

  return (
    <Fragment>
      <SafeAreaView style={{ backgroundColor: "#f2f2f2" }} />
      <Screen>
        <Heading style={styles.Heading}>Login</Heading>
        <Divider />
        <TextInput
          placeholder={"Email"}
          onChangeText={text => setEmailTextValue(text)}
        />
        <TextInput
          placeholder={"Password"}
          onChangeText={text => setPasswordTextValue(text)}
          secureTextEntry
        />
        <Divider />
        <View style={styles.box}>
          <Button
            styleName="confirmation secondary"
            onPress={() => callServer(props, emailTextValue, passwordTextValue)}
          >
            <Text>Login</Text>
          </Button>
          <Button
            styleName="confirmation secondary"
            onPress={() => props.navigation.navigate("CreateAccount")}
          >
            <Text>Create Account</Text>
          </Button>
          <Button
            styleName="confirmation secondary"
            onPress={() => props.navigation.navigate("Onboarding")}
          >
            <Text>Onboarding</Text>
          </Button>
          <Button
            styleName="confirmation secondary"
            onPress={() => props.navigation.navigate("Home")}
          >
            <Text>Enter</Text>
          </Button>
        </View>
      </Screen>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 200,
    width: "100%"
  },
  Heading: {
    paddingTop: "5%",
    paddingLeft: "5%"
  }
});

export default Login;
