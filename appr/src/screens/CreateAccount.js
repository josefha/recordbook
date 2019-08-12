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
import { createAccount } from "../api/serverApi";

const callServer = async (props, name, email, password, password2) => {
  if (password != password2) {
    Alert.alert("Passwords do not match");
    return;
  }

  const response = await createAccount(name, email, password);

  if (response.status == 200) {
    Alert.alert("Your account was created, try to login");
    props.navigation.navigate("Login");
  } else if (response.status == 401) {
    Alert.alert("wrong email or password");
  } else {
    Alert.alert("could not login");
  }
};

const CreateAccount = props => {
  const [nameTextValue, setNameTextValue] = useState("");
  const [emailTextValue, setEmailTextValue] = useState("");
  const [passwordTextValue, setPasswordTextValue] = useState("");
  const [passwordRepeatTextValue, setPasswordRepeatTextValue] = useState("");

  return (
    <Fragment>
      <SafeAreaView style={{ backgroundColor: "#f2f2f2" }} />
      <Screen>
        <Heading style={styles.Heading}>Create Account</Heading>
        <Divider />
        <TextInput
          placeholder={"Name"}
          onChangeText={text => setNameTextValue(text)}
        />
        <TextInput
          placeholder={"Email"}
          onChangeText={text => setEmailTextValue(text)}
        />
        <TextInput
          placeholder={"Password"}
          onChangeText={text => setPasswordTextValue(text)}
          secureTextEntry
        />
        <TextInput
          placeholder={"Repeat Password"}
          onChangeText={text => setPasswordRepeatTextValue(text)}
          secureTextEntry
        />
        <Divider />
        <View styleName="horizontal">
          <Button
            styleName="confirmation secondary"
            onPress={() => props.navigation.goBack()}
          >
            <Text>Go back</Text>
          </Button>
          <Button
            styleName="confirmation secondary"
            onPress={() =>
              callServer(
                props,
                nameTextValue,
                emailTextValue,
                passwordTextValue,
                passwordRepeatTextValue
              )
            }
          >
            <Text>Create Account</Text>
          </Button>
        </View>
      </Screen>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  Heading: {
    paddingTop: "5%",
    paddingLeft: "5%"
  }
});

export default CreateAccount;
