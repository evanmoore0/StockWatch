import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import normalize from "../utils/Style/normalize";
import GlobalStyles from "../utils/Style/globalStyles";
import Constants from "../utils/Constants";

function StockContainer(props) {
  const navigation = useNavigation();

  const stockContainerStyles = StyleSheet.create({
    stock: {
      fontSize: Constants.STOCK_NAME_FONT.size,
      fontWeight: Constants.STOCK_NAME_FONT.weight,
      fontFamily: Constants.FONT.family,
      color:
        props.percentChange < 0
          ? Constants.THEME_COLOR.blue
          : Constants.THEME_COLOR.green,
    },

    ticker: {
      color: Constants.STOCK_NAME_FONT.tickerColor,
      fontSize: Constants.STOCK_NAME_FONT.tickerSize,
      paddingVertical: normalize.setNormalize(1),
      fontFamily: Constants.FONT.family
    },

    score: {
      color: "white",
      fontSize: normalize.setNormalize(14),
      fontFamily: Constants.FONT.family
    },

    percentChange: {
      fontSize: Constants.STOCK_NAME_FONT.tickerSize,
      fontFamily: Constants.FONT.family,
      color:
        props.percentChange < 0
          ? Constants.THEME_COLOR.blue
          : Constants.THEME_COLOR.green,
      fontWeight: Constants.STOCK_NAME_FONT.weight,
    },

    buttonContainer: {
      marginBottom: Constants.STOCK.margin,
      marginTop: Constants.STOCK.margin
    }
  });

  const handleScore = () => {

    let finalScore = Math.abs(props.score) >= 1.0e+9

    ? (Math.abs(props.score) / 1.0e+9).toFixed(1) + "B"
    // Six Zeroes for Millions 
    : Math.abs(props.score) >= 1.0e+6

    ? (Math.abs(props.score) / 1.0e+6).toFixed(1) + "M"
    // Three Zeroes for Thousands
    : Math.abs(props.score) >= 1.0e+3

    ? (Math.abs(props.score) / 1.0e+3).toFixed(1) + "K"

    : Math.abs(props.score);

    return finalScore
  }

  return (
    <TouchableOpacity
      style={stockContainerStyles.buttonContainer}
      onPress={() => {
        navigation.push("StockDisplay", {
          stock: {
            sName: props.sName,
            ticker: props.ticker,
            percentChange: props.percentChange,
            score: props.score,
          },
        });
      }}
    >
      <View style={GlobalStyles.stockContainer}>
        <View>
          <Text style={stockContainerStyles.stock}>{props.sName}</Text>

          <Text style={stockContainerStyles.ticker}>{props.ticker}</Text>

          <Text style={stockContainerStyles.score}>{handleScore()}</Text>
        </View>

        <Text style={stockContainerStyles.percentChange}>
          {props.percentChange + " %"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default StockContainer;
