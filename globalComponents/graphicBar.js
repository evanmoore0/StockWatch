import React, { useState, useEffect } from "react";
import {Animated, View, } from 'react-native';
import normalize from "../utils/normalize";

//Graphic bar for graphic component
function GraphicBar(props) {

    //Animation values
    const [translation, setTranslation] = useState(50)
    const fade = new Animated.Value(0)

    //Grow animation
    const handleAnimation = () => {
        fade.setValue(0)
        setTranslation(fade.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        }))
        Animated.timing(
            fade,
            {
            toValue:1,
            duration: 3000,
            delay: props.delay,
            useNativeDriver: true
            }
        ).start(() => handleAnimationTwo())
    }

    //Shrink animation
   const handleAnimationTwo = () => {
       fade.setValue(0)
       setTranslation(fade.interpolate({
           inputRange: [0,1],
           outputRange: [0,1]
       }))
       Animated.timing(
           fade,
           {
               toValue:1,
               duration: 3000,
               useNativeDriver: true
           }
       ).start()
   }

   //Animate when component mounts
   useEffect(() => {
       handleAnimation()
   }, [])

   return(
    <Animated.View
        style={{
            top: normalize.setNormalize(props.padding),

            transform: [
                {scale:translation}
            ]
        }}
        >

            <View 
            style={
                {
                    backgroundColor: props.color,
                    width: normalize.setNormalize(10) * props.scale, 
                    height: normalize.setNormalize(props.height),
                    borderRadius: normalize.setNormalize(40),
            }}>    
        </View>
    </Animated.View>
    )
}

export default GraphicBar;