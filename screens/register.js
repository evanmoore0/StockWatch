import React, { Component, useState } from "react";
import {View, Text, StyleSheet, TextInput, Alert, TouchableOpacity} from 'react-native';
import LoginAndRegisterTitle from "../globalComponents/loginAndRegisterTitle";
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import Graphic from "../globalComponents/graphic";
import { auth, db } from "../utils/firebase-config";
import Library from "./library";


function Register (props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassowrd, setConfirmPassword] = useState('')

    const handleRegister = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(
            currentUser => {
                const user = currentUser.user;
                db.collection('users')
                .doc(user.uid)
                .set({email: user.email, stocks: []})
            }
        )
        .catch(error => alert(error.message))
    }

    const handlePress = () => { 

        if(!email) {
            Alert.alert("Email is required");
        } else if (!password) {
            Alert.alert("Password is required");
        } else if (!confirmPassowrd) {
            Alert.alert("Confirm password is required") 
        } else if (confirmPassowrd != password) {
            Alert.alert('Password does not match!')
        } else {
            handleRegister()
        }
    }

        return (

            <View style={GlobalStyles.screenContainer}>
                <LoginAndRegisterTitle
                title = "Register"
                />

                <View style={{height: 100, width: '100%'}}>

                    <Graphic
                    scale = {0.5}
                    />
                </View>



                <View style={RegisterStyles.entryContainer}>

                    <View style={RegisterStyles.inputContainer}>
                        <Text style={RegisterStyles.textInputHeader}>email</Text>
                        <TextInput
                        style={RegisterStyles.textInput}
                        placeholder = "enter email"
                        placeholderTextColor = "white"
                        onChangeText = {text=>{

                            setEmail(text)
                            
                        }}
                        onSubmitEditing = {()=> {
                            {}
                        }}
                        />
                    </View>

                    <View style={RegisterStyles.inputContainer}>
                        <Text style={RegisterStyles.textInputHeader}>password</Text>
                        <TextInput
                        style={RegisterStyles.textInput}
                        secureTextEntry
                        placeholder = "enter password"
                        placeholderTextColor = "white"
                        ref = {(input) => {}}
                        onChangeText = {text=>{
                            setPassword(text)
                            
                        }}
                        onSubmitEditing = {()=> {
                           
                        }}
                        />
                    </View>

                    <View style={RegisterStyles.inputContainer}>
                        <Text style={RegisterStyles.textInputHeader}>confirm password</Text>
                        <TextInput
                        style={RegisterStyles.textInput}
                        secureTextEntry
                        placeholder = "confirm password"
                        placeholderTextColor = "white"
                        onChangeText = {text => {
                            setConfirmPassword(text)
                        }}
                        ref = {(input)=>{}}
                        />
                    </View>


                </View>

                <TouchableOpacity
                style={RegisterStyles.buttonContainer}
                onPress = {() => {

                    handlePress()
                }}
                >
            <Text style={RegisterStyles.buttonText}>

                Register


            </Text>
            </TouchableOpacity>
                <View style={{flex: normalize.setNormalize(110)}}></View>
            </View>


        )
    
}

export default Register;

const RegisterStyles = StyleSheet.create({

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