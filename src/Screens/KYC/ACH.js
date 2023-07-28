import { useRef, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import Header from "../../Components/inputHeader";

import Constants from "../../utils/Constants";

import normalize from "../../utils/Style/normalize";

import DropDownPicker from "react-native-dropdown-picker";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import KYCButton from "../../Components/kyc/button";

import React from "react";
import PlaidLink from "@burstware/expo-plaid-link";
import DropDown from "../../Components/kyc/DropDown";
// import Config from './config'

export default function ACH() {
  const [accountOwner, setAccountOwner] = useState("");
  const [bankAccountType, setBankAccountType] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankRoutingNumber, setBankRoutingNumber] = useState("");

  const [nickName, setNickName] = useState("");

  const [index, setIndex] = useState(0);

  const navigation = useNavigation();


  const testRef = useRef()



  const [accountTypeOpen, setAccountTypeOpen] = useState(false);
  const [accountTypeValue, setAccountTypeValue] = useState(null);
  const [accountTypeItems, setAccountTypeItems] = useState([
    { label: "Checking", value: "CHECKING" },
    { label: "Savings", value: "SAVINGS" },
  ]);

  async function CreateACHRelationship() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Basic e3thcGlfa2V5fX06e3thcGlfc2VjcmV0fX0="
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      account_owner_name: "Christie Ruales",
      bank_account_type: "CHECKING",
      bank_account_number: "01020304abc",
      bank_routing_number: "121000358",
      nickname: "Bank of America Checking",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("{{HOST}}/v1/accounts/:account_id/ach_relationships", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  const BankButton = ({ children, handleBankButton }) => {
    return (
      <TouchableOpacity
        style={ACHStyles.bankButtonContainer}
        onPress={() => handleBankButton()}
      >
        {children}
      </TouchableOpacity>
    );
  };

  const [displayManual, setDisplayManual] = useState(false);

  const [displayLink, setDisplayLink] = useState(false);
  return (
    <SafeAreaView style={{ height: Dimensions.get("screen").height }}>
      <Modal
        presentationStyle="overFullScreen"
        animationType="fade"
        visible={displayManual}
        
      >
        <SafeAreaView
      
      style={{
        backgroundColor: "black",
      }}
    >
      <KeyboardAvoidingView
      
        behavior="padding"
        style={ACHStyles.modalContainer}
      >
        <TouchableOpacity
          onPress={() => {
            setDisplayManual(false);
          }}
          style={{
            alignSelf: "flex-start",
            marginLeft: normalize.setNormalize(20),
          }}
        >
          <AntDesign
            name="close"
            size={normalize.setNormalize(24)}
            color="white"
          />
        </TouchableOpacity>
        <TextInput
          style={[
            ACHStyles.input,
            {
              borderWidth: index == 0 ? 1 : 4,
              borderColor: index == 0 ? "white" : Constants.THEME_COLOR.light_gray,
            },
          ]}
          autoCorrect="false"
          autoComplete="false"
          returnKeyType="next"
          keyboardAppearance="dark"
          placeholderTextColor={Constants.THEME_COLOR.light_gray}
          selectionColor={Constants.THEME_COLOR.light_gray}
          placeholder="Account Owner's Name"
          value = {accountOwner}
          ref = {testRef}
          onChange={(text) => {
            // setAccountOwner(e.target.value);
            setAccountOwner(text.target)
          }}
          onFocus={() => setIndex(0)}
        />

        <DropDown
        open={accountTypeOpen}
        value={accountTypeValue}
        items={accountTypeItems}
        setOpen={setAccountTypeOpen}
        setValue={setAccountTypeValue}
        setItems={setAccountTypeItems}
        onOpen = {() => setIndex(4)}
        onClose = {() => setIndex(5)}
        index = {index}
        placeholder = {"Account Type"}
        />

        <TextInput
          style={[
            ACHStyles.input,
            {
              borderWidth: index == 1 ? 1 : 4,
              borderColor: index == 1 ? "white" : Constants.THEME_COLOR.light_gray,
            },
          ]}
          autoCorrect="false"
          autoComplete="false"
          returnKeyType="next"
          keyboardAppearance="dark"
          keyboardType="numeric"
          placeholderTextColor={Constants.THEME_COLOR.light_gray}
          selectionColor={Constants.THEME_COLOR.light_gray}
          placeholder="Bank Account Number"
          onChangeText={(text) => {
            setBankAccountNumber(text)
          }}
          onFocus={() => setIndex(1)}
        />

        <TextInput
          style={[
            ACHStyles.input,
            {
              borderWidth: index == 2 ? 1 : 4,
              borderColor: index == 2 ? "white" : Constants.THEME_COLOR.light_gray,
            },
          ]}
          autoCorrect="false"
          autoComplete="false"
          returnKeyType="next"
          keyboardAppearance="dark"
          keyboardType="numeric"
          placeholderTextColor={Constants.THEME_COLOR.light_gray}
          selectionColor={Constants.THEME_COLOR.light_gray}
          placeholder="Bank Routing Number"
          onChangeText={(text) => {
            setBankRoutingNumber(text)
          }}
          onFocus={() => setIndex(2)}
        />

        <TextInput
          style={[
            ACHStyles.input,
            {
              borderWidth: index == 3 ? 1 : 4,
              borderColor: index == 3 ? "white" : Constants.THEME_COLOR.light_gray,
            },
          ]}
          autoCorrect="false"
          autoComplete="false"
          returnKeyType="next"
          keyboardAppearance="dark"
          placeholderTextColor={Constants.THEME_COLOR.light_gray}
          selectionColor={Constants.THEME_COLOR.light_gray}
          placeholder="Nick Name"
          onChangeText={(text) => {
            setNickName(text)
          }}
          onFocus={() => setIndex(3)}
        />

        <KYCButton
          text={"Submit"}
          onPress={() => navigation.navigate("Transfer")}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
      </Modal>

      {displayLink ? (
        <PlaidLink
          linkToken={"link-sandbox-4bafab8c-fca5-4ecc-aa75-49c8e7cc46e9"}
          onEvent={(event) => console.log("EVENT")}
          onExit={(exit) => {
            setDisplayLink(false);
            console.log(exit);
          }}
          onSuccess={(success) => console.log(success.publicToken)}
        />
      ) : (
        <View style={ACHStyles.pageContainer}>
          <Header title="Add Bank Account" />

          <BankButton handleBankButton={() => setDisplayLink(true)}>
            <View>
              <Text style={ACHStyles.bankButtonText}>Plaid</Text>
              <Text style={ACHStyles.bankButtonSubtext}>~ 2 minutes</Text>
            </View>
            <MaterialCommunityIcons
              name="bank"
              size={normalize.setNormalize(28)}
              color="white"
            />
          </BankButton>

          <BankButton handleBankButton={() => setDisplayManual(true)}>
            <View>
              <Text style={ACHStyles.bankButtonText}>Manual Entry</Text>
              <Text style={ACHStyles.bankButtonSubtext}>~ 10 minutes</Text>
            </View>
            <FontAwesome5
              name="money-check"
              size={normalize.setNormalize(20)}
              color="white"
            />
          </BankButton>
        </View>
      )}
    </SafeAreaView>
  );
}

const ACHStyles = StyleSheet.create({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContest: "center",
    alignItems: "center",
    width: "100%",
  },

  title: {
    marginBottom: normalize.setNormalize(30),
    fontWeight: "900",
    fontFamily: Constants.FONT.family,
    fontSize: normalize.setNormalize(16),
    color: "white",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Constants.THEME_COLOR.light_gray,
    borderRadius: 5,
    height: normalize.setNormalize(60),
    width: normalize.setNormalize(300),
    fontSize: normalize.setNormalize(20),
    fontFamily: Constants.FONT.family,
    paddingLeft: normalize.setNormalize(10),
    marginVertical: normalize.setNormalize(15),
    color: "white"
  },

  checkBoxText: {
    color: "white",
    fontSize: normalize.setNormalize(16),
    marginBottom: normalize.setNormalize(10),
  },

  checkBoxContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginVertical: normalize.setNormalize(15),
  },

  buttonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: normalize.setNormalize(80),
  },

  buttonText: {
    color: "white",
    fontWeight: "900",
  },

  button: {
    width: normalize.setNormalize(300),
    height: normalize.setNormalize(80),
    backgroundColor: Constants.THEME_COLOR.green,
  },

  bankButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Constants.THEME_COLOR.light_gray,
    padding: normalize.setNormalize(20),
    width: "60%",
    marginBottom: normalize.setNormalize(40),
    borderRadius: 5,
  },

  bankButtonText: {
    color: "white",
    fontFamily: Constants.FONT.family,
    fontSize: normalize.setNormalize(16),
    fontWeight: "900",
  },

  bankButtonSubtext: {
    color: Constants.THEME_COLOR.light_gray,
    fontSize: normalize.setNormalize(12),
    fontFamily: Constants.FONT.family,
  },

  modalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    justifyContent: "space-evenly",
  },

  dropDown: {
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    height: normalize.setNormalize(60),
    width: normalize.setNormalize(300),
  },

  dropDownText: {
    fontSize: normalize.setNormalize(20),
    color: "white",
    fontFamily: Constants.FONT.family
  },

  dropDownContainer: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  }

});
