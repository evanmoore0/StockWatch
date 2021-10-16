import React, { Component } from "react";
import {View, Text} from 'react-native';
import NavBar from "../globalComponents/navBar";


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
            <View style={{flex:1, paddingTop: 50}}>
                <Text style={{fontSize: 20}}>
                    Description:
                </Text>
                <Text>
                    {/*Data from api (Description in this case) */}
                    {this.state.description}
                </Text>
                <Text style={{fontSize: 20, paddingTop: 10}}>For Past 100 Days</Text>

                <Text style={{fontSize: 20}}>Stock Price</Text>
                <Text>{this.state.stockChartYValues}</Text>
                <Text style={{fontSize: 20}}>Dates</Text>
                <Text>{this.state.stockChartYValues}</Text>

            </View>

            <View style={{flex:1, width: '100%'}}>
                <NavBar/>
            </View>
            
        
        </View>
    )

  }
    
    
}

export default StockDisplay;