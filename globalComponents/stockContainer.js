import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import Constants from "../Constants";

function StockContainer(props) {
  const navigation = useNavigation();

  const stockContainerStyles = StyleSheet.create({
    stock: {
      fontSize: Constants.STOCK_NAME_FONT.size,
      fontWeight: Constants.STOCK_NAME_FONT.weight,
      color:
        props.percentChange < 0
          ? Constants.THEME_COLOR.blue
          : Constants.THEME_COLOR.green,
    },

    ticker: {
      color: Constants.STOCK_NAME_FONT.tickerColor,
      fontSize: Constants.STOCK_NAME_FONT.tickerSize,
      paddingVertical: normalize.setNormalize(1),
    },

    score: {
      color: "white",
      fontSize: normalize.setNormalize(10),
    },

    percentChange: {
      fontSize: Constants.STOCK_NAME_FONT.tickerSize,
      color:
        props.percentChange < 0
          ? Constants.THEME_COLOR.blue
          : Constants.THEME_COLOR.green,
      fontWeight: Constants.STOCK_NAME_FONT.weight,
    },
  });

  return (
    <TouchableOpacity
      style={{
        marginBottom: normalize.setNormalize(15),
      }}
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

          <Text style={stockContainerStyles.score}>{props.score}</Text>
        </View>

        <Text style={stockContainerStyles.percentChange}>
          {props.percentChange + " %"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default StockContainer;
