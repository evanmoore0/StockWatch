import React, { Component } from "react";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import NavBar from "../globalComponents/navBar";
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import { Ionicons } from '@expo/vector-icons';
import {auth, db} from '../utils/firebase-config'
import Library from "./library";
import {StackActions} from '@react-navigation/native'
import Graphic from "../globalComponents/graphic";

class StockDisplay extends Component {

    //Constructor to store states
    constructor(props) {
        super(props);

        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            description: '',
            name: '',
            stocks: [],
            color: ['#6AB664', 'black', 'black', 'black', 'black'],
            textColor: ['white', '#6AB664', '#6AB664', '#6AB664', '#6AB664']
        }
    }

    setColor(i) {

        let tempColor = ['black', 'black', 'black', 'black', 'black']
        let tempTextColor = ['#6AB664', '#6AB664', '#6AB664', '#6AB664', '#6AB664']

        tempColor[i] = '#6AB664'
        tempTextColor[i] = 'white'


        this.setState({color: tempColor, textColor: tempTextColor})

    }

    // setData() {
    //     const add = async () => {

    //         const data = await db.collection('users').doc(auth.currentUser.uid).get()
    //         // this.setState({stocks: data.data().stocks})
    
    //         let tempStock = data.data().stocks    
        
    //         tempStock.push(this.props.route.params.ticker)
        
    //         // console.log("AFTER PUSH " + this.state.stocks)
        
    //         db.collection('users').doc(auth.currentUser.uid).update({stocks: tempStock})

    //         // console.log("In setData" + db.collection('users').doc(auth.currentUser.uid).get().data().stocks)
    //         const dataTwo = await db.collection('users').doc(auth.currentUser.uid).get()

    //         console.log("In setData" + dataTwo.data().stocks)




    //         // this.setState({stocks: tempStock})
    
    //     }
    //     return add()
    // }

    
    //Gets data from api
    fetchStock() {
        //Allows me to access states
        const pointerToThis = this;
        //API key
        const API_KEY = 'M8S9O6GLYM4ZUPIE';
        let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + pointerToThis.props.route.params.ticker + '&outputsize=compact&apikey=' + API_KEY;
        //Temp variables to store data recieved from api
        //Stock price and date
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        fetch(API_Call)
            .then(
                //Get data in JSON form 
                function(response) {
                    return response.json();
                }
            )
            .then(
                //Get in data variable
                function(data) {

                    //Store stock price and date 
                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }

                    //Update the state
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,

                    })
                }
            )

        
        //Another API call for description data, will also use this call
        //for sector, dividend per share, short ratio, quarterly earnings
        //growth YOY, and dividend date
        let API_Overview_Call = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + pointerToThis.props.route.params.ticker + '&apikey=' + API_KEY

        fetch(API_Overview_Call)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    pointerToThis.setState({
                        name: data["Name"],
                        description: data["Description"]
                    })
                   
                }
            )
    }

    //Once the component is loaded in, fetch the stock data
    componentDidMount() {
        this.fetchStock();
        // this.setData();
        // console.log("In StockDisplay Mount " + this.props.route.params.ticker)
    }

    componentWillUnmount() {
        // console.log("In StockDisplay Unmount")
        // this.setData()
    }


  render () {

    return (

        <View style={{justifyContent: 'center', flex: 1, marginTop: normalize.setNormalize(40), marginHorizontal: normalize.setNormalize(30)}}>
            <ScrollView
            >

                <View style={{width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingBottom: normalize.setNormalize(10), flexDirection: 'row'}}>

                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.goBack()
                    }}
                    >
                        <Ionicons name="chevron-back-outline" size={normalize.setNormalize(30)} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress = {()=> {
                        // this.handleAdd()
                        // this.props.navigation.push('Library', {
                            
                        //     stock: {
                        //         ticker: this.props.route.params.ticker,
                        //         name: this.state.name
                        //     }
                        // })
                        // this.props.navigation.dispatch(
                        //     StackActions.replace('Library', {
                        //         stock: {
                        //             ticker: this.props.route.params.ticker
                        //         }
                        //     })
                        // )

                        // this.setData()

                        

                        this.props.navigation.navigate('TabStack', {
                            screen: 'Library',
                            params: {
                                stock: {
                                    ticker: this.props.route.params.ticker
                                }
                            }
                        })
                    }}
                    >
                        <Ionicons name="add" size={normalize.setNormalize(30)} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={{width:'100%', alignItems: 'center'}}>

                    <Text style={{fontSize: 20, color: 'white'}}>{this.state.name}</Text>

                </View>



                <View style={{width: '100%', height: normalize.setNormalize(300)}}>
                    <Graphic
                    scale={0.6}
                    />

                </View>

                <View style={{width: '100%', height: normalize.setNormalize(50), paddingBottom: normalize.setNormalize(80), paddingTop: normalize.setNormalize(20),flexDirection:'row', justifyContent: 'space-between'}}>

                    <TouchableOpacity
                    onPress= {()=>{
                        this.setColor(0)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: this.state.color[0]}]}
                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: this.state.textColor[0]}]}>1D</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     onPress= {()=>{
                        this.setColor(1)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: this.state.color[1]}]}
                    
                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: this.state.textColor[1]}]}>1W</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     onPress= {()=>{
                        this.setColor(2)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: this.state.color[2]}]}
                    
                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: this.state.textColor[2]}]}>1M</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     onPress= {()=>{
                        this.setColor(3)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: this.state.color[3]}]}

                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: this.state.textColor[3]}]}>1Y</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     onPress= {()=>{
                        this.setColor(4)
                    }}
                    style={[stockDisplayStyles.buttonContainer, {backgroundColor: this.state.color[4]}]}

                    >
                        <Text style={[stockDisplayStyles.buttonText, {color: this.state.textColor[4]}]}>All</Text>
                    </TouchableOpacity>



                </View>

                <View style={{width: '100%', backgroundColor: '#3B3939', borderRadius: normalize.setNormalize(10), flex:1, paddingVertical: normalize.setNormalize(20), paddingHorizontal:normalize.setNormalize(10)}}>
                    <Text style={{color: 'white'}}>
                        {this.state.description}
                    </Text>

                </View>

                {/* <View style={{flexDirection: 'row', width:'100%'}}>
                    <View style={{width: '50%'}}>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>


                    </View>
                    <View style={{width: '50%'}}>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>
                        <Text style={stockDisplayStyles.tableText}>Hello</Text>




                    </View>


                </View> */}

            </ScrollView>

        </View>
            
            
    )

  }
    
    
}

const stockDisplayStyles = StyleSheet.create({

    tableText: {
        fontSize: normalize.setNormalize(12),
        color: 'white',
        paddingVertical: normalize.setNormalize(10),
        borderWidth: 1,
        borderColor: 'white',
        borderLeftColor: 'green'

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
    }

})


export default StockDisplay;

