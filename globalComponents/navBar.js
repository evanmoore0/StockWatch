import React, { Component } from "react";
import {View, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native'


function NavBar() {

    const navigation = useNavigation();
   
    return (
        <View style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
        }}>
            <TouchableOpacity
            onPress = {() => {
                navigation.navigate("Stocks")
            }}
            >
                <Text>
                    Stocks
                </Text>
                
            </TouchableOpacity>

            <TouchableOpacity
            onPress = {() => {

                navigation.navigate("Library")

            }}
            >
                <Text>
                    Library
                </Text>
                
            </TouchableOpacity>
        </View>
    )
}

export default NavBar;