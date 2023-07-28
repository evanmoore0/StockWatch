import React from "react";
import { StyleSheet } from "react-native";
import normalize from "./normalize";

import Constants from "../Constants";

const GlobalStyles = StyleSheet.create({
  screenContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: normalize.setNormalize(896),
    backgroundColor: "black",
    paddingTop: normalize.setNormalize(50),
  },

  homePageContainer: {
    backgroundColor: "black",
    marginHorizontal: normalize.setNormalize(16),
    marginTop: normalize.setNormalize(60),
  },

  buttonContainer: {
    paddingTop: normalize.setNormalize(50),
  },

  percentChangeText: {
    color: "#6AB664",
    fontSize: normalize.setNormalize(20),
    fontWeight: "800",
  },

  searchBarContainer: {
    height: normalize.setNormalize(60),
    alignItems: "center",
    justifyContent: "center",
    alignItems: "stretch",
  },
  stockContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(82,82,82,0.3)",
    borderRadius: Constants.STOCK.radius,
    paddingHorizontal: normalize.setNormalize(20),
    alignItems: "center",
    paddingVertical: normalize.setNormalize(16),
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: normalize.setNormalize(20),
    fontFamily: Constants.FONT.family

  },

  fullPageCenterAlign: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  alignCenter: {
    alignItems: 'center'
  },

  justifyCenter: {
    justifyContent: 'center'
  }
});

export default GlobalStyles;
