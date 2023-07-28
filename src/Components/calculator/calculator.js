import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import normalize from "../../utils/Style/normalize";

import CalculatorButton from "./calculatorButton";
import Constants from "../../utils/Constants";

export default function Calculator({ setAmount, setDisabled, amount }) {

    function handleAmount(number) {

        amount.includes(".") ? amount.split(".")[1].length >= 2 || amount.split(".")[1].length > 4 ? null : setAmount(`${amount}${number}`) : amount.length >=5 ? null : setAmount(`${amount}${number}`);
        setDisabled(false);
    }
  return (
    <View style={CalculatorStyles.container}>
      <View style={CalculatorStyles.firstRowCalculatorButton}>
        <TouchableOpacity
          style={CalculatorStyles.firstRowButton}
          onPress={() => {

            setDisabled(false)
            setAmount("1");
          }}
        >
          <Text style={CalculatorStyles.firstRowButtonText}>$1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CalculatorStyles.firstRowButton}
          onPress={() => {
            setAmount("10");
            setDisabled(false);
          }}
        >
          <Text style={CalculatorStyles.firstRowButtonText}>$10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CalculatorStyles.firstRowButton}
          onPress={() => {
            setAmount("50");
            setDisabled(false);
          }}
        >
          <Text style={CalculatorStyles.firstRowButtonText}>$50</Text>
        </TouchableOpacity>
      </View>

      <View style={CalculatorStyles.rowCalculatorButton}>
        <TouchableOpacity
          onPress={() => handleAmount("1")}
        >
          <CalculatorButton number="1" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleAmount("2")}
        >
          <CalculatorButton number="2" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleAmount("3")}
        >
          <CalculatorButton number="3" />
        </TouchableOpacity>
      </View>

      <View style={CalculatorStyles.rowCalculatorButton}>
        <TouchableOpacity
          onPress={() =>  handleAmount("4")}
        >
          <CalculatorButton number="4" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAmount("5")}
        >
          <CalculatorButton number="5" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAmount("6")}
        >
          <CalculatorButton number="6" />
        </TouchableOpacity>
      </View>

      <View style={CalculatorStyles.rowCalculatorButton}>
        <TouchableOpacity
          onPress={() => handleAmount("7")}
        >
          <CalculatorButton number="7" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>  handleAmount("8")}
        >
          <CalculatorButton number="8" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAmount("9")}
        >
          <CalculatorButton number="9" />
        </TouchableOpacity>
      </View>

      <View style={CalculatorStyles.rowCalculatorButton}>
        <TouchableOpacity
          onPress={() => amount.includes(".") ? null : setAmount(`${amount}.`)}
        >
          <CalculatorButton number="." />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => amount.length == 0 || amount.includes(".") && amount.length == 1 ? null : handleAmount("0")}
        >
          <CalculatorButton number="0" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setAmount("");
            setDisabled(true);
          }}
        >
          <CalculatorButton number=">" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CalculatorStyles = StyleSheet.create({
  firstRowCalculatorButton: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  firstRowButton: {
    paddingHorizontal: normalize.setNormalize(10),
    backgroundColor: "background: rgba(240, 243, 246, 1)",
    borderRadius: normalize.setNormalize(20),
    height: normalize.setNormalize(70),
    width: normalize.setNormalize(120),
    justifyContent: "center",
    alignItems: "center",

  },

  firstRowButtonText: {
    fontSize: normalize.setNormalize(30),
    fontWeight: "700",
    color: "background: rgba(80, 85, 92, 1)",
    fontFamily: Constants.FONT.family,

  },

  container: {
    flex: 1,
  },

  rowCalculatorButton: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
