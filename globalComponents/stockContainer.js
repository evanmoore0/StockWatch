import React, { Component, useEffect, useState } from "react";
import {View,Text, TouchableOpacity} from 'react-native'
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import {useNavigation} from '@react-navigation/native'

function StockContainer(props){

    const navigation = useNavigation();

    const [percentColor, setPercentColor] = useState('#82C8FB');

    useEffect(() => {
        checkPercentGain()
    })


    const checkPercentGain = () => {
        if(props.percentChange[0] == "-") {
            setPercentColor('#82C8FB')
        } else {
            setPercentColor('#6AB664')
        }
    }

    
  
        return(

                <TouchableOpacity
            onPress={()=>{
                navigation.navigate("StockDisplay", {
                    ticker: props.ticker
                })
            }}
            >
                <View style={{height: normalize.setNormalize(100), width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={GlobalStyles.percentChangeText}>{props.stock}</Text>
                        <Text style={{color: 'white'}}>{props.ticker}</Text>

                    </View>
                    <Text style={{fontSize: normalize.setNormalize(20), color: percentColor, fontWeight: '700'}}>{props.percentChange}</Text>
                </View>

            </TouchableOpacity>


            
            
        )
    
}

export default StockContainer;

