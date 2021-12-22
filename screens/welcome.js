import React, {useEffect } from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import normalize from "../utils/normalize";
import Graphic from "../globalComponents/graphic";

//Firebase Auth
import { SafeAreaView } from "react-native-safe-area-context";

function Welcome(props) {

    useEffect(()=> {

    }, [])

        return (
            <SafeAreaView style={{flex:1, paddingTop: normalize.setNormalize(20)}}>

                {/**
                 Title of the welcome page
                 */}
                 <View style={{width: normalize.setNormalize(200), alignItems:'center'}}>
                    <Text style={WelcomeStyles.title}>
                       Stock Watch
                    </Text>
                 </View>
               

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

                 <View style={[WelcomeStyles.container, {paddingBottom: normalize.setNormalize(20)}]}>
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

                 </View>
                
               
               {/**
                Text under register button (Click if already have an account)
                 */}
                 <View style={WelcomeStyles.container}>
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
                

            </SafeAreaView>
        )
    
}

export default Welcome;

const WelcomeStyles = StyleSheet.create({

    title: {

        fontSize: normalize.setNormalize(27),
        color: 'white',
        fontWeight: '700'

    },

    subTitleContainer: {

        paddingTop: normalize.setNormalize(5),
        width: normalize.setNormalize(200),
       
    },

    subTitle: {
        color: 'gray',
        fontSize: normalize.setNormalize(12),
        paddingBottom: normalize.setNormalize(3),  
        textAlign: 'center'  ,
    },

    graphicContainer: {
        flex:1,
    },

    buttonSubtitleContainer: {
        paddingBottom: normalize.setNormalize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonSubtitle: {
        fontSize: normalize.setNormalize(10),
        color: 'white',

    },

    buttonContainer: {
        height: normalize.setNormalize(40),
        paddingHorizontal: normalize.setNormalize(70),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize.setNormalize(50),
        backgroundColor: '#6AB664',
    },

    buttonText: {

        fontSize: normalize.setNormalize(16),
        color: 'white'

    },

    container: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems:'center', 
        paddingBottom: normalize.setNormalize(150)
    }




})