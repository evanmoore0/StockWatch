
//React imports
import React, { useEffect, useRef, useState } from "react";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, FlatList, Image} from 'react-native';

//Normailize function
import normalize from "../utils/normalize";

//Icon
import { Ionicons } from '@expo/vector-icons';

//Firebase imports
import {auth, db} from '../utils/firebase-config';

//Components
import Graphic from "../globalComponents/graphic";
import StockContainer from "../globalComponents/stockContainer";


function StockDisplay(props) {

    //Hooks

    //Background color of stock buttons
    const [color, setColor] = useState(['#6AB664', 'black', 'black', 'black', 'black'])

    //Text color of stock buttons
    const [textColor, setTextColor] = useState(['white', '#6AB664', '#6AB664', '#6AB664', '#6AB664'])

    const [render, setRender] = useState(true)

    //Data for the stock from polygon API
    const [description, setDescription] = useState('')
    const [sector, setSector] = useState('')
    const [tags, setTags] = useState([])
    const [url, setUrl] = useState('')
    const [hqState, setHQState] = useState('')
    const [employees, setEmployees] = useState('')
    const [marketCap, setMarketCap] = useState('')
    const [ceo, setCeo] = useState('')
    const [similar, setSimilar] = useState([])
    const [exchange, setExchange] = useState('')
    const [listDate, setListDate] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [newsData, setNewsData] = useState([])

    const isInitialMount = useRef(true);

    //Sets the text color/ background color of a stock button
    const handleColor = (i) => {

        let tempColor = ['black', 'black', 'black', 'black', 'black']
        let tempTextColor = ['#6AB664', '#6AB664', '#6AB664', '#6AB664', '#6AB664']

        tempColor[i] = '#6AB664'
        tempTextColor[i] = 'white'


        setColor(tempColor)
        setTextColor(tempTextColor)
        
    }

    // const stockComponentRender = () => {
    //     if(render) {
    //         console.log("IN STOCK COMPONENT askdlfjsd")
    //         console.log(similar)
    //         setRender(false)
    //         return(
                
    //         )
    //     }
    // }

    // useEffect(() => {
    //    if(isInitialMount.current) {
    //        isInitialMount.current = false;
    //    } else {
    //        if(render) {
    //            stockComponentRender()
    //        }
    //    }
    // });

    //Updates the score of the stock
    const setScore = async () => {

        try {
            //Get the current score
            const score = await db.collection('score').doc(props.route.params.stock.ticker).get()

            let tempScore = score.data().score + 1

            //Update the score
            db.collection('score')
            .doc(props.route.params.stock.ticker)
            .update({score: tempScore})
    
        } catch {
            //If the stock doesn't have a score set it equal to one
            db.collection('score')
            .doc(props.route.params.stock.ticker)
            .set({score: 1, sName: props.route.params.stock.sName})
        }
    }

    //Get the stock data from polygon API for the searched stock
    const getData = async () => {
        // console.log("AT GET DATA")
        try {
            await fetch('https://api.polygon.io/v1/meta/symbols/' + props.route.params.stock.ticker + '/company?apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    //Update the hooks
                    setSimilar(data.similar)
                    setDescription(data.description)
                    setTags(data.tags)
                    setCeo(data.ceo)
                    setHQState(data.hq_state)
                    setMarketCap(data.marketcap)
                    setSector(data.sector)
                    setEmployees(data.employees)
                    setUrl(data.url)
                    setExchange(data.exchangeSymbol)
                    setPhoneNumber(data.phone)
                    setListDate(data.listdate)
                    setRender(false)
                }
            )
        } catch (error) {
            Alert.alert(error)
        }
    }

    //Get news for the searched stock from polygon API
    const getNews = async () => {
        try {

            await fetch('https://api.polygon.io/v2/reference/news?ticker=' + props.route.params.stock.ticker + '&apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {

                    setNewsData(data.results)
                }
            )
            
        } catch (error) {
            Alert.alert(error)
        }
    }

    //Set the score, get data, get news when the component is mounted
    useEffect(() => {
        // console.log("in getData call")
        console.log("in StockDisplay")
        getData()
        getNews()
     
     }, []);



    if(render) {
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'red'}}>
                    Loading...
                </Text>
            </View>
        )
    }
    return (

        //Container for page
        <View 
        style = {
            {
                justifyContent: 'center', 
                flex: 1, 
                marginTop: normalize.setNormalize(40), 
                marginHorizontal: normalize.setNormalize(30)
            }
        }>
            {/*
            Allows page to scroll
            */}
            <ScrollView
            showsVerticalScrollIndicator = {false}
            >

                {/*
                Container for back button and add button
                */}
                <View 
                style = {
                    {
                        width: '100%', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        paddingBottom: normalize.setNormalize(10), 
                        flexDirection: 'row'
                    }
                }>
                    {/* 
                    Back button
                    */}
                    <TouchableOpacity
                    onPress={() => {
                        props.navigation.replace('TabStack')
                    }}
                    >
                        <Ionicons 
                        name="chevron-back-outline" 
                        size={normalize.setNormalize(30)} 
                        color="white" 
                        />

                    </TouchableOpacity>

                    {/* 
                    Add button
                    */}
                    <TouchableOpacity
                    onPress = {() => {
                        //Update the score of the stock when someone adds it to their library
                        setScore()
                        //Navigate to library page and pass it percent change, ticker, stock name
                        props.navigation.navigate('TabStack', {
                            screen: 'Library',
                            params: {
                                stock: {
                                    sName: props.route.params.stock.sName,
                                    ticker: props.route.params.stock.ticker,
                                    // percentChange: props.route.params.stock.percentChange
                                }
                            }
                        })
                    }}
                    >

                        <Ionicons 
                        name="add" 
                        size={normalize.setNormalize(30)} 
                        color="white" 
                        />

                    </TouchableOpacity>

                </View>

                {/* 
                Stock name and ticker
                */}
                <View 
                style = {
                    {
                        width:'100%', 
                        alignItems: 'center'
                    }
                }>

                    <Text 
                    style = {
                        {
                            fontSize: normalize.setNormalize(20), 
                            color: 'white'
                        }
                    }>
                        {props.route.params.stock.sName}
                    </Text>

                    <Text
                    style = {
                        {
                            color: 'gray'
                        }
                    }>
                        {'$' + props.route.params.stock.ticker}
                    </Text>

                </View>

                
                <View style={{width: '100%', height: normalize.setNormalize(300)}}>
                    <Graphic
                    scale={0.6}
                    />

                </View>

                {/* 
                Graph buttons
                */}
                <View 
                style = {
                    {
                        width: '100%', 
                        height: normalize.setNormalize(50), 
                        paddingTop: normalize.setNormalize(20),
                        flexDirection:'row', 
                        justifyContent: 'space-between'
                    }
                }>

                    <TouchableOpacity
                    onPress= {()=>{
                        handleColor(0)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: color[0]}]}
                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: textColor[0]}]}>1D</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     onPress= {()=>{
                        handleColor(1)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: color[1]}]}
                    
                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: textColor[1]}]}>1W</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     onPress= {()=>{
                        handleColor(2)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: color[2]}]}
                    
                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: textColor[2]}]}>1M</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     onPress= {()=>{
                        handleColor(3)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: color[3]}]}

                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: textColor[3]}]}>1Y</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     onPress= {()=>{
                        handleColor(4)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: color[4]}]}

                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: textColor[4]}]}>All</Text>
                    </TouchableOpacity>
            </View>
                
                <View style={{paddingVertical: normalize.setNormalize(30)}}>
                    <View style={{width: '100%', backgroundColor: 'white', height: 0.5, opacity: 0.2}}></View>

                </View>

                <View style={{width: '100%', alignItems: 'center', paddingBottom: normalize.setNormalize(30), flexDirection: 'row', display: 'flex'}}>
                
                <FlatList
                    data = {tags}
                    horizontal         
                    showsHorizontalScrollIndicator = {false}           
                    renderItem={({item})=>(
                    <View style={{paddingHorizontal: 10}}>
                        <View style={{borderRadius: 30, backgroundColor: '#3B3939', paddingHorizontal: normalize.setNormalize(10), paddingVertical: normalize.setNormalize(5), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white'}}>
                            <Text key={item} style={{color: 'white'}}>{item}</Text>
                        </View>
                    </View>
                            
                       
                        
                    )}
                    />
                       
                </View>

                <View style={{paddingBottom: normalize.setNormalize(30)}}>
                    <View style={{width: '100%', backgroundColor: 'white', height: 0.5, opacity: 0.4}}></View>

                </View>

                <Text style={stockDisplayStyles.title}>
                    {'About ' + props.route.params.stock.sName}
                </Text>

                <View style={{width: '100%', backgroundColor: '#3B3939', borderRadius: normalize.setNormalize(10), flex:1, padding:normalize.setNormalize(15)}}>
                    <Text style={{color: 'white'}}>
                        {description}
                    </Text>

                </View>

                <View style={{flexDirection: 'row', width:'100%', paddingTop: normalize.setNormalize(20), paddingLeft: normalize.setNormalize(10), paddingBottom: normalize.setNormalize(20)}}>
                    <View style={{width: '50%'}}>
                        <View style={stockDisplayStyles.descriptionContainer}>
                            <Text style={stockDisplayStyles.tableText}>{"CEO: "}</Text>
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(13)}}>{ceo}</Text>
                        </View>
                        <View style={stockDisplayStyles.descriptionContainer}>
                            <Text style={stockDisplayStyles.tableText}>{"Employees: "}</Text>
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(13)}}>{employees}</Text>
                        </View>
                        <View style={stockDisplayStyles.descriptionContainer}>
                            <Text style={stockDisplayStyles.tableText}>{"Sector: "}</Text>
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(13)}}>{sector}</Text>
                        </View>
                        <View style={stockDisplayStyles.descriptionContainer}>
                            <Text style={stockDisplayStyles.tableText}>{"Phone Number: "}</Text>
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(13)}}>{phoneNumber}</Text>
                        </View>
                    </View>
                    <View style={{width: '50%'}}>
                        <View style={stockDisplayStyles.descriptionContainer}>
                            <Text style={stockDisplayStyles.tableText}>{"Market Cap: "}</Text>
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(13)}}>{marketCap}</Text>
                        </View>
                        <View style={stockDisplayStyles.descriptionContainer}>
                            <Text style={stockDisplayStyles.tableText}>{"Headquarters: "}</Text>
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(13)}}>{hqState}</Text>
                        </View>
                        <View style={stockDisplayStyles.descriptionContainer}>
                            <Text style={stockDisplayStyles.tableText}>{"Exchange: "}</Text>
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(13)}}>{exchange}</Text>
                        </View>
                        <View style={stockDisplayStyles.descriptionContainer}>
                            <Text style={stockDisplayStyles.tableText}>{"List Date: "}</Text>
                            <Text style={{color: 'white', fontSize: normalize.setNormalize(13)}}>{listDate}</Text>
                        </View>
                        {/* <Text style={stockDisplayStyles.tableText}>{"Market Cap: "}<Text style={{color: 'white'}}>{marketCap}</Text></Text>
                        <Text style={stockDisplayStyles.tableText}>{"Headquarters: "}<Text style={{color: 'white'}}>{hqState}</Text></Text>
                        <Text style={stockDisplayStyles.tableText}>{"Exchange: "}<Text style={{color: 'white'}}>{exchange}</Text></Text>
                        <Text style={stockDisplayStyles.tableText}>{"List Date: "}<Text style={{color: 'white'}}>{}</Text></Text> */}

                    </View>


                </View>

                <View style={{paddingVertical: normalize.setNormalize(30)}}>
                    <View style={{width: '100%', backgroundColor: 'white', height: 0.5, opacity: 0.4}}></View>

                </View>

                <Text style={stockDisplayStyles.title}>
                    Similar Stocks
                </Text>

                <FlatList
                    data = {similar}
                    renderItem={({item})=>(

                        

                        <StockContainer
                        ticker = {item}
                        />
                    
                    )}
                />

                {/* <FlatList
                    data = {similar}
                    renderItem={({item})=>(

                        

                        <View>
                            {
                                () => {
                                    console.log("In render flatlist")
                                    if(render) {
                                       
                                        <StockContainer
                                        ticker = {item}
                                        />
                                    }
                                }
                            }
                            
                        </View>
                    
                    )}
                    /> */}
                    {/* {stockComponentRender()} */}

                <View style={{paddingVertical: normalize.setNormalize(30)}}>
                    <View style={{width: '100%', backgroundColor: 'white', height: 0.5, opacity: 0.4}}></View>

                </View>

            <Text style={stockDisplayStyles.title}>
                    News
            </Text>

            <FlatList
            data = {newsData}
            renderItem = {({item}) => (
                <View style={{paddingBottom: normalize.setNormalize(20)}}>
                <View style={{height: normalize.setNormalize(400), paddingHorizontal: normalize.setNormalize(20), justifyContent: 'space-evenly'}}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: normalize.setNormalize(12)}}>

                        {item.publisher.name}


                    </Text>

                    <Text style={{color: 'white'}}>
                        {item.title}
                    </Text>

                    <Image
                    style={{height: normalize.setNormalize(230), borderRadius: 10}}
                    source = {{
                        uri: item.image_url
                    }}
                    />

                    <View style={{backgroundColor: 'white', width: '100%', height: 0.5, top: normalize.setNormalize(20), opacity: 0.3}}></View>
                </View>
                </View>
            )}
            />

            </ScrollView>



        </View>
            
            
    )

  
    
    
}

const stockDisplayStyles = StyleSheet.create({

    tableText: {
        fontSize: normalize.setNormalize(13),
        color: 'gray',
        paddingVertical: normalize.setNormalize(10),

    },

    buttonContainer: {
        height: normalize.setNormalize(30),
        width: normalize.setNormalize(60),
        borderRadius: 50,
        justifyContent:'center',
        alignItems: 'center',
        borderColor: 'white'
    },

    buttonText: {
        color: 'white',
        fontSize: normalize.setNormalize(13)
    },

    title: {

        color: 'white', 
        fontSize: 20, 
        paddingBottom: normalize.setNormalize(20)

    },

    descriptionContainer: {
        paddingBottom: normalize.setNormalize(5)
    }

})


export default StockDisplay;

