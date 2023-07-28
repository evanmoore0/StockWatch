import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Modal,
} from "react-native";

import Graphic from "../../Components/graphic";

import normalize from "../../utils/Style/normalize";
import Constants from "../../utils/Constants";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../utils/Config/firebase-config";

import { Ionicons } from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

var randomWords = require("random-words");

function Layout(props) {

  const navigation = useNavigation()

  const [continueDisabled, setContinueDisabled] = useState(true);

  const [index, setIndex] = useState(0);
  const [passwordIndex, setPasswordIndex] = useState(0);

  const textRef = useRef()

  const Header = () => {
    return (
      <View style = {RegisterStyles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop()
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={normalize.setNormalize(30)}
            color="white"
          />
        </TouchableOpacity>

          <MaterialIcons
            name="remove-red-eye"
            color="rgba(82,82,82,0.3)"
            size={normalize.setNormalize(150)}
          />

          <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={normalize.setNormalize(30)}
            color="black"
          />
        </TouchableOpacity>
      

      </View>
    );
  };

  return (
    <SafeAreaView
    >
      <KeyboardAvoidingView
        style={RegisterStyles.pageContainer}
        keyboardVerticalOffset={10}
        behavior="padding"
        
      >
        <Header />

        <View style={RegisterStyles.entryContainer}>
          <TextInput
            style={[
              RegisterStyles.textInput,
              {
                borderWidth:
                  index == 0
                    ? normalize.setNormalize(4)
                    : normalize.setNormalize(1),
              },
            ]}
            placeholder={props.placeholder1}
            placeholderTextColor={Constants.THEME_COLOR.light_gray}
            keyboardType={props.keyboardType1}
            autoCapitalize={props.autoCapitalize1}
            autoComplete={false}
            returnKeyLabel="Next"
            returnKeyType="next"
            keyboardAppearance='dark'
            spellCheck = {false}
            autoFocus = {true}

            enablesReturnKeyAutomatically={true}
            blurOnSubmit = {false}
            onFocus={() => {
              setIndex(0);
            }}
            selectionColor={Constants.THEME_COLOR.light_gray}
            onChangeText={(text) => {
              props.onChangeText1(text)
            }}
            onSubmitEditing={() => { textRef.current.focus(); }}

          />
          <TextInput
            style={[
              RegisterStyles.textInput,
              {
                borderWidth:
                  index == 1
                    ? normalize.setNormalize(4)
                    : normalize.setNormalize(1),
              },
            ]}
          
            ref={textRef}
            spellCheck = {false}
            secureTextEntry = {props.secureTextEntry}
            keyboardAppearance='dark'
            placeholder={props.placeholder2}
            keyboardType={props.keyboardType2}
            autoCapitalize="none"
            returnKeyLabel="Go"
            returnKeyType="go"
            placeholderTextColor={Constants.THEME_COLOR.light_gray}
            selectionColor={Constants.THEME_COLOR.light_gray}
            onFocus={() => {
              setIndex(1);
            }}
            onChangeText={(text) => {
              props.onChangeText2(text);
            }}
            onSubmitEditing = {() => {

              
              props.onRoute()
            }}
          />

          {/* <View style = {RegisterStyles.passwordTextContainer}>

            <Text style = {[RegisterStyles.passwordText, {color: passwordIndex == 0 ? Constants.THEME_COLOR.light_gray : "red"}]}>8 Characters</Text>
            
          </View> */}



        </View>
        <View style={RegisterStyles.continueButtonContainer}>
          <TouchableOpacity
            style={[
              RegisterStyles.buttonContainer,
              { opacity: continueDisabled ? 0.3 : 1 },
            ]}
            disabled={false}
            onPress={() => {
              props.onRoute()
            }}
          >
            <Text style={RegisterStyles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Layout;

const RegisterStyles = StyleSheet.create({
  pageContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },

  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },


  title: {
    fontSize: Constants.FONT.splash_header,
    color: "white",
    fontFamily: Constants.FONT.family,
  },

  subtitle: {
    color: Constants.THEME_COLOR.light_gray,
    fontFamily: Constants.FONT.family,
    fontSize: Constants.FONT.title,
  },

  entryContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    borderColor: Constants.THEME_COLOR.light_gray,
    borderRadius: Constants.BORDER_RADIUS.value,
    height: normalize.setNormalize(60),
    width: normalize.setNormalize(300),
    paddingLeft: normalize.setNormalize(15),
    fontSize: normalize.setNormalize(20),
    fontFamily: Constants.FONT.family,
    color: "white",
    marginBottom: normalize.setNormalize(30),
    borderWidth: 3,
  },

  textInputHeader: {
    color: "white",
    paddingLeft: normalize.setNormalize(15),
    paddingBottom: normalize.setNormalize(5),
    fontSize: normalize.setNormalize(18),
    fontFamily: Constants.FONT.family,
  },

  inputContainer: {
    paddingBottom: normalize.setNormalize(50),
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize.setNormalize(50),
    borderWidth: 1,
    paddingHorizontal: normalize.setNormalize(100),
    height: normalize.setNormalize(50),
    backgroundColor: "white",
  },

  buttonText: {
    fontSize: normalize.setNormalize(20),
    fontFamily: Constants.FONT.family,
    color: "black",
  },

  continueButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  passwordTextContainer: {
    display: "flex",
    flexDirection: "column",

  },

  passwordText: {
    fontSize: normalize.setNormalize(16)
  }
});
