import React, { Component, useEffect } from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import Graphic from "../globalComponents/graphic";

//Firebase Auth
import { auth } from "../utils/firebase-config";



function Welcome(props) {

    //Called when the user closes the app
    // componentDidMount() {
    //     this.checkUserStatus()

    //     console.log("In Welcome Mount")
        
    // }

    // componentWillUnmount() {
    //     console.log("In Welcome UnMount")
    // }

    //Check to see if user is signed in -> direct to stocks page if they are
    // checkUserStatus() {
    //     console.log("In checkuser status")
    //     auth.onAuthStateChanged((user)=> {
    //         if(user) {
    //             this.props.navigation.replace('TabStack')
    //         }
    //     })
    // }
    // const checkUserStatus = () => {

    //     console.log("IN CHECK USER STATUS")

    //     auth.onAuthStateChanged((user) => {
    //         if(user) {
    //             props.navigation.replace('TabStack')
    //         }
    //     })

    // }


    useEffect(()=> {

        console.log("In welcome useEffect")

    }, [])

        return (
            <View style={GlobalStyles.screenContainer}>

                {/**
                 Title of the welcome page
                 */}
                <Text style={WelcomeStyles.title}>
                    Stock Watch
                </Text>

                {/**
                 Subtitle of the welcome page
                 */}
                <View style={WelcomeStyles.subTitleContainer}>
                    <Text style={WelcomeStyles.subTitle}>Keep track of all your stocks</Text>
                    <Text style={WelcomeStyles.subTitle}>at the click of a button</Text>
                </View>

                {/**
                 Graphic
                 */}
                <View style={WelcomeStyles.graphicContainer}>
                    
                    <Graphic
                    scale = {1}
                    />


                </View>

                {/**
                 Register button
                 */}
                <TouchableOpacity
                style={WelcomeStyles.buttonContainer}
                onPress = {() => {

                props.navigation.replace('Register')



                }}
                >
                <Text style={WelcomeStyles.buttonText}>

                Register


                </Text>
                </TouchableOpacity>
               
               {/**
                Text under register button (Click if already have an account)
                 */}
                <TouchableOpacity
                style = {WelcomeStyles.buttonSubtitleContainer}
                onPress = {() => {

                    props.navigation.replace("Login")
                }}
                >
                    <Text style={WelcomeStyles.buttonSubtitle}>Already have an account?</Text>
                    <Text style={WelcomeStyles.buttonSubtitle}>Login here</Text>
                </TouchableOpacity>

            </View>
        )
    
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
        flex: normalize.setNormalize(455),
        width: '100%'
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

    buttonContainer: {
        height: normalize.setNormalize(65),
        width: normalize.setNormalize(210),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize.setNormalize(50),
        backgroundColor: '#6AB664'
    },

    buttonText: {

        fontSize: normalize.setNormalize(27),
        color: 'white'

    }




})