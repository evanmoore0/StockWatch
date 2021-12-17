
//React Imports
import React, { useEffect, useRef, useState } from 'react';
import {FlatList, Text, TextInput, View, ScrollView, LogBox, Modal, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, Animated, Keyboard, RefreshControl} from 'react-native';

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


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

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

    const [refreshing, setRefreshing] = useState(false)
    //Regex for cleaning stock name
    // const clean = /.Com|mon|Ltd|Brands|Corp|(DE)|Common|Stock|Inc|[,.()]|oration|Class A|Shares|Holdings|Group| I | Ordinary| Wordwide| Class| A | common stock |/g
    const clean = /Brands/g

    //Shrinking animation
    const animate = () => {
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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getTrending();
        wait(2000).then(() => setRefreshing(false))
    }, [])

    //If the user is not searching a stock display the trending page, otherwise
    //display search page
    const stockComponent = () => {
        if(!visible) {
            return(
                <FlatList
               data = {trendingData}
               showsVerticalScrollIndicator = {false}
               style ={{zIndex: 0}}
               renderItem={({item}) => (
                       
                   <StockContainer
                   sName = {item.sName}
                   ticker = {item.ticker}
                   score = {item.score}
                   percentChange = {item.percentChange}
                   />
                   
               )}
               />
            )
        } else {
            return(
                <FlatList
                data = {searchData}
                showsVerticalScrollIndicator = {false}
                renderItem={({item}) => (
                   <SearchContainer
                   sName = {item.Name}
                   ticker = {item.Symbol}
                   
                   />
               )}
               />

            )
        }
    }



    //Get tickers to be displayed on the search page
    // const getTickers = async () => {
    //     try {
    //         await fetch('https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&exchange=XNAS&search=' + stockSymbol + '&active=true&sort=ticker&order=asc&limit=20&apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
    //         .then(
    //             function(response) {
    //                 return response.json();
    //             }
    //         )
    //         .then(
    //             function(data) {
                    

    //                 // cleanData(data.results)

    //             }
    //         )
    //     } catch (err) {
    //         Alert.alert(err)
    //     }
    // }

    const getTickers = async () => {
        try {
            await fetch('https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/297344d8dc0a9d86b8d107449c851cc8/constituents_json.json')
            .then(
                function(response) {
                    return response.json()
                }
            )
            .then(
                function(data) {
                    setSearchData(data.filter(value =>  value.Name.replace(/Technologies| Technology/g, "").includes(stockSymbol)))
            
                }
            )
        } catch (error) {
            
        }
    }

    //Get top 20 stocks with the highest score
    const getTrending = async () => {
        // console.log("TOP OF GET asjkdjsTRENDINGS")
        let tempTrending = []

        let listStocks = ""

        //Access score collection and get 20 stocks with the highest score
        await db.collection('score')
            .orderBy('score', 'desc')
            .limit(10)
            .get()
            .then(querySnapshot => {
                // console.log("IN FIRST THEN")
                
                querySnapshot.forEach(documentSnapshot => {

                    listStocks = listStocks + documentSnapshot.id + ","
                   
                    //Clean the name from the database
                    let cleanedName = documentSnapshot.data().sName.replace(clean, "").trim()

                    // console.log(documentSnapshot.data().score)
                    //Store the trending data in a temp variable
                    tempTrending.push({ticker: documentSnapshot.id, sName: cleanedName, score: documentSnapshot.data().score, percentChange: 0})
                    // console.log("in getTrending")

                })

            })
            .then(
                async function() {
                    try {
                        await fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=' + listStocks +'&apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
                        .then(
                            function(response) {
                                return response.json()
                            }
                        )
                        .then(
                            function(data) {
                                // console.log("HERE")
                                data.tickers.forEach((stock, index) => {
                                    tempTrending.forEach((trendingStock) => {
                                        if(trendingStock.ticker == stock.ticker) {
                                            trendingStock.percentChange = stock.todaysChangePerc
                                        }
                                    })
                                })
                                // console.log(tempTrending)
                                setTrendingData(tempTrending)


                            } 
                        )
                    } catch (error) {
                        
                    }
                }
            )
            
        //Set temp trending hook
    }

    

    //Cleans the stock names using a regex
    // const cleanData = (searchData) => {

    //     //Make sure search bar isn't empty
    //     if(searchData != undefined) {
    //         for(let i = 0; i < searchData.length; i++) {
        
    //             //Clean the name
    //             searchData[i].name = searchData[i].name.replace(clean, "").trim()
    //         }

    //         //Update the data
    //         setSearchData(searchData)

    //     } else {
    //         //If the search bar is empty set the data to be an empty array
    //         setSearchData([])
    //     }
    // }

    //Called every time the component is mounted
    useEffect(() => {
        console.log("In stocks useEffect")
        getTrending()

    }, []);

    

    // const test = async () => {

    //     console.log("In test")
    //     setSearchData(await StockList())
    // }

    // useEffect(()=>{
    //     test()
    // }, [props])

    useEffect(() => {
        console.log("IN props useef")
    }, [props])


    //Called everytime the stockSymbol hook is updated (When the user types in the search bar)
    useEffect(() => {
        getTickers()
    }, [stockSymbol]);

    // if(rendering) {
    //     console.log("IN RENDINERISJDF")
    //     return(
    //         <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
    //             <Text style={{color: 'red'}}>
    //                 Loading...
    //             </Text>
    //         </View>
    //     )
    // }
    return (

        //Container for whole screen
        //Allows user to view full list of data when keyboard is up
        <KeyboardAvoidingView 
        style = {GlobalStyles.homePageContainer}
        keyboardVerticalOffset = {10}
        behavior = 'padding'
        >
            
            {/*
            Graphic that is displayed under trending 
             */}
            <View 
            style = {
                {
                    position: 'absolute', 
                    top: normalize.setNormalize(60), 
                    width: '100%', 
                    height: normalize.setNormalize(800), 
                    opacity: 0.04, 
                    backgroundColor:'black'
                }
            }>

                    <Graphic
                    scale = {1.4}
                    />       

            </View>
                
            {/*
            Scroll View for the whole page, allows trending title and info icon to scroll.
            StickyHeaderIndices - keeps the search bar at the top of the page when the user scrolls.
            KeyboardSouldPersistTaps - Allows user to press on button when the keyboard is up.
            KeyboardDismissMode - Dismisses keyboard when the user drags
             */}
            <ScrollView
            stickyHeaderIndices = {[2]}
            showsVerticalScrollIndicator = {false}
            keyboardShouldPersistTaps='always'
            keyboardDismissMode = 'on-drag'
            refreshControl = {
                <RefreshControl
                refreshing = {refreshing}
                onRefresh = {onRefresh}
                progressBackgroundColor = 'red'
                title = 'REFRESHING'
                titleColor = 'white'
                />
            }
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

                {/*
                Chat bubble that is displayed when the info button is pressed
                */}
                <Modal
                visible = {displayInfoOne}
                presentationStyle = "overFullScreen"
                transparent = {true}
                animationType = 'fade' 
                >
                    {/*
                    Allows user to press anywhere on the screen to dismiss the modal
                    */}
                    <TouchableOpacity 
                    style = {
                        {
                            flex:1
                        }
                    }
                    onPress = {() => {
                        setDisplayInfoOne(false)    
                    }}
                    >
                        {/*
                        Chat icon
                        */}
                        <Ionicons 
                        name = "chatbox-sharp" 
                        size = {normalize.setNormalize(130)} 
                        color = "#3B3939" 
                        style = {
                            {
                                left:normalize.setNormalize(20), 
                                top: normalize.setNormalize(165), 
                                position: 'absolute'
                            }
                        }/>

                        {/*
                        Text inside chat icon
                        */}
                        <Text 
                        style = {
                            {
                                color:'white', 
                                position: 'absolute', 
                                left: normalize.setNormalize(40), 
                                top: normalize.setNormalize(186), 
                                fontSize: normalize.setNormalize(12), 
                                width: normalize.setNormalize(90), 
                                height: normalize.setNormalize(150) 
                            }
                        }>
                            A stocks score is the number of times it has been searched on this app!
                        
                        </Text>

                    </TouchableOpacity>

                </Modal>

                {/*
                Trending title and info button container
                */}
                <View 
                style = {
                    {
                        width: '100%', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between'
                    }
                }>

                    {/*
                    Trending title
                    */}
                    <Text 
                    style = {
                        {
                            color:'white', 
                            fontWeight: 'bold'
                        }
                    }>
                        Trending
                    </Text>

                    {/*
                    Info button
                    */}
                    <TouchableOpacity
                    onPress = {() => {
                        setDisplayInfoOne(true)
                    }}>
                        <MaterialIcons 
                        name="info-outline" 
                        size={normalize.setNormalize(24)} 
                        color="white" 
                        />
                    </TouchableOpacity>
                    
                </View>

                {/*
                Container for search bar and cancel button (without it sticky header indices messes up)
                */}
                <View>

                    {/*
                    Actual container for search bar and cancel button
                    */}
                    <View 
                    style = {
                        {
                            paddingTop: normalize.setNormalize(10),
                            paddingBottom: normalize.setNormalize(15), 
                            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                            flexDirection: 'row', 
                            alignItems: 'center'
                        }
                    }>
             
                        {/*
                        Allows me to shirnk/expand the search bar
                        */}
                        <Animated.View 
                        style = {
                            [GlobalStyles.searchBarContainer], 
                            { width: width }
                        }>
                            
                            {/*
                            Search bar
                            */}
                            <TextInput
                            style = {
                                {
                                    backgroundColor: 'gray', 
                                    height: normalize.setNormalize(32), 
                                    width: '100%', 
                                    borderRadius: normalize.setNormalize(10), 
                                    paddingLeft: normalize.setNormalize(20), 
                                    fontSize: normalize.setNormalize(18), 
                                    color: 'white'
                                }}

                            spellCheck = {false}
                            placeholderTextColor = 'white'
                            placeholder = {"Search"}
                            selectionColor = 'white'       
                            clearButtonMode = "always" 
                            blurOnSubmit = {false}
                            
                            //When the user clicks on the search bar, show the animation
                            onFocus = {() => {
                                animate()
                            }}
                            
                            //Update the stock hook and show the stock page when the user types
                            onChangeText = {val => {
                                setStockSymbol(val)     
                                setVisible(true)
                            }}

                            keyboardType = 'default'
                            />

                        </Animated.View>

                        {/*
                        Cancel button
                         */}
                        <TouchableOpacity

                        //When the cancel button is press display the trending page, expand animation, and dismiss the keyboard
                        onPress = {() => {
                        setVisible(false)
                        animateIncreaseWidth()
                        Keyboard.dismiss()
                        }}

                        style = {
                            { 
                                alignItems: 'flex-end', 
                                width: normalize.setNormalize(70)
                            }}>

                            <Text 
                            style = {
                                {
                                    color: 'gray', 
                                    fontSize: normalize.setNormalize(16)
                                }}>
                                    Cancel
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
               
               {/*
               Either trending page or stock page
                */}
               {stockComponent()}

                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

export default Stocks;
