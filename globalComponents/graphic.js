import React, { Component } from "react";
import {View,Text, Animated, StyleSheet} from 'react-native';
import normalize from "../utils/normalize";
import GraphicBar from "./graphicBar";

class Graphic extends Component{

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         translation: 50,
    //     }

    //     this.fade = new Animated.Value(0)
    // }

    // handleAnimation(){
    //     this.fade.setValue(0)
    //     this.setState({translation: this.fade.interpolate({
    //         inputRange: [0,1],
    //         outputRange: [1,0]
    //     })})
    //     Animated.timing(
    //         this.fade, 
    //         {
    //         toValue: 1,
    //         duration: 3000,
    //         // easing: Easing.ease,
    //         useNativeDriver: true
    //         }
            
    //     ).start(() => this.handleAnimationTwo())
    // }

    // handleAnimationTwo = () => {
    //     this.fade.setValue(0)
    //     this.setState({translation: this.fade.interpolate({
    //         inputRange: [0,1],
    //         outputRange: [0,1]
    //     })})
    //     Animated.timing(
    //         this.fade,
    //         {
    //             toValue: 1,
    //             duration: 3000,
    //             useNativeDriver: true
    //         }
    //     ).start()
    // }

    // componentDidMount() {
    //     this.handleAnimation()
    // }



    render() {
        return (
            <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between', alignItems: 'center'}}>

             <GraphicBar
             height = {normalize.setNormalize(62 * this.props.scale)}
             color = "#6AB664"
             padding = {200 * this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(40 * this.props.scale)}
             color ="#6AB664"
             padding = {142 * this.props.scale}
             />

            <GraphicBar
             height = {normalize.setNormalize(60 * this.props.scale)}
             color = "#6AB664"
             padding = {120 * this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(60 * this.props.scale)}
             color ="#82C8FB"
             padding = {140 * this.props.scale}
             />
              <GraphicBar
             height = {normalize.setNormalize(60 * this.props.scale)}
             color = "#6AB664"
             padding = {80 * this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(30 * this.props.scale)}
             color ="#6AB664"
             padding = {40 * this.props.scale}
             />
              <GraphicBar
             height = {normalize.setNormalize(70 * this.props.scale)}
             color = "#6AB664"
             padding = {10 * this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(80 * this.props.scale)}
             color ="#82C8FB"
             padding = {60* this.props.scale}
             />
              <GraphicBar
             height = {normalize.setNormalize(32 * this.props.scale)}
             color = "#82C8FB"
             padding = {90* this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(50 * this.props.scale)}
             color ="#82C8FB"
             padding = {110* this.props.scale}
             />
              <GraphicBar
             height = {normalize.setNormalize(80 * this.props.scale)}
             color = "#6AB664"
             padding = {60* this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(70 * this.props.scale)}
             color ="#6AB664"
             padding = {10* this.props.scale}
             />
              <GraphicBar
             height = {normalize.setNormalize(30 * this.props.scale)}
             color = "#6AB664"
             padding = {-30* this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(40 * this.props.scale)}
             color ="#82C8FB"
             padding = {0* this.props.scale}
             />
              <GraphicBar
             height = {normalize.setNormalize(62 * this.props.scale)}
             color = "#82C8FB"
             padding = {30* this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(62 * this.props.scale)}
             color ="#6AB664"
             padding = {-30* this.props.scale}
             />
              <GraphicBar
             height = {normalize.setNormalize(70 * this.props.scale)}
             color = "#6AB664"
             padding = {-90* this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(60 * this.props.scale)}
             color ="#6AB664"
             padding = {-150* this.props.scale}
             />
              <GraphicBar
             height = {normalize.setNormalize(50 * this.props.scale)}
             color = "#6AB664"
             padding = {-180* this.props.scale}
             />

             <GraphicBar
             height = {normalize.setNormalize(60 * this.props.scale)}
             color ="#6AB664"
             padding = {-220* this.props.scale}
             />


             </View>

        )
    }
}


export default Graphic;