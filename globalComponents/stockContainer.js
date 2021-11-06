import React, { Component } from "react";
import {View,Text, TouchableOpacity} from 'react-native'
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import {useNavigation} from '@react-navigation/native'

function StockContainer(props){

    const navigation = useNavigation();
  
        return(

            <TouchableOpacity
            onPress={()=>{
                navigation.navigate("StockDisplay", {
                    ticker: props.ticker
                })
            }}
            >
                <View style={{ borderTopColor: 'gray', borderBottomColor: 'gray', borderTopWidth: normalize.setNormalize(1), borderBottomWidth: normalize.setNormalize(1), height: normalize.setNormalize(100), width: normalize.setNormalize(370), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', opacity: 1}}>
                    <Text style={GlobalStyles.percentChangeText}>{props.stock + " (" + props.ticker + ")"}</Text>
                    <Text style={GlobalStyles.percentChangeText}>{props.percentChange}</Text>
                </View>

            </TouchableOpacity>
            
        )
    
}

export default StockContainer;

