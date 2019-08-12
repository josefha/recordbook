import React, { Fragment } from "react";
import styled from "styled-components";
import {
  Screen,
  Heading,
  Divider,
  Text,
  NavigationBar,
  Title
} from "@shoutem/ui";

import Picker from "../components/picker";
import { ButtonMd } from "../components/buttons";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View
} from "react-native";

export class OnboardingDone extends React.Component {
  render() {
    return (
      <View style={styles.Wrapper}>
        <Text>Great! You have now finished the onboarding</Text>
        <Button
          title="Enter my RecordBook"
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Box: {
    backgroundColor: "blue",
    height: 100,
    width: 100,
    flexGrow: 0,
    alignSelf: "center"
  },
  Wrapper: { flex: 1, paddingTop: "20%" },
  Heading: {
    paddingLeft: "5%"
  },
  scrollView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white"
  }
});

export default OnboardingDone;
