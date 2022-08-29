import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import normalize from "../utils/normalize";
import Graphic from "../globalComponents/graphic";
import { auth } from "../utils/firebase-config";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login(props) {
  //Hooks used to send email/password to firebase
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Sign the user in if the account exists
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={{ paddingTop: normalize.setNormalize(20) }}>
        <TouchableOpacity
          style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            props.navigation.replace("Welcome");
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={normalize.setNormalize(30)}
            color="white"
          />
          <Text
            style={{
              fontSize: normalize.setNormalize(20),
              color: "white",
              fontWeight: "700",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            height: normalize.setNormalize(55),
            width: "100%",
            paddingTop: normalize.setNormalize(50),
          }}
        >
          <Graphic scale={0.3} />
        </View>

        <View style={loginStyles.entryContainer}>
          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.textInputHeader}>email</Text>
            <TextInput
              style={loginStyles.textInput}
              placeholder="enter email"
              placeholderTextColor="white"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>

          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.textInputHeader}>password</Text>
            <TextInput
              style={loginStyles.textInput}
              secureTextEntry
              placeholder="enter password"
              placeholderTextColor="white"
              keyboardType="visible-password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={loginStyles.buttonContainer}
            onPress={() => {
              handleLogin();
            }}
          >
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;

const loginStyles = StyleSheet.create({
  entryContainer: {
    width: "100%",
    paddingTop: normalize.setNormalize(45),
    justifyContent: "center",
    alignItems: "center",
  },

  textInputHeader: {
    color: Constants.THEME_COLOR.blue,
    paddingLeft: normalize.setNormalize(15),
    paddingBottom: normalize.setNormalize(5),
  },

  textInput: {
    backgroundColor: Constants.THEME_COLOR.green,
    borderRadius: normalize.setNormalize(50),
    borderWidth: normalize.setNormalize(4),
    borderColor: Constants.THEME_COLOR.blue,
    height: normalize.setNormalize(40),
    width: normalize.setNormalize(300),
    paddingLeft: normalize.setNormalize(15),
    fontSize: normalize.setNormalize(12),
    color: "white",
  },

  inputContainer: {
    paddingBottom: normalize.setNormalize(50),
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize.setNormalize(50),
    backgroundColor: Constants.THEME_COLOR.green,
    paddingHorizontal: normalize.setNormalize(70),
    height: normalize.setNormalize(40),
  },

  buttonText: {
    fontSize: normalize.setNormalize(16),
    color: "white",
  },
});
