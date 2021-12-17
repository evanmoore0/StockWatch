import React, { Component, useEffect, useState } from "react";
import {View,Text, TouchableOpacity, Image, Alert} from 'react-native'
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import {useNavigation} from '@react-navigation/native'
import {auth, db} from '../utils/firebase-config'




function StockContainer(props){

    const navigation = useNavigation();
    // const [score, setScore] = useState(0)
    // const [percentChange, setPercentChange] = useState(0);
    // const [stockName, setStockName] = useState(props.sName)
    // const [logo, setLogo] = useState('')

    // const [display, setDisplay] = useState(false);

    const [score, setScore] = useState(0)

    const [percentColor, setPercentColor] = useState('white');


    const getScore = async () => {


        if(props.score == undefined) {
            try {

                    let tempScore = await db.collection('score').doc(props.ticker).get()
                    setScore(tempScore.data().score)
        
            } catch (error) {
                
            }
        } else {
            setScore(props.score)
        }
    }


    const checkPercentGain = () => {
        if(props.percentChange < 0) {
            setPercentColor('#82C8FB')
        } else {
            setPercentColor('#6AB664')
        }
    }

    // const getPercentChange = async () => {
    //     // console.log("IN get Percent change" + props.ticker)
    //     try {
    //         await fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/' + props.ticker + '?apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
    //         .then(
    //             function(response) {
    //                 return response.json();
    //             }
    //         )
    //         .then(
    //             function(data) {
                
    //                 setPercentChange(Math.round(data.ticker.todaysChangePerc * 100)/100)
    //                 checkPercentGain(data.ticker.todaysChangePerc)
    //                 setDisplay(true)
                   
    //             }
    //         )
            
    //     } catch (error) {

            
    //     }
       
    // }

    // const getSimilarName = async () => {
    //     if(props.sName == undefined) {
    //         await fetch('https://api.polygon.io/v1/meta/symbols/' + props.ticker + '/company?apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
    //         .then(
    //             function(response) {
    //                 return response.json();
    //             }
    //         )
    //         .then(
    //             function(data) {

                   
    //                 let tempName = data.name.replace(/.Com|pany|mon|Ltd|Brands|Corp|(DE)|Common|Stock|Inc|[,.()]|oration|Class A|Shares|Holdings|Group| I | Ordinary| Wordwide| Class| A | common stock |/g, "").replace(/[,.]/g, "").trim()
    //                 setStockName(tempName)
                   

    //             }
    //         )
    //     } else if (props.sName != stockName) {
    //         setStockName(props.sName)
    //     }
    // }

    // const getScore = async () => {
    //     try {
    //         const score = await db.collection('score').doc(props.ticker).get()
    //         setScore(score.data().score)
    //     } catch {
    //         setScore(0)
    //     }
    // }

    useEffect(() => {
       checkPercentGain()
       getScore()
    }, []);

    // if(!display) {
    //     return(
    //         <View>

    //         </View>
    //     )
    // }
  
        return(

                <TouchableOpacity
                style={{paddingBottom: normalize.setNormalize(15)}}
            onPress={()=>{
                navigation.navigate("StockDisplay", {
                    stock: {
                        sName: props.sName,
                        ticker: props.ticker,
                        percentChange: props.percentChange 
                    }
                })
            }}
            >
                <View style={{height: normalize.setNormalize(80), width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'rgba(82,82,82,0.3)', borderRadius: 30, paddingHorizontal: normalize.setNormalize(20), alignItems: 'center'}}>


                    <View>
                        <Text style={{fontSize: normalize.setNormalize(16),
        fontWeight: '800', color: percentColor}}>{props.sName}</Text>

                        <Text style={{color: 'white', fontSize: normalize.setNormalize(12)}}>{props.ticker}</Text>
                        <Text style={{color: 'gray', fontSize: normalize.setNormalize(12)}}>{score}</Text>

                        {/* <View style={{width: 200, height: 100, backgroundColor: 'red'}}></View> */}



                    </View>
                    <Text style={{fontSize: normalize.setNormalize(12), color: percentColor, fontWeight: '700'}}>{props.percentChange + " %"}</Text>

                </View>



            </TouchableOpacity>
            
        )
    
}

export default StockContainer;

