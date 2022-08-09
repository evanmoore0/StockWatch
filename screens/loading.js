import React, { useEffect } from "react";
import { View, Image} from "react-native";
import { auth } from "../utils/firebase-config";
import Graphic from "../globalComponents/graphic";

function Loading(props) {

    //Check to see if user is logged in, if so -> stocks screen if not -> welcome screen
    const checkUserStatus = () => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                props.navigation.replace('TabStack')
            } else {
                props.navigation.replace("Welcome")
            }
        })
     }

    //Call check user when the component mounts
    useEffect(()=> {
        checkUserStatus()
    }, [])

    return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>

            {/* <Image
                    style = {{width: 400, height: 400, borderRadius: 200}}
                    source = {require('./imgs/profilePic.png')}
                    

                    /> */}

                <Graphic
                scale = {1}
                />
            
        </View>
    )
}

export default Loading