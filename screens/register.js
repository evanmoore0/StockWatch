import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import normalize from "../utils/normalize";
import Graphic from "../globalComponents/graphic";
import { auth, db } from "../utils/firebase-config";
import Constants from "../Constants";
import { Ionicons } from '@expo/vector-icons';



function Register (props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassowrd, setConfirmPassword] = useState('')

    const handleRegister = () => {
         var promise =  auth
        .createUserWithEmailAndPassword(email, password)
        promise.then(async function(authData) {
            //Just sending right now
            await authData.user.sendEmailVerification();
            const user = authData.user;
            db.collection('users')
            .doc(user.uid)
            .set({email: user.email, stocks: []})
        }, function(error) {
          Alert.alert(error.message)
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

            <SafeAreaView>
            <KeyboardAvoidingView
            style={{paddingTop: normalize.setNormalize(20)}}

            
            >
                <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                    props.navigation.replace("Welcome")
                }}
                >
                    <Ionicons 
                    name="chevron-back-outline" 
                    size={normalize.setNormalize(30)} 
                    color="white" 
                    />
                    <Text style={{fontSize: normalize.setNormalize(20), color: 'white', fontWeight: '700'}}>
                        Register
                    </Text>

            </TouchableOpacity>
            
            <View style={{height: normalize.setNormalize(55), width: '100%', paddingTop: normalize.setNormalize(50)}}>
                <Graphic
                scale = {0.3}
                />
            </View>

            <View style={RegisterStyles.entryContainer}>
                <View style={RegisterStyles.inputContainer}>
                <Text style={RegisterStyles.textInputHeader}>email</Text>
                <TextInput
                style={RegisterStyles.textInput}
                placeholder = "enter email"
                placeholderTextColor = "white"
                keyboardType= "email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect = {false}
                onChangeText = {text => {
                    setEmail(text)
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
                keyboardType= "visible-password"
                autoCapitalize="none"
                autoComplete= "password"
                autoCorrect = {false}
                onChangeText = {text => {
                    setPassword(text)
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
                keyboardType= "visible-password"
                autoCapitalize="none"
                autoComplete= "password"
                autoCorrect = {false}
                onChangeText = {text => {
                    setConfirmPassword(text)
                }}
                />
            </View>
            
        </View>
        <View style={{width: '100%', justifyContent: 'center', alignItems:'center'}}>

            <TouchableOpacity
                style={RegisterStyles.buttonContainer}
                onPress = {() => {
                    handlePress()
                }}
                >
                    <Text style={RegisterStyles.buttonText}>

                        Login

                    </Text>
                </TouchableOpacity>

            </View>
            

            </KeyboardAvoidingView>
            
        </SafeAreaView>


        )
    
}

export default Register;

const RegisterStyles = StyleSheet.create({

    entryContainer: {
        width: '100%',
        paddingTop: normalize.setNormalize(80),
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInputHeader: {

        color: Constants.THEME_COLOR.blue,
        paddingLeft: normalize.setNormalize(15),
        paddingBottom: normalize.setNormalize(5)

    },

    textInput: {
        backgroundColor: Constants.THEME_COLOR.green,
        borderRadius: normalize.setNormalize(50),
        borderWidth: normalize.setNormalize(4),
        borderColor: Constants.THEME_COLOR.blue,
        height: normalize.setNormalize(40),
        width: normalize.setNormalize(300),
        paddingLeft: normalize.setNormalize(15),
        fontSize: normalize.setNormalize(12),
        color: 'white'
    },

    inputContainer: {
        paddingBottom: normalize.setNormalize(50)
    },

    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize.setNormalize(50),
        backgroundColor: Constants.THEME_COLOR.green,
        paddingHorizontal: normalize.setNormalize(70),
        height: normalize.setNormalize(40),
    },

    buttonText: {

        fontSize: normalize.setNormalize(16),
        color: 'white'
    }

})