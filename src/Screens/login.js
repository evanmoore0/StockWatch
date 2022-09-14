import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from "react-native";

import Graphic from "../Components/graphic";
import { SafeAreaView } from "react-native-safe-area-context";

import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../utils/Config/firebase-config";

import Constants from "../utils/Constants";
import normalize from "../utils/Style/normalize";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";


function Login(props) {
  //Hooks used to send email/password to firebase
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [displayReset, setDisplayReset] = useState(false);

  const [displayPhrase, setDisplayPhrase] = useState(false);
  const [resetUsername, setResetUsername] = useState("");

  const [disableUsername, setDisableUsername] = useState(true);

  const [secretPhraseOne, setSecretPhraseOne] = useState("");
  const [secretPhraseTwo, setSecretPhraseTwo] = useState("");
  const [secretPhraseThree, setSecretPhraseThree] = useState("");
  const [secretPhraseFour, setSecretPhraseFour] = useState("");
  const [secretPhraseFive, setSecretPhraseFive] = useState("");
  const [secretPhraseSix, setSecretPhraseSix] = useState("");

  const [displayNewPass, setDisplayNewPass] = useState(false);
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, `${email}@stockwatch.com`, password).catch(
      (error) => {
        switch (error.code) {
          case "auth/invalid-email":
            Alert.alert("Please input a valid username");
            break;
          case "auth/wrong-password":
            Alert.alert("Please input the correct password");
            break;
          case "auth/user-disabled":
            Alert.alert("Your account has been disabled :(");
            break;
          case "auth/user-not-found":
            Alert.alert(
              "We could not find a user with the given username and password"
            );
            break;
        }
      }
    );
  };

  const handleReset = () => {
    setDisplayReset(true);
  };

  const handleContinue = async () => {
    const phraseDoc = doc(db, "phrase", `${resetUsername}@stockwatch.com`);

    const phraseSnap = await getDoc(phraseDoc);

    setDisableUsername(false);

    if (phraseSnap.exists()) {
      setDisplayPhrase(true);
    } else {
      Alert.alert("Input a valid username");
    }
  };

  const handlePhrase = async () => {
    const phraseDoc = doc(db, "phrase", `${resetUsername}@stockwatch.com`);

    await getDoc(phraseDoc).then((data) =>
      JSON.stringify(data.data().phrase) ===
      JSON.stringify([
        secretPhraseOne,
        secretPhraseTwo,
        secretPhraseThree,
        secretPhraseFour,
        secretPhraseFive,
        secretPhraseSix,
      ])
        ? setDisplayNewPass(true)
        : alert("Incorrect phrase")
    );
  };

  const handleChangePassword = async () => {
    if (newPassword != confirmNewPass) {
      alert("Passwords do not match");
    } else if (newPassword.length <= 6) {
      alert("please input a password longer than 6 characters");
    } else {
      const phraseDoc = doc(db, "phrase", `${resetUsername}@stockwatch.com`);

      await getDoc(phraseDoc).then((data) => {
        signInWithEmailAndPassword(
          auth,
          `${resetUsername}@stockwatch.com`,
          data.data().password
        ).then(() => {
          updatePassword(auth.currentUser, newPassword)
            .then(() => {
              Alert.alert("Password Updated");
            })
            .catch((error) => {
              alert(error.code);
            });
        });
      });
    }
  };

  return (
    <SafeAreaView>
      <Modal
        visible={displayReset}
        presentationStyle="overFullScreen"
        animationType="fade"
        transparent={true}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={loginStyles.modalContainer}
        >
          <View style={loginStyles.modalBackground}>
            <View style={loginStyles.modalHeaderContainer}>
              <Text style={{ color: "white", fontWeight: "900" }}>
                RESET PASSWORD
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setDisplayReset(false);
                  setDisableUsername("");
                  setSecretPhraseOne(true);
                  setSecretPhraseTwo("");
                  setSecretPhraseThree("");
                  setSecretPhraseFour("");
                  setSecretPhraseFive("");
                  setSecretPhraseSix("");
                  setDisplayPhrase(false);
                  setDisableUsername(true);
                }}
                style={loginStyles.modalCloseContainer}
              >
                <AntDesign
                  name="close"
                  size={normalize.setNormalize(24)}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            <Text style={loginStyles.secretPhrase}>Input Username</Text>

            <TextInput
              onChangeText={(value) => setResetUsername(value)}
              style={loginStyles.modalUserNameInput}
              autoCapitalize={false}
              autoComplete={false}
              editable={disableUsername}
            />

            {displayPhrase ? (
              <>
                <Text style={loginStyles.secretPhrase}>
                  Input Secret Phrase
                </Text>

                <View style={loginStyles.resetInputContainer}>
                  <TextInput
                    autoCapitalize={false}
                    placeholder="1"
                    onChangeText={(val) => setSecretPhraseOne(val)}
                    style={loginStyles.resetInput}
                  />
                  <TextInput
                    autoCapitalize={false}
                    placeholder="2"
                    onChangeText={(val) => setSecretPhraseTwo(val)}
                    style={loginStyles.resetInput}
                  />
                  <TextInput
                    autoCapitalize={false}
                    placeholder="3"
                    onChangeText={(val) => setSecretPhraseThree(val)}
                    style={loginStyles.resetInput}
                  />
                </View>
                <View style={loginStyles.resetInputContainer}>
                  <TextInput
                    autoCapitalize={false}
                    placeholder="4"
                    onChangeText={(val) => setSecretPhraseFour(val)}
                    style={loginStyles.resetInput}
                  />
                  <TextInput
                    autoCapitalize={false}
                    placeholder="5"
                    onChangeText={(val) => setSecretPhraseFive(val)}
                    style={loginStyles.resetInput}
                  />
                  <TextInput
                    autoCapitalize={false}
                    placeholder="6"
                    onChangeText={(val) => setSecretPhraseSix(val)}
                    style={loginStyles.resetInput}
                  />
                </View>
              </>
            ) : (
              <></>
            )}

            {displayNewPass ? (
              <>
                <Text style={loginStyles.secretPhrase}>Input New Password</Text>

                <TextInput
                  secureTextEntry
                  placeholder="enter password"
                  placeholderTextColor="white"
                  keyboardType="visible-password"
                  autoCapitalize="none"
                  autoComplete="password"
                  onChangeText={(val) => setNewPassword(val)}
                  style={loginStyles.newPassword}
                />
                <TextInput
                  secureTextEntry
                  placeholder="enter password"
                  placeholderTextColor="white"
                  keyboardType="visible-password"
                  autoCapitalize="none"
                  autoComplete="password"
                  onChangeText={(val) => setConfirmNewPass(val)}
                  style={loginStyles.newPassword}
                />
              </>
            ) : (
              <></>
            )}

            <TouchableOpacity
              onPress={() => {
                displayNewPass
                  ? handleChangePassword()
                  : displayPhrase
                  ? handlePhrase()
                  : handleContinue();
              }}
              style={loginStyles.modalContinueContainer}
            >
              <Text style={{ color: "white" }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
            <Text style={loginStyles.textInputHeader}>username</Text>
            <TextInput
              style={loginStyles.textInput}
              placeholder="enter username"
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
          <TouchableOpacity
            onPress={() => {
              handleReset();
            }}
          >
            <Text style={loginStyles.resetText}>Reset Password</Text>
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
    fontSize: normalize.setNormalize(18),
  },

  textInput: {
    backgroundColor: Constants.THEME_COLOR.green,
    borderRadius: normalize.setNormalize(50),
    borderWidth: normalize.setNormalize(4),
    borderColor: Constants.THEME_COLOR.blue,
    height: normalize.setNormalize(40),
    width: normalize.setNormalize(300),
    paddingLeft: normalize.setNormalize(15),
    fontSize: normalize.setNormalize(16),
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

  resetText: {
    color: "gray",
    fontSize: normalize.setNormalize(14),
    marginTop: normalize.setNormalize(10),
  },

  modalContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBackground: {
    display: "flex",
    backgroundColor: "gray",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "30%",
    width: "90%",
    padding: normalize.setNormalize(30),
  },

  modalHeaderContainer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "white",
    width: "100%",
    alignItems: "center",
  },

  resetInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "5%",
  },

  secretPhrase: {
    color: "white",
    alignSelf: "flex-start",
    marginVertical: "5%",
  },

  resetInput: {
    backgroundColor: "white",
    width: "25%",
    color: Constants.THEME_COLOR.blue,
    padding: normalize.setNormalize(10),
    borderRadius: "5%",
  },
  modalCloseContainer: {
    backgroundColor: Constants.THEME_COLOR.blue,
    padding: normalize.setNormalize(6),
    borderRadius: "50%",
  },

  modalContinueContainer: {
    display: "flex",
    backgroundColor: Constants.THEME_COLOR.blue,
    borderRadius: "30%",
    padding: normalize.setNormalize(6),
  },

  modalUserNameInput: {
    display: "flex",
    color: Constants.THEME_COLOR.blue,
    padding: normalize.setNormalize(10),
    borderRadius: "5%",
    backgroundColor: "white",
    width: "100%",
    marginBottom: "5%",
  },

  newPassword: {
    backgroundColor: "white",
    color: Constants.THEME_COLOR.blue,
    padding: normalize.setNormalize(10),
    borderRadius: "5%",
    display: "flex",
    width: "100%",
    marginBottom: "5%",
  },
});
