import React, { Component, useEffect, useState } from "react";
import {View,Text, TouchableOpacity, Image} from 'react-native'
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import {useNavigation} from '@react-navigation/native'
import {auth, db} from '../utils/firebase-config'




function StockContainer(props){

    const navigation = useNavigation();
    const [score, setScore] = useState(0)
    const [percentChange, setPercentChange] = useState(0);
    const [stockName, setStockName] = useState(props.sName)
    const [logo, setLogo] = useState('')

    const [percentColor, setPercentColor] = useState('white');


    const checkPercentGain = (perChange) => {
        if(perChange < 0) {
            setPercentColor('#82C8FB')
        } else {
            setPercentColor('#6AB664')
        }
    }

    const getPercentChange = async () => {
        // console.log("IN here")
        await fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/' + props.ticker + '?apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
            
                setPercentChange(Math.round(data.ticker.todaysChangePerc *100)/100)
                checkPercentGain(data.ticker.todaysChangePerc)
               
            }
        )
    }

    const getSimilarName = async () => {
        if(props.sName == undefined) {
            await fetch('https://api.polygon.io/v1/meta/symbols/' + props.ticker + '/company?apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {

                   
                    let tempName = data.name.replace(/.Com|pany|mon|Ltd|Brands|Corp|(DE)|Common|Stock|Inc|[,.()]|oration|Class A|Shares|Holdings|Group| I | Ordinary| Wordwide| Class| A | common stock |/g, "").replace(/[,.]/g, "").trim()
                    setStockName(tempName)
                   

                }
            )
        } else if (props.sName != stockName) {
            setStockName(props.sName)
        }
    }

    const getScore = async () => {
        try {
            const score = await db.collection('score').doc(props.ticker).get()
            setScore(score.data().score)
        } catch {
            setScore(0)
        }
    }

    useEffect(() => {
        getScore()
        getPercentChange()
        getSimilarName()



    }, [props]);
  
        return(

                <TouchableOpacity
                style={{paddingBottom: normalize.setNormalize(15)}}
            onPress={()=>{
                navigation.replace("StockDisplay", {
                    stock: {
                        sName: stockName,
                        ticker: props.ticker,
                        percentChange: percentChange 
                    }
                })
            }}
            >
                <View style={{height: normalize.setNormalize(80), width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'rgba(82,82,82,0.3)', borderRadius: 30, paddingHorizontal: normalize.setNormalize(20), alignItems: 'center'}}>


                    <View style={{paddingRight: 130}}>
                        <Text style={{fontSize: normalize.setNormalize(16),
        fontWeight: '800', color: percentColor}}>{stockName}</Text>

                        <Text style={{color: 'white', fontSize: normalize.setNormalize(12)}}>{props.ticker}</Text>
                        <Text style={{color: 'gray', fontSize: normalize.setNormalize(12)}}>{'Score: ' + score}</Text>

                        {/* <View style={{width: 200, height: 100, backgroundColor: 'red'}}></View> */}



                    </View>
                    <Text style={{fontSize: normalize.setNormalize(12), color: percentColor, fontWeight: '700'}}>{percentChange + " %"}</Text>

                </View>



            </TouchableOpacity>


            
            
        )
    
}

export default StockContainer;

