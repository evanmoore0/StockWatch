import React, { Component } from "react";
import {View, Text} from 'react-native';
import NavBar from "../globalComponents/navBar";

class Library extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>
                    Library
                </Text>
                <NavBar/>
            </View>
        )
    }
}

export default Library;