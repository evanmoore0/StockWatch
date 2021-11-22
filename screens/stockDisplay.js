import React, { Component } from "react";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import NavBar from "../globalComponents/navBar";
import normalize from "../utils/normalize";
import GlobalStyles from "../utils/globalStyles";
import { Ionicons } from '@expo/vector-icons';
import {auth, db} from '../utils/firebase-config'
import Library from "./library";
import {StackActions} from '@react-navigation/native'

class StockDisplay extends Component {

    //Constructor to store states
    constructor(props) {
        super(props);

        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            description: '',
            name: '',
            stocks: []
        }
    }

    
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
        console.log("IN Mount")
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
                        <Ionicons name="chevron-back-outline" size={normalize.setNormalize(40)} color="white" />
                    </TouchableOpacity>

                    <Text style={{fontSize: 20, color: 'white'}}>{this.state.name}</Text>

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
                        this.props.navigation.replace('TabStack', {
                            screen: 'Library',
                            params: {
                                stock: {
                                    ticker: this.props.route.params.ticker
                                }
                            }
                        })
                    }}
                    >
                        <Ionicons name="add" size={normalize.setNormalize(40)} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={{width: '100%', height: normalize.setNormalize(300), backgroundColor: 'red'}}>

                </View>

                <View style={{width: '100%', height: normalize.setNormalize(50), backgroundColor: 'green', paddingBottom: normalize.setNormalize(90)}}>

                </View>

                <View style={{width: '100%', backgroundColor: '#3B3939', borderRadius: normalize.setNormalize(10), height: 200, padding: 10}}>
                    <Text style={{color: 'white'}}>
                        {this.state.description}
                    </Text>

                </View>

                <View style={{flexDirection: 'row'}}>
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


                </View>

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
        borderBottomColor: 'red',
        borderBottomWidth: 10
        // borderWidth: 1,
        // borderColor: 'white',

    }

})


export default StockDisplay;

