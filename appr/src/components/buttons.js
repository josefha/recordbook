import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "@shoutem/ui";

export const ButtonMd = ({ text }) => {
  return (
    <Button style={styles.standard}>
      <Text>{text}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  standard: { width: "100", height: "20", paddingHorizontal: "5" }
});
