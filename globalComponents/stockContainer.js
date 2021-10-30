import React, { Component } from "react";
import {View,Text} from 'react-native'
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";

class StockContainer extends Component{
    render() {
        return(
            <View style={{ borderTopColor: 'gray', borderBottomColor: 'gray', borderTopWidth: normalize.setNormalize(1), borderBottomWidth: normalize.setNormalize(1), height: normalize.setNormalize(100), width: normalize.setNormalize(370), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', opacity: 1}}>
                <Text style={GlobalStyles.percentChangeText}>{this.props.stock}</Text>
                <Text style={GlobalStyles.percentChangeText}>{this.props.percentChange}</Text>
            </View>
        )
    }
}

export default StockContainer;

