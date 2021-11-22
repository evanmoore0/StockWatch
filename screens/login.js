import React, { Component, useState } from "react";
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import LoginAndRegisterTitle from "../globalComponents/loginAndRegisterTitle";
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import PageButton from "../globalComponents/button";
import Graphic from "../globalComponents/graphic";
import { auth, db } from "../utils/firebase-config";


function Login(props) {

    //Hooks used to send email/password to firebase
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Sign the user in if the account exists
    const handleLogin = () => {
 
        auth
        .signInWithEmailAndPassword(email, password)
        .catch(error=>Alert.alert(error.message))
      
    }

    return (
        <View style={GlobalStyles.screenContainer}>
            <LoginAndRegisterTitle
            title = "Login"
            />
            <View style={{height: 100, width: '100%'}}>
            <Graphic
            scale = {0.5}
            />
            </View>
            <View style={loginStyles.entryContainer}>
            <View style={loginStyles.inputContainer}>
                <Text style={loginStyles.textInputHeader}>email</Text>
                <TextInput
                style={loginStyles.textInput}
                placeholder = "enter email"
                placeholderTextColor = "white"
                // onSubmitEditing = {()=> {
                //     {this.textInput.focus()}
                // }}
                onChangeText = {text => {
                    setEmail(text)
                }}
                />
            </View>
            
            <View style={loginStyles.inputContainer}>
                <Text style={loginStyles.textInputHeader}>password</Text>
                <TextInput
                style={loginStyles.textInput}
                secureTextEntry
                placeholder = "enter password"
                placeholderTextColor = "white"
                // ref = {(input) => {this.textInput = input}}
                // onSubmitEditing = {()=> {
                //     {this.textInputTwo.focus()}
                // }}
                onChangeText = {text => {
                    setPassword(text)
                }}
                />
            </View>
            
        </View>
            <TouchableOpacity
                style={loginStyles.buttonContainer}
                onPress = {() => {

                    handleLogin()
                }}
                >
            <Text style={loginStyles.buttonText}>

                Login


            </Text>
            </TouchableOpacity>

            <View style={{flex: normalize.setNormalize(110)}}></View>
        </View>
    )
    
}

export default Login;

const loginStyles = StyleSheet.create({

    entryContainer: {
        width: '100%',
        paddingTop: normalize.setNormalize(40),
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInputHeader: {

        fontSize: normalize.setNormalize(25),
        color: '#82C8FB',
        paddingLeft: normalize.setNormalize(15),
        paddingBottom: normalize.setNormalize(5)

    },

    textInput: {
        backgroundColor: '#6AB664',
        borderRadius: normalize.setNormalize(50),
        borderWidth: normalize.setNormalize(4),
        borderColor: '#82C8FB',
        height: normalize.setNormalize(45),
        width: normalize.setNormalize(300),
        paddingLeft: normalize.setNormalize(15),
        fontSize: normalize.setNormalize(20),
        color: 'white'
    },

    inputContainer: {
        paddingBottom: normalize.setNormalize(20)
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