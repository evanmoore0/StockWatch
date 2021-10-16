import React, { Component } from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import normalize from "../utils/normalize";
import PageButton from "../globalComponents/button";
import GlobalStyles from "../utils/globalStyles";


class Welcome extends Component {
    render() {
        return (
            <View style={GlobalStyles.screenContainer}>

                <Text style={WelcomeStyles.title}>
                    Stock Watch
                </Text>

                <View style={WelcomeStyles.subTitleContainer}>
                    <Text style={WelcomeStyles.subTitle}>Keep track of all your stocks</Text>
                    <Text style={WelcomeStyles.subTitle}>at the click of a button</Text>
                </View>

                <View style= {
                    WelcomeStyles.graphicContainer
                }>

                </View>

                <View style={GlobalStyles.buttonContainer}>

                    <PageButton
                    title = "Get Started"
                    route = "Register"
                    />

                </View>

                

                <TouchableOpacity
                style = {WelcomeStyles.buttonSubtitleContainer}
                onPress = {() => {
                    this.props.navigation.navigate("Login")
                }}
                >
                    <Text style={WelcomeStyles.buttonSubtitle}>Already have an account?</Text>
                    <Text style={WelcomeStyles.buttonSubtitle}>Login here</Text>
                </TouchableOpacity>



{/* 
                <PageButton
                title = "Get Started"
                route = "Register"
                /> */}

                {/* <TouchableOpacity
                onPress = {() => {

                    this.props.navigation.navigate("Login")

                }}
                >

                    <Text>
                        Already have an account?
                    </Text>
                    <Text>
                        Sign in here
                    </Text>
                    
                </TouchableOpacity> */}
            </View>
        )
    }
}

export default Welcome;

const WelcomeStyles = StyleSheet.create({

    title: {

        flex: normalize.setNormalize(60),
        fontSize: normalize.setNormalize(61),
        color: 'white'

    },

    subTitleContainer: {

        flex: normalize.setNormalize(56),
        paddingTop: normalize.setNormalize(20),
        justifyContent: 'center',
        alignItems: 'center'
    },

    subTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#82C8FB',
        fontSize: normalize.setNormalize(20),
        paddingBottom: normalize.setNormalize(3)
    },

    graphicContainer: {
        flex: normalize.setNormalize(455)
    },

    buttonSubtitleContainer: {
        flex: normalize.setNormalize(60),
        paddingBottom: normalize.setNormalize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonSubtitle: {
        fontSize: normalize.setNormalize(15),
        color: 'white',

    },




})