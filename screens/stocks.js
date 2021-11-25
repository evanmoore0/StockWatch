import React from 'react';
import {FlatList, Text, TextInput, View, ScrollView, LogBox} from 'react-native';
import NavBar from '../globalComponents/navBar';
import { Ionicons } from '@expo/vector-icons';
import normalize from '../utils/normalize';
import { FontAwesome } from '@expo/vector-icons';
import StockContainer from '../globalComponents/stockContainer';
import { SafeAreaView } from 'react-native-safe-area-context';
import getStockProfileData from '../utils/API/stockProfile';
import GlobalStyles from '../utils/globalStyles';
import Graphic from '../globalComponents/graphic';

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
        key:'9'

    },
    {
        stock: "Apple",
        ticker: "APPL",
        percentChange: "+ 7.23%",
        key:'10'

    },
    {
        stock: "Apple",
        ticker: "APPL",
        percentChange: "+ 7.23%",
        key:'11'

    },
    {
        stock: "Apple",
        ticker: "APPL",
        percentChange: "+ 7.23%",
        key:'12'

    },
];

const stockTickers = ['TSLA', 'APPL', 'DIS', 'JPM', 'AAL', 'MSFT', 'LCID', 'AMC', 'ZOM']

class Stocks extends React.Component {


    //Constructor to store states
    constructor(props) {
        super(props);

        this.state = {
            stockSymbol: ''
        }
    }

    componentDidMount() {
        console.log("In stocks mount")
        LogBox.ignoreAllLogs()
    }

    componentWillUnmount() {
        console.log("In stocks unmount")
    }
    
    render() {
        return (
            <View style={GlobalStyles.homePageContainer}>

                <View style={{position: 'absolute', top: normalize.setNormalize(100), width: '100%', height: normalize.setNormalize(800), opacity: 0.2, backgroundColor:'black'}}>
                        <Graphic
                        scale = {1.4}
                        />                    
                </View>

                <ScrollView
                stickyHeaderIndices = {[1]}
                >
                {/* <View style={{flexDirection: 'row', width: '100%', height: normalize.setNormalize(50), justifyContent: 'space-between'}}>
                    <Text style={{fontSize: normalize.setNormalize(24), color: 'rgb(199,199,199)'}}>Stocks</Text>
                    <Ionicons name="settings-sharp" size={24} color="white" />
                </View> */}
                <View></View>
                

                <View style={{
                    height: normalize.setNormalize(42),
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                }}>

                    
                    

                    <TextInput
                    style = {{backgroundColor: 'gray', height: normalize.setNormalize(32), width: normalize.setNormalize(335), borderRadius: normalize.setNormalize(50), paddingLeft: normalize.setNormalize(20), fontSize: normalize.setNormalize(18), color: 'white'}}
                    placeholderTextColor= 'white'
                    selectionColor = 'white'
                    

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

                <View style={{ height: normalize.setNormalize(60), paddingTop: normalize.setNormalize(10), backgroundColor: 'rgba(0, 0, 0, 0.8)', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: normalize.setNormalize(20)}}>Trending</Text>

                    <View style={{paddingTop: normalize.setNormalize(15), width: '100%'}}>
                        <View style={{height: 0.2, backgroundColor: 'white', width: '100%', opacity: 0.5}}></View>

                    </View>
                </View>

                
                
               <FlatList
               data = {stockData}
               renderItem={({item})=>(
                   <StockContainer
                   stock = {item.stock}
                   ticker = {item.ticker}
                   percentChange={item.percentChange}
                   />
               )}
               />

                </ScrollView>
            </View>
        )
    }

}

export default Stocks;
