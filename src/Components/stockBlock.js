import React, {useEffect} from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import normalize from "../utils/Style/normalize";
import StockContainer from "./stockContainer";

import Constants from "../utils/Constants";

const StockBlock = (props) => {

  


  
  const SmallStock = (smallProps) => {
    return (
      <View style={StockBlockStyles.stock}>
        <View>
          <Text style={StockBlockStyles.stockName}>{smallProps.sName}</Text>
          <Text style={StockBlockStyles.ticker}>{smallProps.ticker}</Text>

          <Text style={StockBlockStyles.score}>{smallProps.score}</Text>
        </View>

        <Text style={StockBlockStyles.percentChange}>
          {smallProps.percentChange}
        </Text>
      </View>
    );
  };

  const BigImage = (props) => {
    return (
      <View style={[StockBlockStyles.news, { width: props.width }]}>
        {/* <View style={StockBlockStyles.imageOverlay}>
          <Text style={StockBlockStyles.newsTitle}>{props.title}</Text>
        </View> */}

        <Image
          style={StockBlockStyles.newsTitle}
          source={{
            uri: props.image,
          }}
        />
      </View>
    );
  };

  return (
    <>
      <View style={StockBlockStyles.container}>
        {props.switch ? (
          <>
            <View style={StockBlockStyles.smallStockContainer}>
              <SmallStock
                sName={props.stock0.sName}
                ticker={props.stock0.ticker}
                score={props.stock0.score}
                percentChange={props.stock0.percentChange.toFixed(2)}
              />
              <SmallStock
                sName={props.stock1.sName}
                ticker={props.stock1.ticker}
                score={props.stock1.score}
                percentChange={props.stock1.percentChange.toFixed(2)}
              />
            </View>

            {/**
             * trending[i]["newsTitle"] = data.results[0]["title"];
              trending[i]["imageLink"] = data.results[0]["image_url"];
              trending[i]["newsLink"] 
             */}
            <BigImage width="62%" image = {props.stock0.imageLink} title = {props.stock0.newsTitle} newsLink = {props.stock0.newsLink}/>
          </>
        ) : (
          <>
            <BigImage width="62%" image = {props.stock0.imageLink} title = {props.stock0.newsTitle} newsLink = {props.stock0.newsLink}/>

            <View style={StockBlockStyles.smallStockContainer}>
              <SmallStock
                sName={props.stock0.sName}
                ticker={props.stock0.ticker}
                score={props.stock0.score}
                percentChange={props.stock0.percentChange.toFixed(2)}
              />
              <SmallStock
                sName={props.stock1.sName}
                ticker={props.stock1.ticker}
                score={props.stock1.score}
                percentChange={props.stock1.percentChange.toFixed(2)}
              />
            </View>
          </>
        )}
      </View>

      <StockContainer
        sName={props.stock2.sName}
        ticker={props.stock2.ticker}
        percentChange={props.stock2.percentChange.toFixed(2)}
        score={props.stock2.score}
      />

      <View style={StockBlockStyles.mediumImageContainer}>
        <BigImage width={"49%"} image = {props.stock1.imageLink} title = {props.stock1.newsTitle} newsLink = {props.stock1.newsLink}/>
        <BigImage width="49%" image = {props.stock2.imageLink} title = {props.stock2.newsTitle} newsLink = {props.stock2.newsLink}/>
      </View>

      <StockContainer
        sName={props.stock3.sName}
        ticker={props.stock3.ticker}
        percentChange={props.stock3.percentChange.toFixed(2)}
        score={props.stock3.score}
      />

      <View style={{ marginBottom: Constants.STOCK.margin }}>
        <BigImage width="100%" image = {props.stock3.imageLink} title = {props.stock3.newsTitle} newsLink = {props.stock3.newsLink}/>
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
  },

  smallStockContainer: {
    display: "flex",
    flexDirection: "column",
    width: "36%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  stock: {
    backgroundColor: "rgba(82,82,82,0.3)",
    borderRadius: Constants.STOCK.radius,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "48%",
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
    height: normalize.setNormalize(200),
    backgroundColor: "red",
    borderRadius: Constants.STOCK.radius,
  },

  percentChange: {
    fontSize: Constants.STOCK_NAME_FONT.tickerSize,
    color: Constants.THEME_COLOR.green,
    fontWeight: Constants.STOCK_NAME_FONT.weight,
  },

  imageOverlay: {
    position: "absolute",
    width: "100%",
    borderTopRightRadius: Constants.STOCK.radius,
    borderTopLeftRadius: Constants.STOCK.radius,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    padding: 10,
  },

  newsTitle: {
    flex: 1,
    overflow: "hidden",
    borderRadius: Constants.STOCK.radius,
    color: "white",
    fontWeight: "bold"
  },

  mediumImageContainer: {
    display: "flex",
    flexDirection: "row",
    // marginBottom: Constants.STOCK.margin,
    justifyContent: "space-between",
  },
});

export default StockBlock;
