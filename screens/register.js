import React, { Component } from "react";
import {View, Text, StyleSheet, TextInput} from 'react-native';
import LoginAndRegisterTitle from "../globalComponents/loginAndRegisterTitle";
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import PageButton from "../globalComponents/button";
import RegistrationEntry from "../globalComponents/registrationEntry";
import Graphic from "../globalComponents/graphic";


class Register extends Component {
    render() {
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
                        onSubmitEditing = {()=> {
                            {this.textInput.focus()}
                        }}
                        />
                    </View>

                    <View style={RegisterStyles.inputContainer}>
                        <Text style={RegisterStyles.textInputHeader}>password</Text>
                        <TextInput
                        style={RegisterStyles.textInput}
                        placeholder = "enter password"
                        placeholderTextColor = "white"
                        ref = {(input) => {this.textInput = input}}
                        onSubmitEditing = {()=> {
                            {this.textInputTwo.focus()}
                        }}
                        />
                    </View>

                    <View style={RegisterStyles.inputContainer}>
                        <Text style={RegisterStyles.textInputHeader}>confirm password</Text>
                        <TextInput
                        style={RegisterStyles.textInput}
                        placeholder = "confirm password"
                        placeholderTextColor = "white"
                        ref = {(input)=>{this.textInputTwo = input}}
                        />
                    </View>


                </View>

                <View style= {GlobalStyles.buttonContainer}>

                    <PageButton
                    title = 'Create Account'
                    route = 'Stocks'
                    />

                </View>

                <View style={{flex: normalize.setNormalize(110)}}></View>
            </View>


        )
    }
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
    }

})