//React imports
import React, { useEffect, useState, useRef } from "react";
import {View, Text, TouchableOpacity, FlatList, ScrollView, Alert, Modal, AsyncStorage, ActivityIndicator, Dimensions} from 'react-native';

//Firebase imports
import { auth, db } from "../utils/firebase-config";

//Components
import StockContainer from "../globalComponents/stockContainer";
import Graphic from "../globalComponents/graphic";

//Styles
import GlobalStyles from "../utils/globalStyles";

import { Cache } from 'react-native-cache'

//Normalize function
import normalize from "../utils/normalize";

//Icons
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import {Swipeable} from 'react-native-gesture-handler'
import config from "../config";

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value+1)
}

const cache = new Cache({
    namespace: "UserStocks",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
})

function Library(props) {

    const forceUpdate = useForceUpdate();

    //Stocks the user has
    const [stocks, updateStocks] = useState([]);

    //All of the users stocks (used for gainers/losers)
    const [allStocks, updateAllStocks] = useState([]);

    //All/Gainers/Losers buttons
    const [fontWeight, setFontWeight] = useState(['700', '400', '400'])
    const [lineHeight, setLineHeight] = useState([1, 0.2, 0.2])

    //Whether modal should be shown
    const [isVisible, setVisible] = useState(false)


    const [toadysGain, setTodaysGain] = useState(0)

    const [removeIndex, setRemoveIndex] = useState(0)

    const [userData, setUserData] = useState([])

    const [finalData, setFinalData] = useState([])

    const swipeableRef = useRef(null);
    const swipeableFirstRef = useRef(null);

    const [gainers, setGainers] = useState([])
    const [losers, setLosers] = useState([])

    const componentMounted = useRef(true);

    const [loading, setLoading] = useState(true)

    const [opacity, setOpacity] = useState(0)

    const {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
    } = Dimensions.get('window')

   
    const allGainersLosers = (data, renderRightActions, renderLeftActions) => {
        <Swipeable      
        renderRightActions = {renderRightActions}
        renderLeftActions = {renderLeftActions}
        ref = {swipeableRef}
        containerStyle = {{flex:1}}
        overshootFriction = {7}
        rightThreshold = {10}
        >
            <View
            style={{paddingHorizontal: normalize.setNormalize(30)}}>
                 
                <FlatList
                data = {data}
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
                    />
                </Swipeable>
                
            )}

            keyExtractor = {(item, index) => index.toString()}
            />
        </View>

        </Swipeable>
    }

    const stockContainers = () => {
        if(loading) {
            return <ActivityIndicator
            color = 'red'
            size = {200}
            
            />
        } else {
            return(

                // <Swipeable
                
                // renderRightActions = {gainersLosersRightAction}
                // ref = {swipeableRef}
                // containerStyle = {{flex:1}}
                // overshootFriction = {7}
                // rightThreshold = {10}
                // >
                // <View
                    //  style={{paddingHorizontal: normalize.setNormalize(30)}}>
                    
                    <FlatList
                data = {finalData}
                renderItem = {({item, index}) => (

                <Swipeable
                ref = {swipeableRef}
                renderRightActions = {rightActions}
                
                
                onSwipeableRightOpen = {()=>{
                    setRemoveIndex(index)
                }}
                // key = {index}
                >

                    <StockContainer
                    ticker = {item.ticker}
                    sName = {item.sName}
                    percentChange = {item.percentChange}
                    />
                </Swipeable>
                
            )}

            keyExtractor = {(item, index) => index.toString()}
            />
            /* </View>

            </Swipeable> */

                
               
            )
        }
    }

    const gainersLosersRightAction = () => {

        console.log(gainers)

        return (

            <View style={{opacity: opacity}}>
                <FlatList
            data = {gainers}
            renderItem = {({item, index}) => (

            <Swipeable
            ref = {swipeableRef}
            renderRightActions = {rightActions}
            onSwipeableRightOpen = {()=>{
                setRemoveIndex(index)
            }}
            // key = {index}
            >

                <StockContainer
                ticker = {item.ticker}
                sName = {item.sName}
                percentChange = {item.percentChange}
                />
            </Swipeable>
            
        )}

        keyExtractor = {(item, index) => index.toString()}
        />

            </View>
            
        )
        
    }

    const rightActions = () => {
        return (
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: normalize.setNormalize(10), paddingBottom: normalize.setNormalize(20)}}
            onPress = {() => {
                remove(removeIndex)
                // closeSwipeable()
            }}
            >
                
                {/* <Text style={{color: 'red'}}>
                    Remove
                </Text> */}
                <FontAwesome name="remove" size={24} color="red" />
            </TouchableOpacity>
        )
    }

    const remove = async (removeIndex) => {

        // console.log("in remove")

        finalData.splice(removeIndex, 1)

        // let tempStocks = stocks

        // await db.collection('users').doc(auth.currentUser.uid).update({stocks: tempStocks})
        // .then(
        //     function(data) {
        //         // console.log(data)
        //     }
        // )

        // updateAllStocks(tempStocks)
        // updateStocks([])
        // updateStocks(tempStocks)

        // // console.log(stocks)
        forceUpdate()
        closeSwipeable()
    }

    const closeSwipeable = () => {
        swipeableRef.current.close()
    }

    const getTodaysGain = (stockData) => {
        let gain = 0
        // console.log(stocks.length)
        for(let i = 0; i < stockData.length; i++) {
            gain += stockData[i].percentChange
        }

        // console.log("GAIN " + gain)

        setTodaysGain(Math.round((gain/stockData.length)*100)/100)
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
                    // console.log(allStocks[i])

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

    //  const add = async () => {

    //     try {

    //         // console.log("IN ADD")
    //     const data = await db.collection('users').doc(auth.currentUser.uid).get()
        
    //     let tempStock = data.data().stocks  

    //     for(let i = 0; i < tempStock.length; i++) {
    //         if(tempStock[i].ticker == props.route.params.stock.ticker) {
    //             Alert.alert("This stock is already in your library")
    //             throw "O no"
    //         }
    //     }
            
    //     // console.log("WHIT")
    //     tempStock.push(props.route.params.stock)
                        
    //     db.collection('users').doc(auth.currentUser.uid).update({stocks: tempStock})
       
    //     tempStock.sort(function(a,b) {
    //         return a.sName.localeCompare(b.sName)
    //     })
    //     updateStocks(tempStock)
    //     updateAllStocks(tempStock)
    //     // getTodaysGain(tempStock)
            

    //     } catch {
    //         // console.log("HI")
    //         const data = await db.collection('users').doc(auth.currentUser.uid).get()

    //         updateStocks(data.data().stocks)
    //         // console.log(data.data().stocks)
    //         // getTodaysGain(data.data().stocks)

    //         // console.log("IN CATCH")
    //     }
    
    // }

    // const hello = async (stock) => {

    //     let bro = await db.collection('score').doc(stock).get()
        
    //     setUserData(arr => [...arr, bro.data().score])
        
    // }



    const getPercentChange = async () => {


        let tempData = userData

        let listStocks = ""

        tempData.forEach((stock) => {
            listStocks = listStocks + stock.ticker + ","
            console.log(listStocks)
        })

        console.log("list stocks " + userData)

        if(listStocks != "") {
            try {

                console.log("IN GET PERCENT GAIN")

                await fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=' + listStocks +'&apiKey=' + config.POLYGON_API_KEY)
                .then(
                    function(response) {
                        return response.json()
                    }
                )
                .then(
                    function(data) {
    
                        console.log(data.tickers)
                                   
                        for(let stock in tempData) {
                           for(let stockApi in data.tickers) {
                               if(data.tickers[stockApi].ticker == tempData[stock].ticker) {
                                   tempData[stock].percentChange = data.tickers[stockApi].todaysChangePerc
                               }
                           }
                        }
    
                        if(componentMounted.current) {
    
                            setFinalData(tempData)
                            // getTodaysGain(tempData)
                            addStock()
    
                        }
           
                        
                        // setGainersLoser(tempData)
                    }
                )
    
                
            } catch (error) {
                
            }

        }
        
        
        

    }

    const setGainersLoser = () => {
        let tempGainers = []
        let tempLosers = []
        let data = finalData
        for(let stock in data) {
            if(data[stock].percentChange >= 0) {

                tempGainers.push(data[stock])

            } else {
                tempLosers.push(data[stock])

            }
        }
        setLosers(tempLosers)
        setGainers(tempGainers)
    
    }

    

    const updateUserData = (data) => {
        let listStocks = ""

        if(componentMounted.current) {
            console.log("In updateUser")
            setUserData(data)
            console.log(userData)


            // data.forEach((stock) => {
            //     listStocks = listStocks + stock.ticker + ","
            // })
    
            // console.log(listStocks)
    
            // getPercentChange(listStocks)


        }
    }

    const getListStocks = (data) => {
    }

    useEffect(() => {

        getPercentChange()

    }, [userData])


    const getStocks = async () => {
        try {

            // console.log(auth.currentUser.uid)
            console.log("LOADING " + loading)
            let listStocks = ""

            await db
            .collection('users')
            .doc(auth.currentUser.uid)
            .get()
            .then(
                function(response) {
                    updateUserData(response.data().stocks)
                }
            )
            
            
            // .then(
            //     getListStocks(uh.data().stocks)
            // )

            // updateUserData(uh.data().stocks)


            // uh.data().stocks

            
            
            // .then(
            //     querySnapshot => {
            //         querySnapshot.data().stocks.forEach((stock) => {
            //             listStocks = listStocks + stock.ticker + ","

            //         })
            //         // setUserData(querySnapshot.data().stocks)
                   
            //         getPercentChange(listStocks)
            //         console.log("User data in get stocks ")
            //         console.log(userData)

            //     }
            // )
            // .then(
            //     // console.log("getPercentChange")
            //     // getPercentChange(listStocks)

            // )
         
            // .sort(function(a,b) {
            //     return a.sName.localeCompare(b.sName)

            // })
            
        } catch (error) {
            console.log(error)
        } 


        // } finally {

        //     console.log("finally loading " + loading)

        //     // setLoading(false)
        // }
    }

    useEffect(() => {

        setGainersLoser()

    }, [finalData])

    const addStock = () => {

        // console.log("user data in add stock ")
        // console.log(userData)
        
        if(props.route.params != undefined) {

            console.log("IN ADD")

            let shouldAdd = true

            userData.forEach((stock) => {
                if(stock.ticker == props.route.params.stock.ticker) {
                    shouldAdd = false
                }
            })

            if(shouldAdd) {
                setFinalData(oldUserData => [...oldUserData, {
                    percentChange: props.route.params.stock.percentChange,
                    sName: props.route.params.stock.sName,
                    ticker: props.route.params.stock.ticker,
                    score: props.route.params.stock.score
                }].sort(function(a,b) {return a.sName.localeCompare(b.sName)}))
            }
            
        }
    }

    useEffect(()=> {
        addStock()

        // return () => {
        //     setUserData([])
        // }
    }, [props])

    useEffect(()=> {
        // console.log("In library useEffect")
        // updateCache()

        setLoading(true)
        
        getStocks()
        setLoading(false)

        return () => {
            
            componentMounted.current = false

            updateDatabase()


        }

        

        // return async () => {

            
        //     cleanUp()
            
        // }



    }, [])

    const updateDatabase = async() => {

        try {

            await db.collection('users').doc(auth.currentUser.uid).update({stocks: userData})

            
        } catch (error) {
            
        }

    }

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
        await auth.signOut();

    }
    
        return (
            <View style={{
                flex: 1,
        backgroundColor: 'black',
       
        marginTop: normalize.setNormalize(60),
            }}>
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
                        <Text style={{fontSize: normalize.setNormalize(16), color: '#6AB664', fontWeight: '700'}}>{" " + toadysGain }</Text>


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


                {stockContainers()}
            


            

            </ScrollView>


            </View>
        )
    // }
}

export default Library;