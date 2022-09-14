import React from "react";
import { View, Text, StyleSheet } from "react-native";
import normalize from "../utils/normalize";

function LoginAndRegisterTitle(props) {
  return (
    <View style={LoginAndRegisterTitleStyles.titleContainer}>
      <Text style={LoginAndRegisterTitleStyles.title}>{props.title}</Text>
    </View>
  );
}

const LoginAndRegisterTitleStyles = StyleSheet.create({
  titleContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  title: {
    fontSize: normalize.setNormalize(58),
    color: "white",
  },
});

export default LoginAndRegisterTitle;
