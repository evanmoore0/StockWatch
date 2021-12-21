




//NOTES: NOT SETTING FINALDATA IN GET SCORE, ONLY ALLDATA






//React imports
import React, { useEffect, useState, useRef } from "react";
import {View, Text, TouchableOpacity, FlatList, ScrollView, Alert, Modal, ActivityIndicator, StyleSheet, AppState} from 'react-native';

//Firebase imports
import { auth, db } from "../utils/firebase-config";

//Components
import StockContainer from "../globalComponents/stockContainer";
import Graphic from "../globalComponents/graphic";

//Styles
import GlobalStyles from "../utils/globalStyles";

//Normalize function
import normalize from "../utils/normalize";

//Icons
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import {Swipeable} from 'react-native-gesture-handler'

//Config file
import config from "../config";
import Constants from "../Constants";

//Custom hook to update page
function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value+1)
}

function Library(props) {

    const forceUpdate = useForceUpdate();

    //Hooks
    //Gets the current state of the app
    //Whether the user is on the app, background, or the app is "inactive"
    const appState = useRef(AppState.currentState);

    //Get the app state
    const [appStateVisible, setAppStateVisible] = useState(appState.current)

    //All/Gainers/Losers buttons
    const [fontWeight, setFontWeight] = useState(['700', '400', '400'])
    const [lineHeight, setLineHeight] = useState([1, 0.2, 0.2])

    //Whether modal should be shown
    const [isVisible, setVisible] = useState(false)

    //Todays Gain
    const [toadysGain, setTodaysGain] = useState(0)

    //Index of stock that needs to be removed
    const [removeIndex, setRemoveIndex] = useState(0)

    //Data initially fetched from the database for the user
    const [userData, setUserData] = useState([])

    //Store all of the data
    const [allData, setAllData] = useState([])

    //Final data, set when user presses All?Gainers/Losers
    const [finalData, setFinalData] = useState([])


    const swipeableRef = useRef(null);
    const swipeableFirstRef = useRef(null);

    //Use to check if app is mounted before updating appstate
    const isMounted = useRef(false)

    //Display activity indicator when data is loading in
    const [loading, setLoading] = useState(true)

    //Todays gain color
    const [color, setColor] = useState("white")


    const allGainersLosers = (index, text) => {
        return(
                <View style={{ width: '33%', alignItems: 'center'}}>
                    <TouchableOpacity
                    style={{width:'100%', alignItems:'center'}}
                    onPress = {()=> {
                        handleClick(index)
                        }
                    }>
                            <Text style={[libraryStyles.allGainersLosersText, {fontWeight: fontWeight[index]}]}>{text}</Text>
                        <View style={libraryStyles.linePadding}>
                            <View style={[libraryStyles.line, {height: lineHeight[index]}]}></View>
                        </View>
                    </TouchableOpacity>
                        
                </View>
        )

    }


    //Show activity indicator when data is loading, display stock containers when done
    const stockContainers = () => {
        if(loading) {
            return (<ActivityIndicator
            color = {Constants.THEME_COLOR.blue}
            size = 'large'
            />)
        } else {
            return(
    
                <FlatList
                data = {finalData}
                renderItem = {({item, index}) => (

                    <Swipeable
                    ref = {swipeableRef}
                    renderRightActions = {rightActions}
                    
                    onSwipeableRightOpen = {()=>{
                        setRemoveIndex(index)
                    }}
                    >
                        <StockContainer
                        ticker = {item.ticker}
                        sName = {item.sName}
                        percentChange = {item.percentChange}
                        score = {item.score}
                        />
                </Swipeable>
                
            )}

            keyExtractor = {(item, index) => index.toString()}
            />
            )
        }
    }

    //Red X that is displayed when user swipes on stock container
    const rightActions = () => {
        return (
            <TouchableOpacity style={libraryStyles.removeContainer}
            onPress = {() => {
                remove(removeIndex)
                handleClick(0)
            }}
            >
                <FontAwesome 
                name="remove" 
                size={normalize.setNormalize(24)} 
                color="red" 
                />
            </TouchableOpacity>
        )
    }

    const remove = async (removeIndex) => {

        allData.splice(removeIndex, 1)
        console.log(allData)
       
        forceUpdate()
    }

    const closeSwipeable = () => {
        swipeableRef.current.close()
    }

    //Calculate users gain based on whether they are in All/Gainers/Losers
    const getTodaysGain = (stockData) => {
        let gain = 0
        
        for(let i = 0; i < stockData.length; i++) {
            gain += stockData[i].percentChange
        }

        if(gain == 0) {
            setTodaysGain(0)
        } else {
            setTodaysGain(Math.round((gain/stockData.length)*100)/100)
        }

        if(gain > 0) {
            setColor(Constants.THEME_COLOR.green)
        } else {
            setColor(Constants.THEME_COLOR.blue)
        }
    }

    //Updates the title/data
    const handleClick = (a) => {
        let tempWeight = ['400', '400', '400']
        let tempHeight = [0.2, 0.2, 0.2]
        tempWeight[a] = '700'
        tempHeight[a] = 1

        setFontWeight(tempWeight)
        setLineHeight(tempHeight)

        let t = allData

        if(a == 0) {

            setFinalData(allData)
            setLoading(false)
            getTodaysGain(allData)


        } else if(a == 1) {
          
            let tempGain = t.filter((stock) => stock.percentChange > 0)
            getTodaysGain(tempGain)
            setFinalData(tempGain)

            

        } else if(a == 2) {
         
            let tempLose = t.filter((stock) => stock.percentChange <= 0)
            getTodaysGain(tempLose)
            setFinalData(tempLose)
        }

    }

    //Get the percent change for all of the users stocks
    const getPercentChange = async () => {

        let tempData = userData

        let listStocks = ""

        tempData.forEach((stock) => {
            listStocks = listStocks + stock.ticker + ","
           
        })

        //Pass in list of stocks so its only 1 api call
        if(listStocks != "") {
            try {
                await fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=' + listStocks +'&apiKey=' + config.POLYGON_API_KEY)
                .then(
                    function(response) {
                        return response.json()
                    }
                )
                .then(
                    function(data) {

                        for(let stock in tempData) {
                           for(let stockApi in data.tickers) {
                               if(data.tickers[stockApi].ticker == tempData[stock].ticker) {
                                   tempData[stock].percentChange = data.tickers[stockApi].todaysChangePerc
                               }
                           }
                        }
                        setAllData(tempData)
                        setFinalData(tempData)
                        //Call add stock here just in case the user 
                        //REMOVE? THIS COMPONENT ALREADY MOUNTS BEFORE USER CAN ADD A STOCK???
                        addStock()  
                        getScore(tempData.sort(function(a,b) {
                                    return a.sName.localeCompare(b.sName)
                        }))
                    }
                )
    
                
            } catch (error) {
                
            } finally {
            }

        }
    }

    //Get the score for each stock in the users library
    const getScore = async(data) => {

        for(let stock in data) {
         
            let score = await db.collection('score').doc(data[stock].ticker).get()
            data[stock].score = score.data().score
        }

        setAllData(data)
        getTodaysGain(data)
    }

    const updateUserData = (data) => {
            setUserData(data)
    }

    useEffect(() => {

        getPercentChange()

    }, [userData])


    const getStocks = async () => {
        try {

            await db
            .collection('users')
            .doc(auth.currentUser.uid)
            .get()
            .then(
                function(response) {
                    updateUserData(response.data().stocks)
                 
                }
            )
            
        } catch (error) {
            console.log(error)
        } 
    }

    const addStock = async () => {


        
        if(props.route.params != undefined) {

            
            let shouldAdd = true

            allData.forEach((stock) => {
                if(stock.ticker == props.route.params.stock.ticker) {
                    shouldAdd = false
                }
            })


            if(shouldAdd) {
                let temp = allData
                temp.push({
                    percentChange: props.route.params.stock.percentChange,
                    sName: props.route.params.stock.sName,
                    ticker: props.route.params.stock.ticker,
                    score: props.route.params.stock.score
                    
                })
                // setFinalData(oldUserData => [...oldUserData, {
                //     percentChange: props.route.params.stock.percentChange,
                //     sName: props.route.params.stock.sName,
                //     ticker: props.route.params.stock.ticker,
                //     score: props.route.params.stock.score
                // }])
                // setFinalData(temp)
              
                setAllData(temp)
                handleClick(0)

                // try {

                //     await db.collection("users").doc(auth.currentUser.uid).update({stocks:allData})
                    
                // } catch (error) {
                    
                // }

            }


            
            
        }

    }

    useEffect(()=> {
        addStock()
    }, [props])

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState)=> {
            // if(appState.current.match(/inactive|background/) === "inactive") {
               
                // updateDB()
            // } 
            // console.log("IN subscriptino")

            if(isMounted.current) {
                console.log("IN subscription")
                console.log(isMounted.current)


                appState.current = nextAppState
                setAppStateVisible(appState.current)
                if(nextAppState !== 'active') {
                return;
            }

            }
        });
    }, [])

     //When the user swipes out of the app update the database
     useEffect(()=> {
        if(appState.current == "inactive") {
            updateDB()
        }
    }, [appStateVisible])

    useEffect(()=> {

        setLoading(true)
        console.log("IN use effect")
        isMounted.current = true;
        
        getStocks()
        setLoading(false)

        // setLoading(false)

        

        // return () => {
            
        //     // updateDatabase()

        //     componentMounted.current = false

        //     // console.log("IN UNSUBSCRIBE")



        // }

        

        return () => {

            console.log("IN set mounted")

            isMounted.current = false
            
        }



    }, [])

    const updateDB = async() => {

        console.log("IN update db")
       
        try {
            await db.collection("users").doc(auth.currentUser.uid).update({stocks:allData})
        } catch (error) {
            
        } finally {
            // setAllData({})
            // setFinalData({})
            // set
        }

    }

    // const updateDatabase = async() => {

    //     console.log("update database")
    //     console.log(finalData)

    //     try {

    //         await db.collection('users').doc(auth.currentUser.uid).update({stocks: finalData})

            
    //     } catch (error) {
            
    //     }

    // }

    // const cleanUp = async () => {
    //     setUserData([])
    //     setLoading(true)
    //     setTodaysGain(0)
    // }

    // useEffect(()=>{
    //     console.log(
    //         "IN props useeefec"
    //     )
    // }, [props])
    // useEffect(()=> {
    //     getTodaysGain()
    // }, [props])


    const handleSignOut = async () => {
        console.log(auth.currentUser.uid)
        console.log("in handle sign out")
        // try {
        //     await db.collection('users').doc(auth.currentUser.uid).update({stocks: userData})
            
        // } catch (error) {

        //     console.log(error)
            
        // } finally {
        //     console.log("IN AUTH SINGOUT")
        //     await auth.signOut();
        // }
        updateDB()
        // props.navigation.popToTop()
        await auth.signOut();


    }
    
        return (
            <View style={
                GlobalStyles.homePageContainer
            }>
                 <View style={libraryStyles.graphicContainer}>
                        <Graphic
                        scale = {1.4}
                        />                    
                </View>

                <View style={libraryStyles.headerContainer}>


                    <Text 
                    style = {
                        {
                            color:'white', 
                            fontWeight: 'bold'
                        }
                    }>
                        Library
                    </Text>

                    {/**
                     * Settings icon
                     */}
                    <TouchableOpacity
                    onPress = {()=> {

                        setVisible(true)                        
                    }}
                    >
                        <Ionicons 
                        name="ios-settings-outline" 
                        size={normalize.setNormalize(24)} 
                        color="white" 
                        />

                    </TouchableOpacity>
                </View>

                {/**
                 * Sign out modal
                 * 
                 * Maybe make this a component?
                 */}
                <Modal
                visible = {isVisible}
                presentationStyle = "overFullScreen"
                transparent = {true}
                animationType = "slide"
                >
                    <View style={libraryStyles.modalScreenContainer}>
                        <View style={libraryStyles.modalContainer}>
                            <View style={libraryStyles.modalXButtonContainer}>
                                <TouchableOpacity style={libraryStyles.modalXButton}
                                onPress= {()=> {
                                    setVisible(false)
                                }}
                                >
                                    <AntDesign 
                                    name="close" 
                                    size={normalize.setNormalize(24)} 
                                    color="white" 
                                    />

                                </TouchableOpacity>
                            </View>

                            <View style={{paddingBottom: normalize.setNormalize(40)}}>
                                <TouchableOpacity style={libraryStyles.modalTextContainer}
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

                <View style={libraryStyles.todaysGainContainer}>
                    <View style={libraryStyles.todaysGainBackground}>
                        <Text style={{color: 'white', fontSize: normalize.setNormalize(14)}}>Today's Gain:</Text>
                        <Text style={{fontSize: normalize.setNormalize(14), color: color, fontWeight: '700'}}>{" " + toadysGain }</Text>
                    </View>

                </View>

                <View style={libraryStyles.allGainersLosersBackground}>

                    <View style={libraryStyles.allGainersLosersContainer}>

                        {allGainersLosers(0, "All")}
                        {allGainersLosers(1, "Gainers")}
                        {allGainersLosers(2, "Losers")}

                    </View>

                    
                </View>

                {stockContainers()}
            

            </ScrollView>


        </View>
    )
}

export default Library;

const libraryStyles = StyleSheet.create({
    removeContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingHorizontal: normalize.setNormalize(10), 
        paddingBottom: normalize.setNormalize(20)
    }, 
    graphicContainer: {
        position: 'absolute', 
        top: normalize.setNormalize(90), 
        width: '100%', 
        height: normalize.setNormalize(800), 
        opacity: 0.06, 
        zIndex: 0
    },

    headerContainer: {
        width: '100%', 
        justifyContent: 'space-between', 
        flexDirection: 'row'
    },

    modalScreenContainer: {
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    modalContainer: {
        height: normalize.setNormalize(200), 
        width: normalize.setNormalize(200), 
        backgroundColor: 'gray', 
        borderRadius: 50, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    modalXButtonContainer: {
        width: '100%', 
        paddingLeft: normalize.setNormalize(20), 
        paddingTop: normalize.setNormalize(20)
    },

    modalXButton: {
        backgroundColor: '#6AB664', 
        borderRadius: 50, 
        width: normalize.setNormalize(50), 
        height: normalize.setNormalize(50), 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    modalTextContainer: {
        backgroundColor: '#6AB664', 
        padding: normalize.setNormalize(20), 
        borderRadius: 50
    },

    todaysGainContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        paddingBottom: normalize.setNormalize(15),
        paddingTop: normalize.setNormalize(10), 
    },

    todaysGainBackground: {
        flex:1, 
        flexDirection: 'row', 
        backgroundColor:'gray',  
        justifyContent:'center', 
        alignItems:'center',
        borderRadius: normalize.setNormalize(10), 
        height: normalize.setNormalize(32), 
        paddingHorizontal: normalize.setNormalize(5)
    },

    allGainersLosersBackground: { 
        height: normalize.setNormalize(60), 
        paddingTop: normalize.setNormalize(10), 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        justifyContent: 'space-between'
    },

    allGainersLosersContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%'
    },

    allGainersLosersText: {
        color: 'white', 
        fontSize: normalize.setNormalize(20), 
        paddingRight: normalize.setNormalize(15), 
       
    },

    linePadding: {
        paddingTop: normalize.setNormalize(15), 
        width: '100%'
    },

    line: {
       backgroundColor: 'white', 
       width: '100%', 
       opacity: 0.5
    }
    
})