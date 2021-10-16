import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'


import Welcome from "../screens/welcome";
import Login from "../screens/login";
import Register from "../screens/register";
import Stocks from "../screens/stocks";
import Library from "../screens/library";
import StockDisplay from "../screens/stockDisplay";


const Stack = createNativeStackNavigator();

function AppStack() {
    return (

        //So pages navigated to don't have a gray background
       <NavigationContainer
       theme = {{
           colors: {
               background: 'white'
           }
       }}
       >
           {/*To remove the header from pages that are navigated to */}
           <Stack.Navigator
           screenOptions={{
               headerShown: false
           }}
           >
               <Stack.Screen name = "Welcome" component = {Welcome}/>
               <Stack.Screen name = "Login" component = {Login}/>
               <Stack.Screen name = "Register" component = {Register}/>
               <Stack.Screen name = "Stocks" component = {Stocks}/>
               <Stack.Screen name = "Library" component = {Library}/>
               <Stack.Screen name = "StockDisplay" component = {StockDisplay}/>
           </Stack.Navigator>
       </NavigationContainer>

    )
}

export default AppStack;