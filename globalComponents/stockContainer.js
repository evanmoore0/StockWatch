import React, {useEffect, useState } from "react";
import {View,Text, TouchableOpacity} from 'react-native'

import {useNavigation} from '@react-navigation/native'

import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import Constants from "../Constants";


function StockContainer(props){

    const navigation = useNavigation();

    //Color of the percent gain
    const [percentColor, setPercentColor] = useState('white');

    //Set color of percent change
    const checkPercentGain = () => {
        if(props.percentChange <= 0) {
            setPercentColor(Constants.THEME_COLOR.blue)
        } else {
            setPercentColor(Constants.THEME_COLOR.green)
        }
    }

    //Check the percent change for each stock
    useEffect(() => {
       checkPercentGain()
    }, [props]);
  
    return(

        <TouchableOpacity
        style = {
            {
                paddingBottom: normalize.setNormalize(15)
            }
        }
        onPress = {
            () => {
            navigation.navigate("StockDisplay", {
                    stock: {
                        sName: props.sName,
                        ticker: props.ticker,
                        percentChange: props.percentChange,
                        display: props.display
                    }
                })
            }
        }>
            <View 
            style = {
                GlobalStyles.stockContainer
            }>
                <View>
                    <Text 
                    style = {
                        {
                            fontSize: Constants.STOCK_NAME_FONT.size,
                            fontWeight: Constants.STOCK_NAME_FONT.weight, 
                            color: percentColor
                        }}>
                            {props.sName}
                    </Text>

                    <Text style = {
                        {
                            color: Constants.STOCK_NAME_FONT.tickerColor, 
                            fontSize: Constants.STOCK_NAME_FONT.tickerSize
                        }
                    }>
                        {props.ticker}
                    </Text>

                    <Text style = {
                        {
                            color: 'white', 
                            fontSize: normalize.setNormalize(12)
                        }
                    }>
                        {props.score}
                    </Text>

                </View>

                    <Text style = {
                        {
                            fontSize: Constants.STOCK_NAME_FONT.tickerSize, 
                            color: percentColor, 
                            fontWeight: Constants.STOCK_NAME_FONT.weight
                        }
                    }>
                        {props.percentChange + " %"}
                    </Text>

                </View>

            </TouchableOpacity>
            
        )
    
}

export default StockContainer;

