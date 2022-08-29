import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import normalize from "../utils/normalize";
import Graphic from "../globalComponents/graphic";
import { auth, db } from "../utils/firebase-config";
import Constants from "../Constants";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  async function HandleRegister() {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email + "@stockwatch.com",
        password
      ).then((authData) => {
        const docRef = doc(db, "users", authData.user.uid);

        setDoc(docRef, {
          email: authData.user.email,
          stocks: [],
        });
      });
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-exists":
          alert("Username already exists");
          break;
        case "auth/invalid-email":
          alert("Please remove symbols");
      }

      alert(error.message);
    }
  }

  const handlePress = () => {
    if (!password) {
      Alert.alert("Password is required");
    } else if (!confirmPassowrd) {
      Alert.alert("Confirm password is required");
    } else if (confirmPassowrd != password) {
      Alert.alert("Password does not match!");
    } else {
      HandleRegister();
    }
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
            Register
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

        <View style={RegisterStyles.entryContainer}>
          <View style={RegisterStyles.inputContainer}>
            <Text style={RegisterStyles.textInputHeader}>username</Text>
            <TextInput
              style={RegisterStyles.textInput}
              placeholder="enter username"
              placeholderTextColor="white"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="default"
              autoCorrect={false}
              onChangeText={(text) => {
                console.log("IN HERE");
                setEmail(text);
              }}
            />
          </View>

          <View style={RegisterStyles.inputContainer}>
            <Text style={RegisterStyles.textInputHeader}>password</Text>
            <TextInput
              style={RegisterStyles.textInput}
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

          <View style={RegisterStyles.inputContainer}>
            <Text style={RegisterStyles.textInputHeader}>confirm password</Text>
            <TextInput
              style={RegisterStyles.textInput}
              secureTextEntry
              placeholder="confirm password"
              placeholderTextColor="white"
              keyboardType="visible-password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              onChangeText={(text) => {
                setConfirmPassword(text);
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
            style={RegisterStyles.buttonContainer}
            onPress={() => {
              handlePress();
            }}
          >
            <Text style={RegisterStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Register;

const RegisterStyles = StyleSheet.create({
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
