import React, { useEffect } from 'react';
import AppStack from './NavigationStacks/appStack';
import { auth } from './utils/firebase-config';
import {useNavigation} from '@react-navigation/native'


export default function App(props) {

//   const navigation = useNavigation()

//    const checkUserStatus = () => {

//         console.log("IN CHECK USER STATUS")

//         auth.onAuthStateChanged((user) => {
//             if(user) {
//                 navigation.navigate('TabStack')
//             }
//         })

//     }


//     useEffect(()=> {

//         checkUserStatus()
//         console.log("HERE")

        

//     }, [])
  


  return (
    <AppStack/>
  );
}

