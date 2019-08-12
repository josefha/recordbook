import React, { Component } from "react";
import { Button, View, Text, Picker, StyleSheet } from "react-native";

class PickerExample extends Component {
  state = { selected: 70 };
  data = new Array(45);
  metric = "kg";
  updateUser = value => {
    this.setState({ selected: value });
  };

  n = 300;

  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.selected}
          onValueChange={(itemValue, _) =>
            this.setState({ selected: itemValue })
          }
        >
          {[...Array(300).keys()].map(amount => (
            <Picker.Item label={amount + " " + this.metric} value={amount} />
          ))}
        </Picker>
        {/* <Text style={styles.text}>{this.state.selected}</Text> */}
        <Button
          title="Next"
          onPress={() =>
            this.props.updateFunction(this.props.liftType, this.state.selected)
          }
        />
      </View>
    );
  }
}
export default PickerExample;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: "center",
    color: "black"
  }
});
