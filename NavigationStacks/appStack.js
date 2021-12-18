import React from "react";
import {View, Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {BottomTabBar, createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Welcome from "../screens/welcome";
import Login from "../screens/login";
import Register from "../screens/register";
import Stocks from "../screens/stocks";
import Library from "../screens/library";
import StockDisplay from "../screens/stockDisplay";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import Loading from "../screens/loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import normalize from "../utils/normalize";


const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

// const Tab = createMaterialTopTabNavigator();

function TAB() {
    return(
        <View style = {{flex:1}}>
            <Text>

                Hi

            </Text>
        </View>
    )
}

function TabStack() {
    return(
            <Tab.Navigator
        
        initialRouteName = "Stock"

        // style = {{paddingTop: 50}}
        
        
        // tabBarPosition = ""
        tabBarPosition = "bottom"
        // tabBarPosition = "Bottom"
        // TabBarBottom = {true}

        
        
        
        screenOptions={({ route }) =>(
            
            {
                
                tabBarStyle: {paddingBottom: normalize.setNormalize(20)},
                
            
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if(route.name === 'Stock') {
                    iconName = focused
                    ? 'line-graph'
                    : 'line-graph';
                } else if (route.name === "Library") {
                    iconName = focused ? 'archive' : 'archive';
                }

                return <Entypo name={iconName} size={24} color={color} />;
            },

            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: 'black',
            tabBarInactiveBackgroundColor: 'black',
            
            
            
            
            

        }
        
        )}
        
        >
                <Tab.Screen name = "Stock" component = {Stocks}
                
                />
                <Tab.Screen name = "Library" component={Library}/>
        </Tab.Navigator>

        

        // <Tab.Navigator

        // // tabBarPosition = "Bottom"
        // // TabBarShowIcon = {true}

        // // tabBar = {}

        // // TabBarItemStyle = {{alignItems: 'center'}}
        // tabBar = {<TAB/>}
        
        // >

        //     <Tab.Screen name = "Stock" component = {Stocks}/>

        //     <Tab.Screen name = "Library" component = {Library}/>

        // </Tab.Navigator>
        
    )
}


function AppStack() {
    return (

        <SafeAreaProvider>

       <NavigationContainer
       theme = {{
           colors: {
               background: 'black'
           }
       }}
       >
           {/*To remove the header from pages that are navigated to */}
           <Stack.Navigator
           screenOptions={{headerShown: false}}
           >
               <Stack.Screen
               name = "Loading" 
               component = {Loading}
               />
               
               <Stack.Screen name = "Welcome" component = {Welcome}
               
                
               />
               <Stack.Screen name = "Login" component = {Login}
             />
               <Stack.Screen name = "Register" component = {Register}
             
               />

                <Stack.Screen name = "TabStack" component = {TabStack}
                
                />
               {/* <Stack.Screen name = "Stocks" component = {Stocks}/>
               <Stack.Screen name = "Library" component = {Library}/> */}
               <Stack.Screen name = "StockDisplay" component = {StockDisplay}/>
           </Stack.Navigator>

       </NavigationContainer>
       </SafeAreaProvider>


    )
}

export default AppStack;