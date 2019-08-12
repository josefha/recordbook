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
import AsyncStorage from "@react-native-community/async-storage";

const logout = async props => {
  // Try to login
  props.navigation.navigate("Login");
};

export class Onboarding extends React.Component {
  liftTypes = ["Bench", "Squat", "Deadlift", "OverheadPress"];
  constructor(props) {
    super(props);
    this.state = {
      data: { Bench: 0, Squat: 0, Deadlift: 0, OverheadPress: 0 },
      current: 0
    };
  }

  updateValue = (liftType, value) => {
    if (this.state.current > 2) {
      this.props.navigation.navigate("OnboardingDone");
    } else {
      let dataCopy = Object.assign({}, this.state.data);
      dataCopy[liftType] = value;
      this.setState({ data: dataCopy, current: this.state.current + 1 });
    }
  };

  render() {
    let liftType = this.liftTypes[this.state.current];
    return (
      <View style={styles.Wrapper}>
        <Text>{"Enter your one rep " + liftType + " max"}</Text>
        <Picker
          updateFunction={this.updateValue}
          liftType={liftType}
          currentValue={this.state.data[liftType]}
        />
        {this.state.current > 0 ? (
          <Button
            title="Back"
            onPress={() => {
              this.setState({ current: this.state.current - 1 });
            }}
          />
        ) : null}
        <Text>{JSON.stringify(this.state.data)}</Text>
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

export default Onboarding;
