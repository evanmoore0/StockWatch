import React, { Component, useEffect, useState } from "react";
import {View,Text, TouchableOpacity} from 'react-native'
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import {useNavigation} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import {auth, db} from '../utils/firebase-config'


function SearchContainer(props) {

    const [score, setScore] = useState(0)
    const navigation = useNavigation()

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

    }, [props]);

    return(
        <TouchableOpacity
                style={{}}
                onPress = {()=>{

                    navigation.replace("StockDisplay", {
                        stock: {
                            sName: props.stock,
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
        fontWeight: '800', color: '#6AB664', flexWrap: 'wrap', width: normalize.setNormalize(280)}}>{props.stock}</Text>

                        <Text style={{color: 'white', fontSize: normalize.setNormalize(12)}}>{props.ticker}</Text>
                        <Text style={{color: 'gray', fontSize: normalize.setNormalize(12)}}>{'Score: ' + score}</Text>

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