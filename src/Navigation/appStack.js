/**
 * Navigation stack -> controls what screens are being shown
 *
 * TabStack: stack with stocks and library page
 *
 * Flow:
 * (not signed in)
 *  Loading -> Welcome -> Login/Register -> TabStack -> StockDisplay -> TabStack
 * (signed in)
 *  Loading -> Welcome -> Login/Register -> TabStack -> StockDisplay -> TabStack
 */

//React imports
import React from "react";

//React navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

//Screen imports
import Loading from "../Screens/loading";
import Welcome from "../Screens/welcome";
import Login from "../Screens/login";
import Register from "../Screens/register";
import Stocks from "../Screens/stocks";
import Library from "../Screens/library";
import StockDisplay from "../Screens/stockDisplay";
import Insiders from "../Screens/insiders";

import Email from "../Screens/Register/email";
import Name from "../Screens/Register/name";

import KYC from "../Screens/KYC/KYC";
import ACH from "../Screens/KYC/ACH";
import Transfer from "../Screens/KYC/transfer";


import normalize from "../utils/Style/normalize";

//Icons being displayed on tab bar
import { Entypo } from "@expo/vector-icons";

import { StockDataProvider } from "../utils/hooks/checkStockData";

//Create navigation stack and tab stack
const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Stock"
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          marginBottom: normalize.setNormalize(20),
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Stock") {
            iconName = focused ? "line-graph" : "line-graph";
          } else if (route.name === "Library") {
            iconName = focused ? "archive" : "archive";
          } else if (route.name === "Insiders") {
            
          }

          return (
            <Entypo
              name={iconName}
              size={normalize.setNormalize(24)}
              color={color}
              style={{
                width: normalize.setNormalize(34),
                height: normalize.setNormalize(34),
              }}
            />
          );
        },

        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "black",
        tabBarInactiveBackgroundColor: "black",
      })}
    >
      <Tab.Screen name="Stock" component={Stocks} />

      {/* <Tab.Screen name = "Insiders" component = {Insiders}/> */}

      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
}

//Stack for whole app
function AppStack() {
  return (
    <StockDataProvider>
      <SafeAreaProvider>
        <NavigationContainer
          theme={{
            colors: {
              background: "black",
            },
          }}
        >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Register" component={Register} /> */}
            <Stack.Screen name = "Email" component={Email}/>
            <Stack.Screen name = "Name" component={Name}/>
            <Stack.Screen name="TabStack" component={TabStack} />

            <Stack.Screen name="KYC" component={KYC}/>
            <Stack.Screen name = "ACH" component={ACH}/>
            <Stack.Screen name = "Transfer" component={Transfer}/>

            <Stack.Screen name="StockDisplay" component={StockDisplay} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </StockDataProvider>
  );
}

export default AppStack;
