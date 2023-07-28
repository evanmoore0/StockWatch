import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import normalize from "../utils/Style/normalize";
import Graphic from "../Components/graphic";

import Constants from "../utils/Constants";

//Firebase Auth
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../utils/Style/globalStyles";

// import {
//   Alpaca
// } from '@alpacahq/alpaca-trade-api'
function Welcome(props) {


  // const alpaca = new Alpaca({
  //   keyId: 'CKOQCMRUTFASEB8ZR0FV',
  //   secretKey: 'sdplmAX6hRhVP45qYodRDUQZWKeQTbF1nIOQ2dqv',
  //   paper: true,
  // })

  // const assets = alpaca.getAssets({
  //   status: 'active',
  //   asset_class: 'us_equity'
  // })

  // useEffect(() => {
  //   console.log("assets", assets)
  //   // console.log(assets)
  // }, []);





  return (
    <SafeAreaView style={welcomeStyles.pageContainer}>
      <View
        style={{
          alignItems: "flex-start",
          paddingLeft: normalize.setNormalize(10),
        }}
      >
        <View style={GlobalStyles.justifyCenter}>
          <View style={GlobalStyles.alignCenter}>
            <Text style={welcomeStyles.title}>Insider Trends</Text>
          </View>

          <View style={welcomeStyles.subTitleContainer}>
            <Text style={welcomeStyles.subTitle}>Keep up with the latest</Text>
            <Text style={welcomeStyles.subTitle}>trending stocks</Text>
          </View>
        </View>
      </View>

      <View style={welcomeStyles.graphicContainer}>
        <Graphic scale={1} />
      </View>

      <View
        style={[
          welcomeStyles.container,
          { paddingBottom: normalize.setNormalize(20) },
        ]}
      >
        <TouchableOpacity
          style={welcomeStyles.buttonContainer}
          onPress={() => {
            props.navigation.push("Email");
          }}
        >
          <Text style={welcomeStyles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={welcomeStyles.container}>
        <TouchableOpacity
          style={welcomeStyles.buttonSubtitleContainer}
          onPress={() => {
            props.navigation.push("Login");
          }}
        >
          <Text style={welcomeStyles.buttonSubtitle}>
            Already have an account?
          </Text>
          <Text style={welcomeStyles.buttonSubtitle}>Login here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Welcome;

const welcomeStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: normalize.setNormalize(20),
  },

  title: {
    fontSize: normalize.setNormalize(24),
    color: "white",
    fontWeight: "700",
    fontFamily: Constants.FONT.family
  },

  subTitleContainer: {
    paddingTop: normalize.setNormalize(5),
  },

  subTitle: {
    color: "gray",
    fontSize: normalize.setNormalize(12),
    paddingBottom: normalize.setNormalize(3),
    textAlign: "center",
    fontFamily: Constants.FONT.family

  },

  graphicContainer: {
    flex: 1,
  },

  buttonSubtitleContainer: {
    paddingBottom: normalize.setNormalize(50),
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSubtitle: {
    fontSize: normalize.setNormalize(13),
    color: "white",
    fontFamily: Constants.FONT.family
  },

  buttonContainer: {
    height: normalize.setNormalize(40),
    paddingHorizontal: normalize.setNormalize(70),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Constants.BORDER_RADIUS.value,
    backgroundColor: Constants.THEME_COLOR.green,
  },

  buttonText: {
    fontSize: normalize.setNormalize(20),
    color: "white",
    fontFamily: Constants.FONT.family
  },

  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: normalize.setNormalize(0),
  },
});
