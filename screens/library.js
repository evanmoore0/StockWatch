
//React imports
import React, { useEffect, useState, useRef } from "react";
import {View, Image, Text, TouchableOpacity, FlatList, ScrollView, Alert, Modal, ActivityIndicator, StyleSheet, AppState, LogBox} from 'react-native';

//Firebase imports
import { auth, db } from "../utils/firebase-config";

//Components
import StockContainer from "../globalComponents/stockContainer";
import GraphicUnderlay from "../globalComponents/graphicUnderlay";

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

function Library(props) {
    //Hooks
    //Gets the current state of the app
    //Whether the user is on the app, background, or the app is "inactive"
    const appState = useRef(AppState.currentState);

    //Get the app state
    const [appStateVisible, setAppStateVisible] = useState(appState.current)

    //All/Gainers/Losers buttons
    const [fontWeight, setFontWeight] = useState(['700', '400', '400'])
    const [lineHeight, setLineHeight] = useState([2, 0.2, 0.2])

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

    //Use to check if app is mounted before updating appstate
    const isMounted = useRef(false)

    //Display activity indicator when data is loading in
    const [loading, setLoading] = useState(true)

    //Todays gain color
    const [color, setColor] = useState("white")



    const Header = () => {
        return (
            <View style={libraryStyles.headerContainer}>
                <View>
                <Text 
                style = {
                    {
                        color:'white', 
                        fontWeight: 'bold'
                    }
                }>
                    Library
                </Text>
                    <Text style={{fontWeight: 'bold', color: color, fontSize: normalize.setNormalize(12), paddingTop: normalize.setNormalize(4)}}>
                        {toadysGain}
                    </Text>
                </View>

                
               
                {/**
                 * Settings icon
                 */}
                <TouchableOpacity
                onPress = {() =>     
                    setVisible(true)                        
                }>
                        <Ionicons 
                        name="ios-settings-outline" 
                        size={normalize.setNormalize(20)} 
                        color="white" 
                        />
                </TouchableOpacity>
            </View>
        )

    }


    const SignOutModal = () => {
        return (
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
        )
    }

    const AllGainersLosersTitle = () => {
        return(
            <View style={libraryStyles.allGainersLosersBackground}>

                <View style= {libraryStyles.allGainersLosersContainer}>
                    {allGainersLosers(0, "All")}
                    {allGainersLosers(1, "Gainers")}
                    {allGainersLosers(2, "Losers")}
                </View>

            </View>
        )
    }




    const allGainersLosers = (index, text) => {
        return(
                <TouchableOpacity
                style={{width:'34%', alignItems:'center'}}
                onPress = {()=> {
                    handleClick(index)
                    }
                }>
                        <Text style={[libraryStyles.allGainersLosersText, {fontWeight: fontWeight[index]}]}>{text}</Text>
                    <View style={libraryStyles.linePadding}>
                        <View style={[libraryStyles.line, {height: lineHeight[index]}]}></View>
                    </View>
                </TouchableOpacity>   
        )

    }


    //Show activity indicator when data is loading, display stock containers when done
    const StockContainers = () => {
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
                handleClick(0)
                remove(removeIndex)

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

    //Removes desired stock from the state
    const remove = async (removeIndex) => {
        let temp = allData.splice(removeIndex, 1)
        setAllData(temp)       

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
            setTodaysGain("+" + (Math.round((gain/stockData.length)*100)/100).toString() + "%")
        } else {
            setColor(Constants.THEME_COLOR.blue)
            setTodaysGain((Math.round((gain/stockData.length)*100)/100).toString() + "%")
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

        LogBox.ignoreAllLogs()
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
                    console.log(response.data())
                    updateUserData(response.data().stocks)
                 
                }
            )
            
        } catch (error) {
            console.log(error)
        } 
    }

    //Adds a stock to the state
    const addStock = async () => {

        if(props.route.params != undefined) {

            
            let shouldAdd = true

            allData.forEach((stock) => {
                //Check to see if user already has stock in their database
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
                setAllData(temp)
                handleClick(0)

            } 
        }

    }

    //Updates the user's database and signs them out
    const handleSignOut = async () => {
        updateDB()

        try {

            await auth.signOut();
            
        } catch (error) {

            Alert.alert("We were unable to sign you out, please try again later")
            
        }
    }

    //Updates the users database (Called when screen is unactive, or user signs out)
    const updateDB = async() => {
       
        try {
            await db.collection("users").doc(auth.currentUser.uid).update({stocks:allData})
        } catch (error) {
            Alert.alert("We had trouble saving your stocks to our database please do not close the app")
        }
    }

    //Use effect hooks 
    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState)=> {
            if(isMounted.current) {
    
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
        isMounted.current = true;
        
        getStocks()
        setLoading(false)

        return () => {

            isMounted.current = false
        }

    }, [])

    useEffect(()=> {
        addStock()
    }, [props])
    
    return (

        //Container for whole screen
         <View style = {GlobalStyles.homePageContainer}>

            <GraphicUnderlay top = {90}/>
            
            <SignOutModal/>


            <ScrollView
            stickyHeaderIndices = {[1]}
            style={{zIndex: 1}}
            showsVerticalScrollIndicator = {false}
            >

                <Header/>

                <AllGainersLosersTitle/>

                <StockContainers/>
            

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

   
    allGainersLosersBackground: { 
        paddingTop: normalize.setNormalize(10), 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        width: '100%',
        paddingBottom: normalize.setNormalize(15)
    },

    allGainersLosersContainer: {
        flexDirection: 'row', 
        width: '100%'
    },

    allGainersLosersText: {
        color: 'white', 
        fontSize: normalize.setNormalize(16), 
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