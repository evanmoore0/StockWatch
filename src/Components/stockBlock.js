import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import normalize from "../utils/normalize";
import StockContainer from "./stockContainer";

import Constants from "../Constants";

const StockBlock = (props) => {
  return (
    <>
      <View style={StockBlockStyles.container}>
        <View style={StockBlockStyles.stockContainer}>
          <View style={StockBlockStyles.stock}>
            <View>
              <Text style={StockBlockStyles.stockName}>Apple</Text>
              <Text style={StockBlockStyles.ticker}>$APPL</Text>

              <Text style={StockBlockStyles.score}>6969</Text>
            </View>

            <Text style={StockBlockStyles.percentChange}>5.69%</Text>
          </View>

          <View style={StockBlockStyles.stock}>
            <View>
              <Text style={StockBlockStyles.stockName}>Apple</Text>
              <Text style={StockBlockStyles.ticker}>$APPL</Text>

              <Text style={StockBlockStyles.score}>6969</Text>
            </View>

            <Text style={StockBlockStyles.percentChange}>5.69%</Text>
          </View>
        </View>

        <View style={StockBlockStyles.news}>
          <View
            style={{
              position: "absolute",
              width: "100%",
              borderTopRightRadius: "20%",
              borderTopLeftRadius: "20%",
              zIndex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              padding: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 10 }}>
              {props.bigTitle}
            </Text>
          </View>

          <Image
            style={{ flex: 1, overflow: "hidden", borderRadius: "20%" }}
            source={{
              uri: props.smallImageURL,
            }}
          />
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <StockContainer
          sName={"Apple"}
          ticker="$APPL"
          percentChange={2}
          score={500}
        />
      </View>

      <View style={{ width: "100%", height: 200 }}>
        <View
          style={{
            position: "absolute",
            width: "100%",
            borderTopRightRadius: "20%",
            borderTopLeftRadius: "20%",
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            padding: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 10 }}>
            {props.smallTitle}
          </Text>
        </View>

        <Image
          style={{ flex: 1, borderRadius: "20%", marginBottom: 15 }}
          source={{
            uri: props.bigImageURL,
          }}
        />
      </View>
    </>
  );
};

const StockBlockStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: normalize.setNormalize(200),
    justifyContent: "space-between",
    // marginHorizontal: 20
  },

  stockContainer: {
    display: "flex",
    flexDirection: "column",
    width: "35%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  stock: {
    backgroundColor: "rgba(82,82,82,0.3)",
    borderRadius: 30,
    width: "100%",
    height: "46%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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

  stockName: {
    fontSize: Constants.STOCK_NAME_FONT.size,
    fontWeight: Constants.STOCK_NAME_FONT.weight,
    color: Constants.THEME_COLOR.green,
  },

  news: {
    width: "60%",
    height: "100%",
    backgroundColor: "red",
    borderRadius: "20%",
  },

  percentChange: {
    fontSize: Constants.STOCK_NAME_FONT.tickerSize,
    color: Constants.THEME_COLOR.green,
    fontWeight: Constants.STOCK_NAME_FONT.weight,
  },
});

export default StockBlock;
