import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import normalize from "../../utils/Style/normalize";
import Constants from "../../utils/Constants";

export default function CalculatorButton(props) {
  return (
    <View style={CalculatorButtonStyles.container}>
      <Text style={CalculatorButtonStyles.text}>{props.number}</Text>
    </View>
  );
}

const CalculatorButtonStyles = StyleSheet.create({
  text: {
    fontSize: normalize.setNormalize(30),
    fontWeight: "700",
    color: "rgba(80, 85, 92, 1)",
    fontFamily: Constants.FONT.family,

  },
  container: {
    width: normalize.setNormalize(80),
    height: normalize.setNormalize(80),
    backgroundColor: "rgba(240, 243, 246, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize.setNormalize(20),
  },
});
