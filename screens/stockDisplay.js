import React, { Component } from "react";
import {View, Text} from 'react-native';
import NavBar from "../globalComponents/navBar";
import normalize from "../utils/normalize";


class StockDisplay extends Component {

    //Constructor to store states
    constructor(props) {
        super(props);

        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            description: ''
        }
    }
    
    //Gets data from api
    fetchStock() {
        //Allows me to access states
        const pointerToThis = this;
        console.log(pointerToThis.props.route.params.ticker)
        //API key
        const API_KEY = '';
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
                        description: data['Description']
                    })
                   
                }
            )
    }

    //Once the component is loaded in, fetch the stock data
    componentDidMount() {
        this.fetchStock();
    }


  render () {

    return (
        <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            
            <Text style={{height: normalize.setNormalize(60), fontSize: normalize.setNormalize(40)}}>{this.props.route.params.stock + " (" + this.props.route.params.ticker + ")"}</Text>
            
        
        </View>
    )

  }
    
    
}



export default StockDisplay;
