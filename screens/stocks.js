import React from 'react';
import {FlatList, Text, TextInput, View, ScrollView} from 'react-native';
import NavBar from '../globalComponents/navBar';
import { Ionicons } from '@expo/vector-icons';
import normalize from '../utils/normalize';
import { FontAwesome } from '@expo/vector-icons';
import StockContainer from '../globalComponents/stockContainer';

const stockData = [
    {
        stock: "Apple",
        ticker: "APPL",
        percentChange: "+ 7.23%",
        key:'1'
    },
    {
        stock: "American Airlines",
        ticker: "AAL",
        percentChange: "- 1.23%",
        key:'2'

    },
    {
        stock: "Microsoft",
        ticker: "MSFT",
        percentChange: "+ 2.23%",
        key:'3'

    },
    {
        stock: "J.P. Morgan",
        ticker: "JPM",
        percentChange: "- 3.13%",
        key:'4'

    },
    {
        stock: "Testla",
        ticker: "TSLA",
        percentChange: "+ 10.23%",
        key:'5'

    },
    {
        stock: "Lucid Motors",
        ticker: "LCID",
        percentChange: "+ 0.23%",
        key: '6'
    },
    {
        stock: "Apple",
        ticker: "APPL",
        percentChange: "+ 7.23%",
        key:'7'

    },
    {
        stock: "Apple",
        ticker: "APPL",
        percentChange: "+ 7.23%",
        key:'8'

    },
];

class Stocks extends React.Component {


    //Constructor to store states
    constructor(props) {
        super(props);

        this.state = {
            stockSymbol: ''
        }
    }
    
    render() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                paddingTop: normalize.setNormalize(60),
                paddingHorizontal: normalize.setNormalize(22),
                backgroundColor: 'black',
            }}>

                

                <View style={{flexDirection: 'row', width: '100%', height: normalize.setNormalize(50), justifyContent: 'space-between'}}>
                    <Text style={{fontSize: normalize.setNormalize(24), color: 'white'}}>Stocks</Text>
                    <Ionicons name="settings-sharp" size={24} color="white" />
                </View>
                <View style={{
                    height: normalize.setNormalize(60)
                
                }}>
                    

                    <TextInput
                    style = {{backgroundColor: 'gray', height: normalize.setNormalize(32), width: normalize.setNormalize(335), borderRadius: normalize.setNormalize(50), paddingLeft: normalize.setNormalize(20), fontSize: normalize.setNormalize(18)}}
                    placeholderTextColor= 'white'

                    placeholder = "Search"
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
                    }}

                    keyboardType = 'default'
                    />
                </View>

                <Text style={{color: 'white', fontSize: normalize.setNormalize(37), height: normalize.setNormalize(70)}}>Trending</Text>
            
               <FlatList
               data = {stockData}
               style={{}}
               renderItem={({item})=>(
                   <StockContainer
                   stock = {item.stock}
                   ticker = {item.ticker}
                   percentChange={item.percentChange}
                   />
               )}
               />

            
                
                <View style={{
                    width: '100%',
                    backgroundColor: 'red'
                }}>

                  <NavBar/>

                </View>
            </View>
        )
    }

}

export default Stocks;
