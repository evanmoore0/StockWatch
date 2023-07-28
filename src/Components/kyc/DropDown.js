import React, { useState } from "react";

import {
    View,
    StyleSheet

} from "react-native"

import normalize from "../../utils/Style/normalize";
import Constants from "../../utils/Constants";

import DropDownPicker from "react-native-dropdown-picker";

const DropDown = ({open, value, items, setOpen, setValue, setItems, onOpen, onClose, index, placeholder, margin}) => {
  return (
    <View style={DatePickerStyles.checkBoxContainer}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onOpen={onOpen}
        onClose={onClose}
        theme="DARK"
        placeholder={placeholder}
        style={[
          DatePickerStyles.dropDown,
          {
            borderWidth: index == 4 ? 1 : 4,
            borderColor:
              index == 4 ? "white" : Constants.THEME_COLOR.light_gray,
            marginBottom: index == 4 ? normalize.setNormalize(margin) : 0,
          },
        ]}
        itemSeparator={true}
        itemSeparatorStyle={{
          backgroundColor:
            index == 4 ? "white" : Constants.THEME_COLOR.light_gray,
        }}
        labelStyle = {{color: "white"}}
        
        textStyle={[DatePickerStyles.dropDownText, {color: index == 4 ? "white" : Constants.THEME_COLOR.light_gray}]}
        containerStyle={DatePickerStyles.dropDownContainer}
        dropDownContainerStyle={{
          backgroundColor: "black",
          width: normalize.setNormalize(300),
          borderWidth: 1,
          borderColor: index == 4 ? "white" : Constants.THEME_COLOR.light_gray,
          borderRadius: 5,
        }}
      />
    </View>
  );
};

const DatePickerStyles = StyleSheet.create({
    checkBoxContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginVertical: normalize.setNormalize(15),
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
        fontFamily: Constants.FONT.family
      },
    
      dropDownContainer: {
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }
})


export default DropDown;