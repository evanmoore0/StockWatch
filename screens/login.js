import React, { Component } from "react";
import {View, StyleSheet} from 'react-native';
import LoginAndRegisterTitle from "../globalComponents/loginAndRegisterTitle";
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import PageButton from "../globalComponents/button";


class Login extends Component {
    render() {
        return (

            <View style={GlobalStyles.screenContainer}>
                <LoginAndRegisterTitle
                title = "Login"
                />

                <View style={LoginStyles.entryContainer}>

                </View>

                <View style= {GlobalStyles.buttonContainer}>

                    <PageButton
                    title = 'Continue'
                    route = 'Stocks'
                    />

                </View>

                <View style={{flex: normalize.setNormalize(110)}}></View>
            </View>


        )
    }
}

export default Login;

const LoginStyles = StyleSheet.create({

    entryContainer: {
        flex: normalize.setNormalize(350)
    },

})