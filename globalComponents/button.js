import { useNavigation } from "@react-navigation/native";
import React from "react";
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import normalize from "../utils/normalize";

function PageButton(props) {

    const navigation = useNavigation();
    return (
        <TouchableOpacity
        style={ButtonStyles.buttonContainer}
        onPress = {() => {
            props.onPress()


            navigation.replace(props.route, {
                screen: props.screen
            })



        }}
        >
            <Text style={ButtonStyles.buttonText}>

                {props.title}

            </Text>
        </TouchableOpacity>
    )
}

const ButtonStyles = StyleSheet.create({
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

export default PageButton;