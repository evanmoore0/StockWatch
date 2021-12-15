import React, { Component, useEffect, useState } from "react";
import {View,Text, TouchableOpacity, Alert} from 'react-native'
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import {useNavigation} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import {auth, db} from '../utils/firebase-config'


function SearchContainer(props) {

    // const [score, setScore] = useState(0)
    const navigation = useNavigation()
    // const [display, setDisplay] = useState(false)

    // const getScore = async () => {
    //     try {
    //         const score = await db.collection('score').doc(props.ticker).get()
    //         setScore(score.data().score)
    //     } catch {

    //         setScore(0)

    //     }
    // }

    // const shouldDisiplay = async () => {
    //     // console.log(props.ticker)
    //     try {
    //         await fetch('https://api.polygon.io/v1/meta/symbols/' + props.ticker + '/company?apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
    //         .then(
    //             function(response) {
    //                 return response.json();
    //             }
    //         )
    //         .then(
    //             function(data) {
    //                 // console.log(data.error)
    //                 if(data.error != undefined) {
    //                     throw "O no"
    //                 } else {
    //                     setDisplay(true)
    //                 }
                    
    //              }
    //         )
    //     } catch (error) {
    //         setDisplay(false)
    //     }
    // }

    // useEffect(() => {
    //     shouldDisiplay()
    //     getScore()

    // }, [props]);

    // if(!display) {
    //     return(
    //         <View>

    //         </View>
    //     )
    // }
    return(
        <TouchableOpacity
                style={{}}
                onPress = {()=>{

                    navigation.replace("StockDisplay", {
                        stock: {
                            sName: props.sName,
                            ticker: props.ticker,
                        }
                    })
                }}
            // onPress={()=>{
            //     navigation.navigate("StockDisplay", {
            //         ticker: props.ticker
            //     })
            // }}
            >
                <View style={{height: normalize.setNormalize(80), width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: normalize.setNormalize(20), alignItems: 'center', borderBottomColor: 'rgba(256,256,256,0.5)', borderBottomWidth:0.5}}>
                    <View>
                        <Text style={{fontSize: normalize.setNormalize(16),
        fontWeight: '800', color: '#6AB664', flexWrap: 'wrap', width: normalize.setNormalize(280)}}>{props.sName}</Text>

                        <Text style={{color: 'white', fontSize: normalize.setNormalize(12)}}>{props.ticker}</Text>

                        {/* <View style={{width: 200, height: 100, backgroundColor: 'red'}}></View> */}

                    </View>
                    {/* <Text style={{fontSize: normalize.setNormalize(12), color: '#6AB664', fontWeight: '700'}}>{'percentchange'}</Text> */}
                    <View>
                        <Ionicons name="add-circle" size={24} color="#6AB664" />
                    </View>
                    

                    

                </View>



            </TouchableOpacity>
    )
}

export default SearchContainer;