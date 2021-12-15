import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { auth } from "../utils/firebase-config";

function Loading(props) {

       const checkUserStatus = () => {

        // console.log("IN CHECK USER STATUS")

        auth.onAuthStateChanged((user) => {
            if(user) {
                props.navigation.replace('TabStack')
            } else {
                props.navigation.replace("Welcome")
            }
        })

    }


    useEffect(()=> {

        checkUserStatus()
        console.log("In loading useEffect")
    }, [])

    return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>

            <Text style={{fontSize: 50, color: 'red'}}>
                Loading
            </Text>
        
            
        </View>
    )
}

export default Loading