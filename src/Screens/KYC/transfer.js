import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Touchable,
  SafeAreaView
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import normalize from "../../utils/Style/normalize";

import Calculator from "../../Components/calculator/calculator";
import Header from "../../Components/inputHeader";
import KYCButton from "../../Components/kyc/button";
import Constants from "../../utils/Constants";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={TransferStyles.pageContainer}>
      <Header />

      <View style={TransferStyles.inputContainer}>
        <Text style={TransferStyles.input}>${amount}</Text>
      </View>

        <View style = {TransferStyles.subtitleContainer}>
        <Text style={TransferStyles.buttonSubtitle}>Transfer $$$ to you trading account</Text>
        </View>


      <Calculator
        setAmount={setAmount}
        setDisabled={setDisabled}
        amount={amount}
      />

      <KYCButton
      text = "Transfer"
      onPress = {() => console.log("HI")}
      />
    </SafeAreaView>
  );
}

const TransferStyles = StyleSheet.create({
  buttonSubtitle: {
    fontSize: normalize.setNormalize(15),
    fontWeight: "400",
    color: "rgba(161, 161, 161, 1)",
    paddingVertical: normalize.setNormalize(13),
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: normalize.setNormalize(85),
    color: Constants.THEME_COLOR.green,
    fontWeight: "700",
    fontFamily: Constants.FONT.family
  },

  subtitleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },


  pageContainer: {
    // paddingHorizontal: normalize.setNormalize(16),
    // marginBottom: normalize.setNormalize(34),
    // marginTop: normalize.setNormalize(44),
    flex: 1,
  },
});
