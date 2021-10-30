import React from "react";
import { StyleSheet } from "react-native";
import normalize from "./normalize";

const GlobalStyles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'center',
        alignItems:'center',
        flex: normalize.setNormalize(896),
        backgroundColor: 'black',
        paddingTop: normalize.setNormalize(50)
        
    },

    buttonContainer: {
        paddingTop: normalize.setNormalize(50)
    },

    percentChangeText: {
        color: '#13FF00',
        fontSize: normalize.setNormalize(25),
        
    }
})

export default GlobalStyles;