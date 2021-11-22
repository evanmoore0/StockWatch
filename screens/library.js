import React, { Component } from "react";
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import NavBar from "../globalComponents/navBar";
import { auth, db } from "../utils/firebase-config";
import StockContainer from "../globalComponents/stockContainer";
import GlobalStyles from "../utils/globalStyles";


class Library extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            update: false
        }
    }

    handleSignOut() {
        auth.signOut();
        this.props.navigation.popToTop()
        this.props.navigation.replace('Welcome')
    }

    componentWillUnmount() {
        console.log("IN WILL UNMOUNT")
    }

    componentDidMount() {

        this.handleAdd()
    }

    handleAdd() {



       const add = async () => {

        const data = await db.collection('users').doc(auth.currentUser.uid).get()
        this.setState({stocks: data.data().stocks})

        let tempStock = data.data().stocks    
    
        tempStock.push(this.props.route.params.stock.ticker)
    
        console.log("AFTER PUSH " + this.state.stocks)
    
        db.collection('users').doc(auth.currentUser.uid).update({stocks: tempStock})
        this.setState({stocks: tempStock})

       }
       return add()

    }

    render() {
        return (
            <View style={GlobalStyles.homePageContainer}>

            <TouchableOpacity
            style={{width: 100, height: 100, backgroundColor: 'green'}}
            onPress={() => {
                this.handleSignOut()
            }}
            >


            </TouchableOpacity>

            <FlatList
            data = {this.state.stocks}
            renderItem = {({item, index}) => (
                <StockContainer
                ticker = {item}
                stock = "Apple"
                percentChange = "+9%"
                />
            )}

            keyExtractor = {(item, index) => index.toString()}
            />


            </View>
        )
    }
}

export default Library;