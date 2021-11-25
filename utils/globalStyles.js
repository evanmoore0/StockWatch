import React from "react";
import { StyleSheet } from "react-native";
import normalize from "./normalize";

const GlobalStyles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'center',
        alignItems:'center',
        flex: normalize.setNormalize(896),
        backgroundColor: 'black',
        paddingTop: normalize.setNormalize(50),
        
    },

    homePageContainer: {
        flex: 1,
        backgroundColor: 'black',
        marginHorizontal: normalize.setNormalize(10),
        marginTop: normalize.setNormalize(40),

    },

    buttonContainer: {
        paddingTop: normalize.setNormalize(50)
    },

    percentChangeText: {
        color: '#6AB664',
        fontSize: normalize.setNormalize(20),
        fontWeight: '800'
    }
})

export default GlobalStyles;