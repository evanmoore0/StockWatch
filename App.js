import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Stock from './screens/stocks';
import AppStack from './NavigationStacks/appStack';
import StockDisplay from './screens/stockDisplay';
import PageButton from './globalComponents/button';


export default function App() {
  return (
    <AppStack/>
  );
}

