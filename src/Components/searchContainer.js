import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import normalize from "../utils/Style/normalize";
import Constants from "../Constants";
import GlobalStyles from "../utils/Style/globalStyles";

function SearchContainer(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        Keyboard.dismiss();
        navigation.navigate("StockDisplay", {
          stock: {
            sName: props.sName,
            ticker: props.ticker,
          },
        });
      }}
    >
      <View
        style={[GlobalStyles.stockContainer, searchContainerStyles.container]}
      >
        <View>
          <Text style={searchContainerStyles.stock}>{props.sName}</Text>

          <Text style={searchContainerStyles.ticker}>{props.ticker}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default SearchContainer;

const searchContainerStyles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    borderRadius: 0,
    borderBottomColor: "rgba(256,256,256,0.3)",
    borderBottomWidth: normalize.setNormalize(1),
  },

  stock: {
    fontSize: Constants.STOCK_NAME_FONT.size,
    fontWeight: Constants.STOCK_NAME_FONT.weight,
    color: Constants.THEME_COLOR.green,
    flexWrap: "wrap",
  },

  ticker: {
    color: Constants.STOCK_NAME_FONT.tickerColor,
    fontSize: Constants.STOCK_NAME_FONT.tickerSize,
  },
});
