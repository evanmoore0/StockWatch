import React from "react";
import {View,Text, TouchableOpacity, Keyboard} from 'react-native'

import {useNavigation} from '@react-navigation/native'

import normalize from "../utils/normalize";
import Constants from "../Constants";
import GlobalStyles from "../utils/globalStyles";

//Component that is displayed when user searches a stock
function SearchContainer(props) {

    //Not in navigation container, so must use useNavigation prop
    const navigation = useNavigation()

    return(

        //Wrap in touchable opacity so user can click whole component
        <TouchableOpacity
        onPress = {
            () => {
                Keyboard.dismiss()
            //Navigate to stock display page
                navigation.navigate("StockDisplay", {
                    stock: {
                        sName: props.sName,
                        ticker: props.ticker,
                        display: props.display
                    }
                })
            }
        }>
            {/**
             * Container for text/ border
             */}
            <View 
            style = {
            [GlobalStyles.stockContainer, 
                {
                    backgroundColor: 'black', 
                    borderRadius: 0, 
                    borderBottomColor: 'rgba(256,256,256,0.3)', 
                    borderBottomWidth: normalize.setNormalize(1)
                }
            ]
            }>

                <View>
                    <Text 
                    style = {
                        {
                            fontSize: Constants.STOCK_NAME_FONT.size,
                            fontWeight: Constants.STOCK_NAME_FONT.weight, 
                            color: Constants.THEME_COLOR.green, 
                            flexWrap: 'wrap'
                        }
                    }>
                            {props.sName}

                    </Text>

                    <Text 
                    style = {
                        {
                            color: Constants.STOCK_NAME_FONT.tickerColor, 
                            fontSize: Constants.STOCK_NAME_FONT.tickerSize
                        }
                    }>
                        {props.ticker}
                    </Text>

                </View>
                
            </View>



        </TouchableOpacity>
    )
}

export default SearchContainer;