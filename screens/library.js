import React, { Component, useCallback, useEffect, useState } from "react";
import {View, Text, TouchableOpacity, FlatList, ScrollView, TextInput, TouchableHighlightBase, Alert, Modal} from 'react-native';
import NavBar from "../globalComponents/navBar";
import { auth, db } from "../utils/firebase-config";
import StockContainer from "../globalComponents/stockContainer";
import GlobalStyles from "../utils/globalStyles";
import Graphic from "../globalComponents/graphic";
import normalize from "../utils/normalize";
import getStockProfileData from "../utils/API/stockProfile";
import { useFocusEffect } from "@react-navigation/core";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";


function Library(props) {
    const [stocks, updateStocks] = useState([]);
    const [gainers, updateGainers] = useState([]);
    const [losers, updateLosers] = useState([]);
    const [allStocks, updateAllStocks] = useState([]);
    const [fontWeight, setFontWeight] = useState(['700', '400', '400'])
    const [lineHeight, setLineHeight] = useState([1, 0.2, 0.2])
    const [isVisible, setVisible] = useState(false)
    const [toadysGain, setTodaysGain] = useState(0)




    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         stocks: [],
    //         fontWeight: ['700', '400', '400'],
    //         lineHeight: [1, 0.2, 0.2]
    //     }
    // }


    const getTodaysGain = () => {
        console.log(" IN TODAYS GAIN")
        console.log(allStocks.length)
        let gain = 0
        console.log(stocks.length)
        for(let i = 0; i < stocks.length; i++) {
            console.log(stocks[i].percentChange)
            gain += stocks[i].percentChange
        }

        setTodaysGain(Math.round((gain/stocks.length)*100)/100)
    }

    const handleClick = (a) => {
        let tempWeight = ['400', '400', '400']
        let tempHeight = [0.2, 0.2, 0.2]
        tempWeight[a] = '700'
        tempHeight[a] = 1

        setFontWeight(tempWeight)
        setLineHeight(tempHeight)

        if(a == 0) {

            updateStocks(allStocks)

        } else if(a == 1) {

            let tempGainers = []

            for(let i = 0; i < allStocks.length; i++) {

                if(allStocks[i].percentChange > 0) {

                    tempGainers.push(allStocks[i])
                    console.log(allStocks[i])

                }

            }

            updateStocks(tempGainers)

        } else if(a == 2) {

            let tempLosers = []

            for(let i = 0; i < allStocks.length; i++) {

                if(allStocks[i].percentChange < 0) {

                    tempLosers.push(allStocks[i])

                }

            }

            updateStocks(tempLosers)

        }

    }

     const add = async () => {

        try {

            console.log("IN ADD")
        const data = await db.collection('users').doc(auth.currentUser.uid).get()
        
        let tempStock = data.data().stocks  
        // let stockObj = {
        //     ticker: props.route.params.stock.ticker,
        //     percChange: props.route.params.stock.percChange
        // }  



        for(let i = 0; i < tempStock.length; i++) {
            if(tempStock[i].ticker == props.route.params.stock.ticker) {
                Alert.alert("This stock is already in your library")
                throw "O no"
            }
        }
            
        console.log("WHIT")
        tempStock.push(props.route.params.stock)
                        

        // getTodaysGain()
        

        db.collection('users').doc(auth.currentUser.uid).update({stocks: tempStock})
       
        tempStock.sort(function(a,b) {
            return a.sName.localeCompare(b.sName)
        })
        updateStocks(tempStock)
        updateAllStocks(tempStock)
        getTodaysGain()
            
        



        // console.log("BOTTOM OF ADD")

        } catch {
            console.log("HI")
            const data = await db.collection('users').doc(auth.currentUser.uid).get()
            updateStocks(data.data().stocks)
            console.log(stocks)
            getTodaysGain()

            // console.log("IN CATCH")
        }
    
    }

    useEffect(()=> {
        console.log("IN LIBRARY")
        add()
    }, [])

    // useEffect(()=> {
    //     getTodaysGain()
    // }, [props])



    const handleSignOut = () => {
        auth.signOut();
    }
    
        return (
            <View style={GlobalStyles.homePageContainer}>
                 <View style={{position: 'absolute', top: normalize.setNormalize(90), width: '100%', height: normalize.setNormalize(800), opacity: 0.2, zIndex: 0}}>
                        <Graphic
                        scale = {1.4}
                        />                    
                </View>
                <View style={{width: '100%', alignItems: 'flex-end', height: normalize.setNormalize(40), justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>

                    <TouchableOpacity
                    onPress = {()=> {

                        setVisible(true)                        
                    }}
                    >
                        <Ionicons name="ios-settings-outline" size={normalize.setNormalize(30)} color="white" />

                    </TouchableOpacity>
                </View>

                <Modal
                visible = {isVisible}
                presentationStyle = "overFullScreen"
                transparent = {true}
                animationType = "slide"
                >
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{height: normalize.setNormalize(200), width: normalize.setNormalize(200), backgroundColor: 'gray', borderRadius: 50, justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{width: '100%', paddingLeft: normalize.setNormalize(20), paddingTop: normalize.setNormalize(20)}}>
                                <TouchableOpacity style={{backgroundColor: '#6AB664', borderRadius: 50, width: normalize.setNormalize(50), height: normalize.setNormalize(50), justifyContent: 'center', alignItems: 'center'}}
                                onPress= {()=> {
                                    setVisible(false)
                                }}
                                >
                                    <AntDesign name="close" size={normalize.setNormalize(24)} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingBottom: normalize.setNormalize(40)}}>
                                <TouchableOpacity style={{backgroundColor: '#6AB664', padding: normalize.setNormalize(20), borderRadius: 50}}
                                onPress = {()=>{
                                    handleSignOut()
                                }}
                                >
                                    <Text style={{color: 'white'}}>Sign out</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                </Modal>
                <ScrollView
                stickyHeaderIndices = {[1]}
                style={{zIndex: 1}}
                >


                <View style={{
                    height: normalize.setNormalize(42),
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    width: '100%'

                }}>
                    <View style={{flexDirection: 'row', backgroundColor:'gray', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 10, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'white', fontSize: normalize.setNormalize(16)}}>Today's Gain:</Text>
                        <Text style={{fontSize: normalize.setNormalize(16), color: '#6AB664', fontWeight: '700'}}>{toadysGain }</Text>


                    </View>

                
                
                </View>

                <View style={{ height: normalize.setNormalize(60), paddingTop: normalize.setNormalize(10), backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'space-between', zIndex: 100}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>

                        <View style={{ width: '33%', alignItems: 'center'}}>
                            <TouchableOpacity
                        style={{width:'100%', alignItems:'center'}}

                            onPress = {()=> {
                            handleClick(0)
                            }}
                            >
                                <Text style={{color: 'white', fontSize: normalize.setNormalize(20), paddingRight: normalize.setNormalize(15), fontWeight: fontWeight[0]}}>All</Text>
                                <View style={{paddingTop: normalize.setNormalize(15), width: '100%'}}>
                                    <View style={{height: lineHeight[0], backgroundColor: 'white', width: '100%', opacity: 0.5}}></View>

                                </View>

                            </TouchableOpacity>

                            

                        </View>

                        <View style={{ width: '34%', alignItems: 'center'}}>
                            <TouchableOpacity

                            style={{width:'100%', alignItems:'center'}}

                            onPress = {()=> {
                                handleClick(1)
                                // allGainersLosers("Gainers")
                               
                            }}

                            >
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(20), fontWeight: fontWeight[1]}}>Gainers</Text>
                            <View style={{paddingTop: normalize.setNormalize(15), width: '100%'}}>
                                    <View style={{height: lineHeight[1], backgroundColor: 'white', width: '100%', opacity: 0.5}}></View>

                                </View>

                            </TouchableOpacity>
                        </View>


                        <View style={{ width: '33%', alignItems: 'center'}}>

                        <TouchableOpacity
                        
                        style={{width:'100%', alignItems:'center'}}
                        onPress = {()=> {
                            handleClick(2)
                        }}
                        >
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(20), paddingLeft: normalize.setNormalize(15), fontWeight: fontWeight[2]}}>Losers</Text>
                            <View style={{paddingTop: normalize.setNormalize(15), width: '100%'}}>
                                    <View style={{height: lineHeight[2], backgroundColor: 'white', width: '100%', opacity: 0.5}}></View>

                                </View>

                        </TouchableOpacity>


                        </View>



                    </View>

                    
                </View>

            

            

            <FlatList
            data = {stocks}
            renderItem = {({item, index}) => (
            
                <StockContainer
                ticker = {item.ticker}
                sName = {item.sName}
                />
            )}

            keyExtractor = {(item, index) => index.toString()}
            />

            </ScrollView>


            </View>
        )
    // }
}

export default Library;