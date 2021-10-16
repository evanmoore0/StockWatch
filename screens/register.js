import React, { Component } from "react";
import {View, Text, StyleSheet} from 'react-native';
import LoginAndRegisterTitle from "../globalComponents/loginAndRegisterTitle";
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import PageButton from "../globalComponents/button";


class Register extends Component {
    render() {
        return (

            <View style={GlobalStyles.screenContainer}>
                <LoginAndRegisterTitle
                title = "Register"
                />

                <View style={RegisterStyles.entryContainer}>

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
        flex: normalize.setNormalize(350)
    },

})