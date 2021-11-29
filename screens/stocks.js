import React, { createRef, useEffect, useRef, useState } from 'react';
import {FlatList, Text, TextInput, View, ScrollView, LogBox, Modal, Dimensions, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Pressable, Alert} from 'react-native';
import NavBar from '../globalComponents/navBar';
import { Ionicons } from '@expo/vector-icons';
import normalize from '../utils/normalize';
import { FontAwesome } from '@expo/vector-icons';
import StockContainer from '../globalComponents/stockContainer';
import { SafeAreaView } from 'react-native-safe-area-context';
import getStockProfileData from '../utils/API/stockProfile';
import GlobalStyles from '../utils/globalStyles';
import Graphic from '../globalComponents/graphic';
import { MaterialIcons } from '@expo/vector-icons';
import SearchContainer from '../globalComponents/searchContainer';
import {auth, db} from '../utils/firebase-config'
import { useFocusEffect } from '@react-navigation/core';



const stockData = [
    {
        stock: "Apple",
        ticker: "APPL",
        percentChange: "+ 7.23%",
        key:'1',
        score: 1891
    },
    {
        stock: "American Airlines",
        ticker: "AAL",
        percentChange: "- 1.23%",
        key:'2',
        score: 1399

    },
    {
        stock: "Microsoft",
        ticker: "MSFT",
        percentChange: "+ 2.23%",
        key:'3',
        score: 1023


    },
    {
        stock: "J.P. Morgan",
        ticker: "JPM",
        percentChange: "- 3.13%",
        key:'4',
        score: 984

    },
    {
        stock: "Testla",
        ticker: "TSLA",
        percentChange: "+ 10.23%",
        key:'5',
        score: 856

    },
    {
        stock: "Lucid Motors",
        ticker: "LCID",
        percentChange: "+ 0.23%",
        key: '6',
        score: 760
    },
    {
        stock: "SnapChat",
        ticker: "SNAP",
        percentChange: "- 0.32%",
        key:'7',
        score: 602

    },
    {
        stock: "Disney",
        ticker: "Dis",
        percentChange: "- 4.23%",
        key:'9',
        score: 529

    },
    {
        stock: "Roku",
        ticker: "ROKU",
        percentChange: "+ 7.23%",
        key:'10',
        score: 299

    },
];

const {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
} = Dimensions.get('window')

const stockTickers = ['TSLA', 'APPL', 'DIS', 'JPM', 'AAL', 'MSFT', 'LCID', 'AMC', 'ZOM']

function Stocks(props) {

    const [stockSymbol, setStockSymbol] = useState('');
    const [visible, setVisible] = useState(false);
    const [searchData, setSearchData] = useState([])    
    const [trendingData, setTrendingData] = useState([])
    const [updateTrending, setUpdateTrending] = useState(false)

    const stockComponent = () => {
        if(!visible) {
            // console.log("In stock component")
            return(
                
                <FlatList
               data = {trendingData}
               showsVerticalScrollIndicator = {false}
               style ={{zIndex: 0}}
               renderItem={({item})=>(
                       
                   <StockContainer
                   sName = {item.sName}
                   ticker = {item.ticker}
                   />
                   
               )}
               />
            )
        } else {
            return(
                <FlatList
               data = {searchData}
               showsVerticalScrollIndicator = {false}
               renderItem={({item})=>(
                   <SearchContainer
                   stock = {item.name}
                   ticker = {item.ticker}
                   
                   />
               )}
               />

            )
        }
    }

    const getTrending = async () => {
        let tempTrending = []
        await db.collection('score')
            .orderBy('score', 'desc')
            .limit(20)
            .get()
            .then(querySnapshot => {
                // console.log(querySnapshot.docs)
                querySnapshot.forEach(documentSnapshot => {
                    // console.log("ASLSDF")
                    const getPercentChange = async () => {
                        // console.log("IN here")
                        await fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/' + documentSnapshot.id + '?apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
                        .then(
                            function(response) {
                                return response.json();
                            }
                        )
                        .then(
                            function(data) {
                            //    console.log(data.results)
                                // console.log(documentSnapshot.id)

                                // console.log(data.ticker.todaysChangePerc)
                               
                            }
                        )
                    }
                    getPercentChange()
                    tempTrending.push({ticker: documentSnapshot.id, sName: documentSnapshot.data().sName})
                })
            })

        setTrendingData(tempTrending)
        // console.log(trendingData)

    }



    useEffect(() => {
        // let re = new RegExp('A+L*')
        // console.log("IN REGEX")
        // let bruh = stockData.filter(({ticker}) => (
        //     // console.log(stock)
        //     ticker.search(re) == 0
        //     // console.log(stock.length)
        // ))
        // console.log(bruh)
        getTrending()
    }, []);

    const getTickers = () => {

        try {
            fetch('https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&exchange=XNAS&search=' + stockSymbol + '&active=true&sort=ticker&order=asc&limit=20&apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                //    console.log(data.results)
                   if(data.results == null) {
                       Alert.alert("Sorry we couldn't find your stock")
                   }

                   setSearchData(data.results)
                }
            )
        } catch (err) {
            Alert.alert(err)
        }
    }

    useEffect(() => {

        getTickers()
        
    
    }, [stockSymbol]);



        return (
            <KeyboardAvoidingView style={GlobalStyles.homePageContainer}
            keyboardVerticalOffset = {10}
            behavior = 'padding'
            >

                <View style={{position: 'absolute', top: normalize.setNormalize(60), width: '100%', height: normalize.setNormalize(800), opacity: 0.04, backgroundColor:'black'}}>
                        <Graphic
                        scale = {1.4}
                        />                    
                </View>
                

                <ScrollView
                stickyHeaderIndices = {[1]}
                showsVerticalScrollIndicator = {false}
                >
                {/* <View style={{flexDirection: 'row', width: '100%', height: normalize.setNormalize(50), justifyContent: 'space-between'}}>
                    <Text style={{fontSize: normalize.setNormalize(24), color: 'rgb(199,199,199)'}}>Stocks</Text>
                    <Ionicons name="settings-sharp" size={24} color="white" />
                </View> */}
                <View style={{width: '100%', alignItems: 'flex-end'}}>

                    <MaterialIcons name="info-outline" size={normalize.setNormalize(24)} color="white" />
                    <TouchableOpacity
                    onPress = {()=>{
                        setVisible(false)
                    }}
                    >
                        <Text style={{color: 'white'}}>Close</Text>
                    </TouchableOpacity>

                </View>
             
                <View style={GlobalStyles.searchBarContainer}>

                    
                    
                   
                    <TextInput
                    style = {{backgroundColor: 'gray', height: normalize.setNormalize(32), width: '100%', borderRadius: normalize.setNormalize(50), paddingLeft: normalize.setNormalize(20), fontSize: normalize.setNormalize(18), color: 'white'}}
                    placeholderTextColor= 'white'
                    selectionColor = 'white'        
                
                    placeholder = "Search"

                    blurOnSubmit = {false}

                    
                    onChangeText = {val => {
                        setStockSymbol(val)     
                        setVisible(true)

                    }}

                    
                    onSubmitEditing = {()=>{
                        //Route to stock page/ send stock ticker/ load stock data ON THAT
                        // PAGE/ Display
                        props.navigation.navigate("StockDisplay", {
                            ticker: stockSymbol,
                            searchId: 96
                        })
                    }}

                    keyboardType = 'default'
                    />
                </View>
               
               {stockComponent()}

                </ScrollView>
            </KeyboardAvoidingView>
        )
}

const StockStyles = StyleSheet.create({

    searchBar: {
        backgroundColor: 'gray', height: normalize.setNormalize(32), width: '100%', borderRadius: normalize.setNormalize(50), paddingLeft: normalize.setNormalize(20), fontSize: normalize.setNormalize(18), color: 'white'
    }

})

export default Stocks;
