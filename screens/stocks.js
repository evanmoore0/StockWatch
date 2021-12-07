
//React Imports
import React, { useEffect, useRef, useState } from 'react';
import {FlatList, Text, TextInput, View, ScrollView, LogBox, Modal, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, Animated, Keyboard} from 'react-native';

//Icon imports
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

//Normalize function
import normalize from '../utils/normalize';

//Components
import Graphic from '../globalComponents/graphic';
import StockContainer from '../globalComponents/stockContainer';
import SearchContainer from '../globalComponents/searchContainer';

//Global StyleSheet
import GlobalStyles from '../utils/globalStyles';

//Firebase imports
import {auth, db} from '../utils/firebase-config'


function Stocks(props) {

    //Hooks
    //Stock symbol that is inputed into search bar
    const [stockSymbol, setStockSymbol] = useState('');

    //Whether search bar components should be shown
    const [visible, setVisible] = useState(false);

    //Data for search/trending
    const [searchData, setSearchData] = useState([])    
    const [trendingData, setTrendingData] = useState([])

    //Displaying info modal
    const [displayInfoOne, setDisplayInfoOne] = useState(false)

    //Value for animation
    const animatedValue = useRef(new Animated.Value(99)).current

    //Shrinking animation
    const animate = () => {
        console.log("in animate")
        Animated.timing(animatedValue, {
            toValue: 82,
            duration: 100,
            useNativeDriver: false
        }).start()
    }

    //Expanding animation
    const animateIncreaseWidth = () => {
        Animated.timing(animatedValue, {
            toValue: 99,
            duration: 100,
            useNativeDriver: false
        }).start()
    }

    //Width of the animated searchbox 
    const width = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    })

    //If the user is not searching a stock display the 
    const stockComponent = () => {
        if(!visible) {
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
        console.log("TOP OF GET")
        let tempTrending = []
        let tempPercChange = []
        await db.collection('score')
            .orderBy('score', 'desc')
            .limit(20)
            .get()
            .then(querySnapshot => {
                // console.log(querySnapshot.docs)
                querySnapshot.forEach(documentSnapshot => {
                    // console.log("ASLSDF")
                    // console.log("UP HERE")
                    

                    // const getPercentChange = async () => {
                    //     // console.log("IN here")
                    //     await fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/' + documentSnapshot.id + '?apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
                    //     .then(
                    //         function(response) {
                    //             return response.json();
                    //         }
                    //     )
                    //     .then(
                    //         function(data) {
                    //         //    console.log(data.results)
                    //             // console.log(documentSnapshot.id)

                    //             // console.log("STOCK TICKER " + documentSnapshot.id)
                    //             // console.log(data.ticker.todaysChangePerc)
                    //             // tempPercChange.push({ticker: documentSnapshot.id, percChange: data.ticker.todaysChangePerc})
                    //             // setPercData(tempPercChange)
                    //             // console.log(tempTrending[documentSnapshot.id])
                    //             // console.log(data.ticker.todaysChangePerc)
                    //             // console.log(tempPercChange)
                    //             // console.log("IN ")
                               
                    //         }
                    //     )
                    // }
                    
                    
                    // // console.log(tempPercChange)
                    // getPercentChange()
                    let cleanedName = documentSnapshot.data().sName.replace(/.Com|mon|Ltd|Brands|Corp|(DE)|Common|Stock|Inc|[,.()]|oration|Class A|Shares|Holdings|Group| I | Ordinary| Wordwide| Class| A | common stock |/g, "").replace(/[,.]/g, "").trim()


                    tempTrending.push({ticker: documentSnapshot.id, sName: cleanedName})
                    // console.log("OUT")
                })

            })

        setTrendingData(tempTrending)
        // console.log("OUT OUT")
        // console.log(trendingData)

    }

   
    useEffect(() => {
        getTrending()
       
    }, []);

    const cleanData = (bruh) => {

        if(bruh != undefined) {
            for(let i = 0; i < bruh.length; i++) {
        
                bruh[i].name = bruh[i].name.replace(/Corp|Common|Stock|Inc|[,.]|oration|Class A|Shares|Holdings|Group| I | Ordinary| Wordwide| Class| A | common stock/g, "").replace(/[,.]/g, "").trim()
                
                
            }

            setSearchData(bruh)

        } else {
            setSearchData([])
        }
        
        // bruh[0].name = bruh[0].name.replace(/Corp|Common|Stock/, "")
        // // console.log(bruh[0].name.replace(/Common|Stock/, ""))
        // console.log(bruh[0].name)


        

    }

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
               
                cleanData(data.results)

                // setSearchData(data.results)

                //    console.log(data.results)
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
                stickyHeaderIndices = {[2]}
                showsVerticalScrollIndicator = {false}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode = 'on-drag'
                >
                    {/* <Modal
                    visible = {displayInfoTwo}
                    presentationStyle = "overFullScreen"
                    transparent = {true}
                    animationType = 'fade'
                    
                    
                    >
                        
                        <TouchableOpacity style= {{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
                        onPress = {()=> {
                            // setDisplayInfoOne(false)
                            setDisplayInfoTwo(false)
                            console.log("in modal two")
                        }}
                        >
                            <Ionicons name="chatbox-sharp" size={normalize.setNormalize(160)} color="#3B3939" style={{left:normalize.setNormalize(291), top: normalize.setNormalize(835), position: 'absolute'}}/>
                            <Text style={{fontSize: normalize.setNormalize(12),color: 'white', width: normalize.setNormalize(125), left: normalize.setNormalize(310), top: normalize.setNormalize(590), position: 'absolute'}}>
                                Add a stock to your library by clicking the plus icon on the stocks page.
                                View the stocks in your library here.

                            </Text>
                            
                        </TouchableOpacity>

                    </Modal> */}

                    <Modal
                    visible = {displayInfoOne}
                    presentationStyle = "overFullScreen"
                    transparent = {true}
                    animationType = 'fade'
                    
                    >
                        
                        <TouchableOpacity style= {{flex:1}}
                        onPress = {()=> {
                            setDisplayInfoOne(false)    
                            console.log('here')                      
                        }}
                        >
                            <Ionicons name="chatbox-sharp" size={normalize.setNormalize(130)} color="#3B3939" style={{left:normalize.setNormalize(20), top: normalize.setNormalize(165), position: 'absolute'}}/>
                            <Text style={{color:'white', position: 'absolute', left: normalize.setNormalize(40), top: normalize.setNormalize(186), fontSize: normalize.setNormalize(12), width: normalize.setNormalize(90), height: normalize.setNormalize(150) }}>
                                A stocks score is the number of times it has been searched on this app!
                            
                            </Text>
                        </TouchableOpacity>

                    </Modal>

                    
                {/* <View style={{flexDirection: 'row', width: '100%', height: normalize.setNormalize(50), justifyContent: 'space-between'}}>
                    <Text style={{fontSize: normalize.setNormalize(24), color: 'rgb(199,199,199)'}}>Stocks</Text>
                    <Ionicons name="settings-sharp" size={24} color="white" />
                </View> */}
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>

                    <Text style={{color:'white', fontWeight: 'bold'}}>Trending</Text>

                    <TouchableOpacity
                    onPress = {()=> {
                        setDisplayInfoOne(true)
                        console.log('in inf button')
                    }}
                    >
                        <MaterialIcons name="info-outline" size={normalize.setNormalize(24)} color="white" />
                    </TouchableOpacity>
                    
                </View>
                <View>
                <View style={{paddingTop: normalize.setNormalize(10),
        paddingBottom: normalize.setNormalize(15), backgroundColor: 'rgba(0, 0, 0, 0.8)', flexDirection: 'row', alignItems: 'center'
                }}>
             
                <Animated.View style={[GlobalStyles.searchBarContainer], {
                    width: width
                }}>

                    <TextInput
                    style = {{backgroundColor: 'gray', height: normalize.setNormalize(32), width: '100%', borderRadius: normalize.setNormalize(10), paddingLeft: normalize.setNormalize(20), fontSize: normalize.setNormalize(18), color: 'white'}}
                    placeholderTextColor= 'white'
                    selectionColor = 'white'       
                    clearButtonMode = "always" 
                    
                
                    placeholder = {"Search"}
 
                    blurOnSubmit = {false}

                    onFocus = {() => {
                        animate()
                        // setShowClose(350)
                    }}
                    
                    onChangeText = {val => {
                        setStockSymbol(val)     
                        setVisible(true)
                    }}

                    keyboardType = 'default'
                    />
                </Animated.View>
                <TouchableOpacity
                    onPress = {()=>{
                        setVisible(false)
                        animateIncreaseWidth()
                        // setShowClose(10000)
                        Keyboard.dismiss()
                    }}
                    style={{ alignItems: 'flex-end', width: normalize.setNormalize(70)}}
                    >
                        <Text style={{color: 'gray', fontSize: normalize.setNormalize(16)}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                </View>
               
               {stockComponent()}

                </ScrollView>
            </KeyboardAvoidingView>
        )
}

const StockStyles = StyleSheet.create({

    searchBar: {
        backgroundColor: 'gray', height: normalize.setNormalize(32), width: '100%', borderRadius: normalize.setNormalize(30), paddingLeft: normalize.setNormalize(20), fontSize: normalize.setNormalize(18), color: 'white'
    }

})

export default Stocks;
