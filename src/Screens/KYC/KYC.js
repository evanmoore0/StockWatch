import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "../../utils/Constants";
import normalize from "../../utils/Style/normalize";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import Checkbox from "expo-checkbox";

import { useNavigation } from "@react-navigation/native";

// UNINSTALL THIS PACKAGE
// import WheelPickerExpo from 'react-native-wheel-picker-expo';

import DropDownPicker from "react-native-dropdown-picker";

import Header from "../../Components/inputHeader";
import KYCButton from "../../Components/kyc/button";
import DropDown from "../../Components/kyc/DropDown";

// const accountFunding = 'employment_income,investments,inheritance,business_income,savings,family'.split(',');

// const employedStatus = 'employed,unemployed,student,retired'.split(',');

export default function KYC() {
  // Create states for all of the input fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [dob, setDob] = useState("");
  const [taxId, setTaxId] = useState("");
  const [taxIdType, setTaxIdType] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [birthCountry, setBirthCountry] = useState("");
  const [taxResidence, setTaxResidence] = useState("");
  const [fundingSource, setFundingSource] = useState("");
  const [isControlPerson, setIsControlPerson] = useState("");
  const [isAffiliatedExchangeOrFinra, setIsAffiliatedExchangeOrFinra] =
    useState("");
  const [isPoliticallyExposed, setIsPoliticallyExposed] = useState("");
  const [immediateFamilyExposed, setImmediateFamilyExposed] = useState("");
  const [agreement, setAgreement] = useState("");
  const [signedAt, setSignedAt] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  const [documentType, setDocumentType] = useState("");
  const [documentSubType, setDocumentSubType] = useState("");

  const [content, setContent] = useState("");

  const [mimeType, setMimeType] = useState("");
  const [trustedGivenName, setTrustedGivenName] = useState("");
  const [trustedFamilyName, setTrustedFamilyName] = useState("");
  const [trustedEmailAddress, setTrustedEmailAddress] = useState("");

  const [socialSecurity, setSocialSecurity] = useState("");

  const [maximumInvestable, setMaximumInvestable] = useState("");
  const [minimumInvestable, setMinimumInvestable] = useState("");

  const [employerAddress, setEmployerAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [employerName, setEmployerName] = useState("");

  const [countryOfTaxResidence, setCountryOfTaxResidence] = useState("");

  const navigation = useNavigation();

  function GetKyc() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Basic e3thcGlfa2V5fX06e3thcGlfc2VjcmV0fX0="
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      contact: {
        email_address: "alpaca@example.com",
        phone_number: "555-666-7788",
        street_address: ["20 N San Mateo Dr"],
        city: "San Mateo",
        state: "CA",
        postal_code: "94401",
        country: "USA",
      },
      identity: {
        given_name: "John",
        family_name: "Doe",
        date_of_birth: "1990-01-01",
        tax_id: "666-55-4321",
        tax_id_type: "USA_SSN",
        country_of_citizenship: "USA",
        country_of_birth: "USA",
        country_of_tax_residence: "USA",
        funding_source: ["employment_income"],
      },
      disclosures: {
        is_control_person: false,
        is_affiliated_exchange_or_finra: false,
        is_politically_exposed: false,
        immediate_family_exposed: false,
      },
      agreements: [
        {
          agreement: "margin_agreement",
          signed_at: "2020-09-11T18:09:33Z",
          ip_address: "185.13.21.99",
        },
        {
          agreement: "account_agreement",
          signed_at: "2020-09-11T18:13:44Z",
          ip_address: "185.13.21.99",
        },
        {
          agreement: "customer_agreement",
          signed_at: "2020-09-11T18:13:44Z",
          ip_address: "185.13.21.99",
        },
      ],
      //   documents: [
      //     {
      //       document_type: "identity_verification",
      //       document_sub_type: "passport",
      //       content: "/9j/Cg==",
      //       mime_type: "image/jpeg",
      //     },
      //   ],
      trusted_contact: {
        given_name: "Jane",
        family_name: "Doe",
        email_address: "jane.doe@example.com",
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("{{HOST}}/v1/accounts", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDatePicker = (date) => {
    setDob(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    setDatePickerVisibility(false);
  };

  const [isChecked, setChecked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [index, setIndex] = useState(0);

  //   const Input = ({title, props}) => {
  //     console.log("HERE")
  //     console.log(...props)
  //     return(
  //         <View style = {{backgroundColor: "green"}}>
  //             <Text style = {KYCstyles.title}>{title}</Text>
  //             <TextInput
  //             {...props}
  //             />
  //         </View>
  //     )
  //   }

  const KYCInput = ({ title, Input }) => {
    return (
      <View style={KYCstyles.KYCinputContainer}>
        <Text style={KYCstyles.title}>{title}</Text>
        <Input />
      </View>
    );
  };

  const [accountFundingOpen, setAccountFundingOpen] = useState(false);
  const [accountFundingValue, setAccountFundingValue] = useState(null);
  const [accountFundingItems, setAccountFundingItems] = useState([
    { label: "Employment Income", value: "employment_income" },
    { label: "Investments", value: "investments" },
    { label: "Inheritance", value: "inheritance" },
    { label: "Business Income", value: "business_income" },
    { label: "Savings", value: "savings" },
    { label: "Family", value: "family" },
  ]);

  const [employmentStatusOpen, setEmploymentStatusOpen] = useState(false);
  const [employmentStatusValue, setEmploymentStatusValue] = useState(null);
  const [employmentStatusItems, setEmploymentStatusItems] = useState([
    { label: "Employed", value: "employed" },
    { label: "Unemployed", value: "unemployed" },
    { label: "Student", value: "student" },
    { label: "Retired", value: "retired" },
  ]);

  const InfoButton = ({ children, handleInfoButton }) => {
    return (
      <TouchableOpacity
        style={KYCstyles.infoButtonContainer}
        onPress={() => handleInfoButton()}
      >
        {children}
      </TouchableOpacity>
    );
  };

  const [displayPersonal, setDisplayPersonal] = useState(false);
  const [displayFinancial, setDisplayFinancial] = useState(false);
  const [displayAgreements, setDisplayAgreements] = useState(false);

  function ValidateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }

  const [stateOpen, setStateOpen] = useState(false);
  const [stateItems, setStateItems] = useState([
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "American Samoa", value: "AS" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "District of Columbia", value: "DC" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Guam", value: "GU" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Northern Mariana Islands", value: "MP" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Puerto Rico", value: "PR" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virgin Islands", value: "VI" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
  ]);

  const [displayPage, setDisplayPage] = useState(0);

  function handleP1Submit() {
    if (
      state.length > 0 &&
      city.length > 0 &&
      postal.length >= 5 &&
      street.length > 0
    ) {
      setDisplayPage(1);
    } else {
      alert("Please fill out all fields");
    }
  }

  const [personalSubmitted, setPersonalSubmitted] = useState(false);
  const [financialSumbitted, setFinancialSubmitted] = useState(false);
  const [agreementsSubmitted, setAgreementsSubmitted] = useState(false);

  const [displayFinancialPage, setDisplayFinancialPage] = useState(0);

  function handleP2Submit() {
    setPersonalSubmitted(true);
    setDisplayPersonal(false);
  }

  function handleFinanceP1Submit() {
    setDisplayFinancialPage(1);
  }

  function handleFinanceP2Submit() {
    setDisplayFinancial(false);
    setFinancialSubmitted(true)
  }

  function handleAgreementSubmit() {
    setDisplayAgreements(false);
    setAgreementsSubmitted(true)
  }

  function handleKYCSubmit() {
    navigation.navigate("ACH")
  }

  return (
    <SafeAreaView style={KYCstyles.pageContainer}>
      <Modal
        presentationStyle="overFullScreen"
        animationType="fade"
        visible={displayPersonal}
      >
        <SafeAreaView
          style={{
            backgroundColor: "black",
          }}
        >
          <KeyboardAvoidingView
            behavior="padding"
            style={KYCstyles.modalContainer}
          >
            {displayPage === 0 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setDisplayPersonal(false);
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
                {/* <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 6 ? 1 : 4,
                      borderColor:
                        index == 6 ? "white" : Constants.THEME_COLOR.light_gray,
                    },
                  ]}
                  autoCorrect="false"
                  autoComplete="false"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Country"
                  value={"USA"}
                  onFocus={() => setIndex(6)}
                  onChangeText={(text) => {
                    setCountry(text);
                  }}
                /> */}
                <DropDown
                  open={stateOpen}
                  value={state}
                  items={stateItems}
                  setOpen={setStateOpen}
                  setValue={setState}
                  setItems={setStateItems}
                  onOpen={() => setIndex(4)}
                  onClose={() => setIndex(5)}
                  index={index}
                  placeholder={"State"}
                  margin={normalize.setNormalize(200)}
                />

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 10 ? 1 : 4,
                      borderColor:
                        index == 10
                          ? "white"
                          : Constants.THEME_COLOR.light_gray,
                    },
                  ]}
                  onFocus={() => setIndex(10)}
                  autoCorrect="false"
                  autoComplete="false"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="City"
                  value={city}
                  onChangeText={(text) => {
                    setCity(text);
                  }}
                />

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 5 ? 1 : 4,
                      borderColor:
                        index == 5 ? "white" : Constants.THEME_COLOR.light_gray,
                    },
                  ]}
                  autoCorrect="true"
                  autoComplete="postal-code"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  inputMode="numeric"
                  keyboardType="number-pad"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Postal Code"
                  value={postal}
                  onFocus={() => setIndex(5)}
                  onBlur={() =>
                    postal.length >= 5
                      ? null
                      : alert("Postal Code must be 5 digits")
                  }
                  onChangeText={(text) => {
                    setPostal(`${text}`);
                  }}
                />

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 3 ? 1 : 4,
                      borderColor:
                        index == 3 ? "white" : Constants.THEME_COLOR.light_gray,
                    },
                  ]}
                  onFocus={() => setIndex(3)}
                  autoCorrect="false"
                  autoComplete="address-line1"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Address"
                  value={street}
                  onChangeText={(text) => {
                    setStreet([text]);
                  }}
                />

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <KYCButton
                    text={"Continue"}
                    onPress={() => handleP1Submit()}
                  />
                  <Text
                    style={{
                      color: Constants.THEME_COLOR.light_gray,
                      fontFamily: Constants.FONT.family,
                      marginTop: normalize.setNormalize(10),
                      fontSize: normalize.setNormalize(16),
                    }}
                  >
                    1/2
                  </Text>
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setDisplayPage(0);
                  }}
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: normalize.setNormalize(20),
                  }}
                >
                  <Ionicons
                    name="chevron-back"
                    size={normalize.setNormalize(24)}
                    color="white"
                  />
                </TouchableOpacity>
                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 1 ? 1 : 4,
                      borderColor:
                        index == 1 ? "white" : Constants.THEME_COLOR.light_gray,
                    },
                  ]}
                  autoCorrect="false"
                  autoComplete="false"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  keyboardType="email-address"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Email Address"
                  value={email}
                  onBlur={() => ValidateEmail()}
                  onFocus={() => setIndex(1)}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />

                <TouchableOpacity
                  style={[
                    KYCstyles.input,
                    { display: "flex", justifyContent: "center" },
                  ]}
                  onPress={() => setDatePickerVisibility(true)}
                >
                  <Text
                    style={{
                      color: dob ? "white" : Constants.THEME_COLOR.light_gray,
                      fontSize: normalize.setNormalize(20),
                      fontFamily: Constants.FONT.family,
                    }}
                  >
                    {dob ? dob : "Date of Birth"}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDatePicker}
                  onCancel={() => setDatePickerVisibility(false)}
                  isDarkModeEnabled={true}
                  buttonTextColorIOS={"white"}
                  textColor="white"
                />

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 2 ? 1 : 4,
                      borderColor:
                        index == 2 ? "white" : Constants.THEME_COLOR.light_gray,
                    },
                  ]}
                  onFocus={() => setIndex(2)}
                  autoCorrect="false"
                  autoComplete="false"
                  returnKeyType="next"
                  inputMode="numeric"
                  keyboardType="number-pad"
                  keyboardAppearance="dark"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Social Security Number"
                  value={socialSecurity}
                  onChangeText={(e) => {
                    setSocialSecurity(e);
                  }}
                />

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 8 ? 1 : 4,
                      borderColor:
                        index == 8 ? "white" : Constants.THEME_COLOR.light_gray,
                    },
                  ]}
                  autoCorrect="false"
                  autoComplete="country-name"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Country of Tax Residence"
                  value={countryOfTaxResidence}
                  onChange={(text) => {
                    setCountryOfTaxResidence(text);
                  }}
                  onFocus={() => setIndex(8)}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <KYCButton text={"Submit"} onPress={() => handleP2Submit()} />
                  <Text
                    style={{
                      color: Constants.THEME_COLOR.light_gray,
                      fontFamily: Constants.FONT.family,
                      marginTop: normalize.setNormalize(10),
                      fontSize: normalize.setNormalize(16),
                    }}
                  >
                    2/2
                  </Text>
                </View>
              </>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      <Modal
        presentationStyle="overFullScreen"
        animationType="fade"
        visible={displayFinancial}
      >
        <SafeAreaView
          style={{
            backgroundColor: "black",
          }}
        >
          <KeyboardAvoidingView
            behavior="padding"
            style={KYCstyles.modalContainer}
          >
            {displayFinancialPage == 0 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setDisplayFinancial(false);
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
                {/* <View style={KYCstyles.checkBoxContainer}>
              <Text style={KYCstyles.checkBoxText}>Are you a US citizen?</Text>

              <Checkbox value={isChecked} onValueChange={setChecked} />
            </View> */}

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 9 ? 4 : 1,
                    },
                  ]}
                  autoCorrect="false"
                  autoComplete="false"
                  returnKeyType="next"
                  keyboardType="number-pad"
                  inputMode="numeric"
                  keyboardAppearance="dark"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Minimum Investable Assets"
                  onChange={(e) => {
                    setMinimumInvestable(e.target.value);
                  }}
                  onFocus={() => setIndex(9)}
                />

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 10 ? 4 : 1,
                    },
                  ]}
                  autoCorrect="false"
                  autoComplete="false"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  keyboardType="number-pad"
                  inputMode="numeric"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Maximum Investable Assets"
                  onChange={(e) => {
                    setMaximumInvestable(e.target.value);
                  }}
                  onFocus={() => setIndex(10)}
                />

                <DropDown
                  open={accountFundingOpen}
                  value={accountFundingValue}
                  items={accountFundingItems}
                  setOpen={setAccountFundingOpen}
                  setValue={setAccountFundingValue}
                  setItems={setAccountFundingItems}
                  margin={normalize.setNormalize(10)}
                  index={index}
                  onClose={() => console.log("HI")}
                  onOpen={() => console.log("HI2")}
                  placeholder="Account Funding Source"
                />

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <KYCButton
                    text={"Continue"}
                    onPress={() => handleFinanceP1Submit()}
                  />
                  <Text
                    style={{
                      color: Constants.THEME_COLOR.light_gray,
                      fontFamily: Constants.FONT.family,
                      marginTop: normalize.setNormalize(10),
                      fontSize: normalize.setNormalize(16),
                    }}
                  >
                    1/2
                  </Text>
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setDisplayPage(0);
                  }}
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: normalize.setNormalize(20),
                  }}
                >
                  <Ionicons
                    name="chevron-back"
                    size={normalize.setNormalize(24)}
                    color="white"
                  />
                </TouchableOpacity>

                <DropDown
                  onOpen={() => console.log("HITHERE")}
                  onClose={() => console.log("HI 2")}
                  index={index}
                  placeholder="Employment Status"
                  margin={normalize.setNormalize(20)}
                  open={employmentStatusOpen}
                  value={employmentStatusValue}
                  items={employmentStatusItems}
                  setOpen={setEmploymentStatusOpen}
                  setValue={setEmploymentStatusValue}
                  setItems={setEmploymentStatusItems}
                />

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 11 ? 4 : 1,
                    },
                  ]}
                  autoCorrect="false"
                  autoComplete="false"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Name of Employer"
                  onChange={(e) => {
                    setNameOfEmployer(e.target.value);
                  }}
                  onFocus={() => setIndex(11)}
                />

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 12 ? 4 : 1,
                    },
                  ]}
                  autoCorrect="false"
                  autoComplete="false"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Employer Address"
                  onChange={(e) => {
                    setEmployerAddress(e.target.value);
                  }}
                  onFocus={() => setIndex(12)}
                />

                <TextInput
                  style={[
                    KYCstyles.input,
                    {
                      borderWidth: index == 13 ? 4 : 1,
                    },
                  ]}
                  autoCorrect="false"
                  autoComplete="false"
                  returnKeyType="next"
                  keyboardAppearance="dark"
                  placeholderTextColor={Constants.THEME_COLOR.light_gray}
                  selectionColor={Constants.THEME_COLOR.light_gray}
                  placeholder="Occupation"
                  onChange={(e) => {
                    setOccupation(e.target.value);
                  }}
                  onFocus={() => setIndex(13)}
                />

                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <KYCButton text={"Submit"} onPress={() => handleFinanceP2Submit()} />
                  <Text
                    style={{
                      color: Constants.THEME_COLOR.light_gray,
                      fontFamily: Constants.FONT.family,
                      marginTop: normalize.setNormalize(10),
                      fontSize: normalize.setNormalize(16),
                    }}
                  >
                    2/2
                  </Text>
                </View>
              </>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      <Modal
        presentationStyle="overFullScreen"
        animationType="fade"
        visible={displayAgreements}
      >
        <SafeAreaView
          style={{
            backgroundColor: "black",
          }}
        >
          <KeyboardAvoidingView
            behavior="padding"
            style={KYCstyles.modalContainer}
          >

              <TouchableOpacity
                  onPress={() => {
                    setDisplayAgreements(false);
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

               <View style={KYCstyles.checkBoxContainer}>
              <Text style={KYCstyles.checkBoxText}>Are you a US citizen?</Text>

              <Checkbox value={isChecked} onValueChange={setChecked} />
            </View>

            <View style={KYCstyles.checkBoxContainer}>
              <Text style={KYCstyles.checkBoxText}>Are you a US citizen?</Text>

              <Checkbox value={isChecked} onValueChange={setChecked} />
            </View>

            <View style={KYCstyles.checkBoxContainer}>
              <Text style={KYCstyles.checkBoxText}>Are you a US citizen?</Text>

              <Checkbox value={isChecked} onValueChange={setChecked} />
            </View>


            {isChecked ? <>
              <KYCButton text={"Submit"} onPress={() => handleAgreementSubmit()} />
            </> : <>
            </>}


          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      <Header title="Account Information" />
      <InfoButton handleInfoButton={() => setDisplayPersonal(true)}>
        <View>
          <Text
            style={[
              KYCstyles.infoButtonText,
              {
                color: personalSubmitted
                  ? Constants.THEME_COLOR.green
                  : "white",
              },
            ]}
          >
            Personal
          </Text>
          <Text style={KYCstyles.infoButtonSubtext}>~ 1 minute</Text>
        </View>
        <Ionicons
          name="ios-person-add-sharp"
          size={normalize.setNormalize(24)}
          color={personalSubmitted ? Constants.THEME_COLOR.green : "white"}
        />
      </InfoButton>

      <InfoButton handleInfoButton={() => setDisplayFinancial(true)}>
        <View>
          <Text style={[KYCstyles.infoButtonText, {color: financialSumbitted ? Constants.THEME_COLOR.green: "white"}]}>Financial</Text>
          <Text style={KYCstyles.infoButtonSubtext}>~ 1 minute</Text>
        </View>
        <FontAwesome5
          name="money-check-alt"
          size={normalize.setNormalize(24)}
          color={financialSumbitted ? Constants.THEME_COLOR.green : "white"}
        />
      </InfoButton>

      <InfoButton handleInfoButton={() => setDisplayAgreements(true)}>
        <View>
          <Text style={[KYCstyles.infoButtonText, {color: agreementsSubmitted ? Constants.THEME_COLOR.green : "white"}]}>Agreements</Text>
          <Text style={KYCstyles.infoButtonSubtext}>~ 1 minute</Text>
        </View>
        <Foundation
          name="check"
          size={normalize.setNormalize(24)}
          color={agreementsSubmitted ? Constants.THEME_COLOR.green : "white"}
        />
      </InfoButton>

      {
        personalSubmitted && financialSumbitted && agreementsSubmitted ?
        <KYCButton text={"Submit"} onPress={() => handleKYCSubmit()} /> : <></>
      }
    </SafeAreaView>
  );
}

const KYCstyles = StyleSheet.create({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
  },

  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  input: {
    width: "100%",
    borderWidth: 4,
    borderColor: Constants.THEME_COLOR.light_gray,
    borderRadius: 5,
    height: normalize.setNormalize(60),
    width: normalize.setNormalize(300),
    color: Constants.THEME_COLOR.green,
    fontSize: normalize.setNormalize(20),
    fontFamily: Constants.FONT.family,
    color: "white",
    paddingLeft: normalize.setNormalize(10),
    marginVertical: normalize.setNormalize(15),
  },

  checkBoxText: {
    color: "white",
    fontSize: normalize.setNormalize(20),
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

  infoButtonContainer: {
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

  infoButtonText: {
    color: "white",
    fontFamily: Constants.FONT.family,
    fontSize: normalize.setNormalize(16),
    fontWeight: "900",
  },

  infoButtonSubtext: {
    color: Constants.THEME_COLOR.light_gray,
    fontSize: normalize.setNormalize(12),
    fontFamily: Constants.FONT.family,
  },

  modalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
    width: "100%",
  },
});
