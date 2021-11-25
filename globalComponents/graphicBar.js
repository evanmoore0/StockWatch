import React, { Component } from "react";
import {Animated, View, } from 'react-native';
import normalize from "../utils/normalize";

class GraphicBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            translation: 50,
        }

        this.fade = new Animated.Value(0)
    }

    handleAnimation(){
        this.fade.setValue(0)
        this.setState({translation: this.fade.interpolate({
            inputRange: [0,1],
            outputRange: [1,0]
        })})
        Animated.timing(
            this.fade, 
            {
            toValue: 1,
            duration: 3000,
            // easing: Easing.ease,
            useNativeDriver: true
            }
            
        ).start(() => this.handleAnimationTwo())
    }

    handleAnimationTwo = () => {
        this.fade.setValue(0)
        this.setState({translation: this.fade.interpolate({
            inputRange: [0,1],
            outputRange: [0,1]
        })})
        Animated.timing(
            this.fade,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            }
        ).start()
    }

    componentDidMount() {
        this.handleAnimation()
    }

    render() {
        return(
            <Animated.View
                style={{
                    top: normalize.setNormalize(this.props.padding),

                    transform: [
                        {scale:this.state.translation}
                    ]
                }}
                >

                    <View style={{
                        
                        backgroundColor: this.props.color,
                        width: normalize.setNormalize(10) * this.props.scale, 
                        height: normalize.setNormalize(this.props.height),
                        borderRadius: normalize.setNormalize(40),
                        
                    }}>    
                </View>
            </Animated.View>
        )
    }
}

export default GraphicBar;