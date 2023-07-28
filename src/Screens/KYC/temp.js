<KeyboardAvoidingView
// style={RegisterStyles.pageContainer}
keyboardVerticalOffset={10}
behavior="padding"
>
<ScrollView contentContainerStyle={KYCstyles.inputContainer}>
  <Header 
  title={"Account Information"}
  />

  {/* <TextInput
  style={[
    KYCstyles.input,
    {
      borderWidth: index == 0 ? 4 : 1,
    },
  ]}

  onFocus = {() => setIndex(0)}
  autoCorrect="false"
  autoComplete="false"
  returnKeyType="next"
  keyboardAppearance="dark"
  placeholderTextColor={Constants.THEME_COLOR.light_gray}
  selectionColor={Constants.THEME_COLOR.light_gray}
  placeholder="Given Name"
  onChange={(e) => {setGivenName(e.target.value)}}
/>

<TextInput
  style={[
    KYCstyles.input,
    {
      borderWidth: index == 1 ? 4 : 1,
    },
  ]}
  autoCorrect="false"
  autoComplete="false"
  returnKeyType="next"
  keyboardAppearance="dark"
  placeholderTextColor={Constants.THEME_COLOR.light_gray}
  selectionColor={Constants.THEME_COLOR.light_gray}
  placeholder="Family Name"
  onFocus = {() => setIndex(1)}
  onChange={(e) => {setFamilyName(e.target.value)}}

/> */}

  <TextInput
    style={[
      KYCstyles.input,
      {
        borderWidth: index == 1 ? 4 : 1,
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
    onFocus={() => setIndex(1)}
    onChange={(e) => {
      setEmail(e.target.value);
    }}
  />

  <Button title="Show Date Picker" onPress={showDatePicker} />
  <DateTimePickerModal
    isVisible={isDatePickerVisible}
    mode="date"
    onConfirm={handleConfirm}
    onCancel={hideDatePicker}
    isDarkModeEnabled={true}
    buttonTextColorIOS={"white"}
    // modalStyleIOS = {{backgroundColor: "black", color: "white"}}
    // backdropStyleIOS = {{backgroundColor: "black"}}
    // pickerStyleIOS = {{backgroundColor: "black": "white"}}
    textColor="white"
  />

  <TextInput
    style={[
      KYCstyles.input,
      {
        borderWidth: index == 2 ? 4 : 1,
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
    onChange={(e) => {
      setSocialSecurity(e.target.value);
    }}
  />

  <TextInput
    style={[
      KYCstyles.input,
      {
        borderWidth: index == 3 ? 4 : 1,
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
    onChange={(e) => {
      setStreet([e.target.value]);
    }}
  />

  <TextInput
    style={[
      KYCstyles.input,
      {
        borderWidth: index == 4 ? 4 : 1,
      },
    ]}
    onFocus={() => setIndex(4)}
    autoCorrect="false"
    autoComplete="false"
    returnKeyType="next"
    keyboardAppearance="dark"
    placeholderTextColor={Constants.THEME_COLOR.light_gray}
    selectionColor={Constants.THEME_COLOR.light_gray}
    placeholder="City"
    onChange={(e) => {
      setCity(e.target.value);
    }}
  />

  <TextInput
    style={[
      KYCstyles.input,
      {
        borderWidth: index == 5 ? 4 : 1,
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
    onFocus={() => setIndex(5)}
    onChange={(e) => {
      setPostal(e.target.value);
    }}
  />

  <TextInput
    style={[
      KYCstyles.input,
      {
        borderWidth: index == 6 ? 4 : 1,
      },
    ]}
    autoCorrect="false"
    autoComplete="false"
    returnKeyType="next"
    keyboardAppearance="dark"
    placeholderTextColor={Constants.THEME_COLOR.light_gray}
    selectionColor={Constants.THEME_COLOR.light_gray}
    placeholder="Country"
    onFocus={() => setIndex(6)}
    onChange={(e) => {
      setCountry(e.target.value);
    }}
  />

  <TextInput
    style={[
      KYCstyles.input,
      {
        borderWidth: index == 7 ? 4 : 1,
      },
    ]}
    autoCorrect="false"
    autoComplete="false"
    returnKeyType="next"
    keyboardAppearance="dark"
    placeholderTextColor={Constants.THEME_COLOR.light_gray}
    selectionColor={Constants.THEME_COLOR.light_gray}
    placeholder="State Abbreviation"
    onChange={(e) => {
      setState(e.target.value);
    }}
  />

  <TextInput
    style={[
      KYCstyles.input,
      {
        borderWidth: index == 8 ? 4 : 1,
      },
    ]}
    autoCorrect="false"
    autoComplete="country-name"
    returnKeyType="next"
    keyboardAppearance="dark"
    placeholderTextColor={Constants.THEME_COLOR.light_gray}
    selectionColor={Constants.THEME_COLOR.light_gray}
    placeholder="Country of Tax Residence"
    onChange={(e) => {
      setCountryOfTaxResidence(e.target.value);
    }}
    onFocus={() => setIndex(8)}
  />

  <View style={KYCstyles.checkBoxContainer}>
    <Text style={KYCstyles.checkBoxText}>Are you a US citizen?</Text>

    <Checkbox value={isChecked} onValueChange={setChecked} />
  </View>

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

  <View style={KYCstyles.checkBoxContainer}>
    <Text style={KYCstyles.checkBoxText}>Account Funding Source</Text>

    <DropDownPicker
      open={accountFundingOpen}
      value={accountFundingValue}
      items={accountFundingItems}
      setOpen={setAccountFundingOpen}
      setValue={setAccountFundingValue}
      setItems={setAccountFundingItems}
      theme="DARK"
      style={{
        backgroundColor: "black",
        width: "80%",
        borderWidth: "1px",
        borderColor: Constants.THEME_COLOR.green,
        borderRadius: 5,
      }}
      labelStyle={{ color: "white" }}
      textStyle={{
        fontSize: 15,
        color: "white",
      }}
      containerStyle={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
      //   listMode = "MODAL"
    />
  </View>

  <View style={KYCstyles.checkBoxContainer}>
    <Text style={KYCstyles.checkBoxText}>Employment Status</Text>

    <DropDownPicker
      open={employmentStatusOpen}
      value={employmentStatusValue}
      items={employmentStatusItems}
      setOpen={setEmploymentStatusOpen}
      setValue={setEmploymentStatusValue}
      setItems={setEmploymentStatusItems}
      theme="DARK"
      style={{
        backgroundColor: "black",
        width: "80%",
        borderWidth: "1px",
        borderColor: Constants.THEME_COLOR.green,
        borderRadius: 5,
      }}
      labelStyle={{ color: "white" }}
      textStyle={{
        fontSize: 15,
        color: "white",
      }}
      containerStyle={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
      //   listMode = "MODAL"
    />
  </View>

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

  {/* <View style={KYCstyles.buttonContainer}>
    <TouchableOpacity
    onPress={() => {
        // getKYCData();
        navigation.navigate("ACH")
    }}
    >
      <Text style={KYCstyles.buttonText}>Submit</Text>
    </TouchableOpacity>
  </View> */}
  <KYCButton
    text="Submit"
    onPress={() => navigation.navigate("ACH")}
  />
</ScrollView>
</KeyboardAvoidingView>
















