import React, { Component, useEffect, useState } from "react";
import {View,Text, TouchableOpacity} from 'react-native'
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import {useNavigation} from '@react-navigation/native'
import {auth, db} from '../utils/firebase-config'




function StockContainer(props){

    const navigation = useNavigation();
    const [score, setScore] = useState(0)

    const [percentColor, setPercentColor] = useState('#82C8FB');

    // useEffect(() => {
    //     checkPercentGain()
    // })


    const checkPercentGain = () => {
        if(props.percentChange[0] == "-") {
            setPercentColor('#82C8FB')
        } else {
            setPercentColor('#6AB664')
        }
    }

    const getScore = async () => {
        try {
            const score = await db.collection('score').doc(props.ticker).get()
            setScore(score.data().score)
        } catch {
            // console.log("in error")
            setScore(0)
        }
    }

    useEffect(() => {
        getScore()

    }, []);
  
        return(

                <TouchableOpacity
                style={{paddingBottom: normalize.setNormalize(15)}}
            onPress={()=>{
                navigation.navigate("StockDisplay", {
                    stock: {
                        sName: props.sName,
                        ticker: props.ticker
                    }
                })
            }}
            >
                <View style={{height: normalize.setNormalize(80), width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'rgba(82,82,82,0.3)', borderRadius: 30, paddingHorizontal: normalize.setNormalize(20), alignItems: 'center'}}>
                    <View>
                        <Text style={{fontSize: normalize.setNormalize(16),
        fontWeight: '800', color: percentColor}}>{props.sName}</Text>

                        <Text style={{color: 'white', fontSize: normalize.setNormalize(12)}}>{props.ticker}</Text>
                        <Text style={{color: 'gray', fontSize: normalize.setNormalize(12)}}>{'Score: ' + score}</Text>

                        {/* <View style={{width: 200, height: 100, backgroundColor: 'red'}}></View> */}



                    </View>
                    <Text style={{fontSize: normalize.setNormalize(12), color: percentColor, fontWeight: '700'}}>{}</Text>
                    

                    

                </View>



            </TouchableOpacity>


            
            
        )
    
}

export default StockContainer;

