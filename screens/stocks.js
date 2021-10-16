import React from 'react';
import {Text, TextInput, View} from 'react-native';
import NavBar from '../globalComponents/navBar';

class Stocks extends React.Component {

    
    


    //Constructor to store states
    constructor(props) {
        super(props);

        this.state = {
            stockSymbol: ''
        }
    }
    

    // // componentDidMount() {
    // //     this.fetchStock();
    // // }

    

    // fetchStock() {
    //     const pointerToThis = this;
    //     // console.log(this.state.stockSymbol)
    //     const API_KEY = 'M8S9O6GLYM4ZUPIE';
    //     // let StockSymbol = arguments[0]
    //     let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + pointerToThis.state.stockSymbol + '&outputsize=compact&apikey=${API_KEY}';
    //     let stockChartXValuesFunction = [];
    //     let stockChartYValuesFunction = [];
    //     fetch(API_Call)
    //         .then(
    //             //Get data in JSON form
    //             function(response) {
    //                 return response.json();
    //             }
    //         )
    //         .then(
    //             //Get in data variable
    //             function(data) {
    //                 // console.log(data);


    //                 for (var key in data['Time Series (Daily)']) {
    //                     stockChartXValuesFunction.push(key);
    //                     stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
    //                 }

    //                 // console.log(stockChartXValuesFunction)
    //                 pointerToThis.setState({
    //                     stockChartXValues: stockChartXValuesFunction,
    //                     stockChartYValues: stockChartYValuesFunction,

    //                 })
    //             }
    //         )
    // }

    render() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}>
                <View style={{
                    flex:1
                
                }}>

                    <TextInput
                    style = {{flex:1}}
                    placeholder = "enter stock name"
                    onChangeText = {val => {
                        this.setState({stockSymbol: val});
                    }}

                    onSubmitEditing = {()=>{
                        //Route to stock page/ send stock ticker/ load stock data ON THAT
                        // PAGE/ Display
                        this.props.navigation.navigate("StockDisplay", {
                            ticker: this.state.stockSymbol,
                            searchId: 96
                        })
                        // this.fetchStock()
                    }}

                    keyboardType = 'default'
                    />

                </View>
               

                
                <View style={{
                    flex: 1,
                    width: '100%'
                }}>

                  <NavBar/>

                </View>
            </View>
        )
    }

}

export default Stocks;
