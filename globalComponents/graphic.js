import React from "react";
import {View} from 'react-native';
import normalize from "../utils/normalize";
import GraphicBar from "./graphicBar";
import Constants from "../Constants";


//Graph graphic displayed throughout the app
function Graphic(props){

    return (
        <View 
        style = {
            {
                flexDirection: 'row', 
                flex:1, 
                justifyContent: 
                'space-between', 
                alignItems: 'center'
            }
        }>
            {/**
             * Each bar on the graphic
             */}
            <GraphicBar
            height = {normalize.setNormalize(62 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {200 * props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(40 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {142 * props.scale}
            scale = {props.scale}
            />
        <   GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {120 * props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color ={Constants.THEME_COLOR.blue}
            padding = {140 * props.scale}
            scale = {props.scale}
            />
             <GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {80 * props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(30 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {40 * props.scale}
            scale = {props.scale}
            />
             <GraphicBar
            height = {normalize.setNormalize(70 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {10 * props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(80 * props.scale)}
            color ={Constants.THEME_COLOR.blue}
            padding = {60* props.scale}
            scale = {props.scale}
            />
             <GraphicBar
            height = {normalize.setNormalize(32 * props.scale)}
            color = {Constants.THEME_COLOR.blue}
            padding = {90* props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(50 * props.scale)}
            color ={Constants.THEME_COLOR.blue}
            padding = {110* props.scale}
            scale = {props.scale}
            />
             <GraphicBar
            height = {normalize.setNormalize(80 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {60* props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(70 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {10* props.scale}
            scale = {props.scale}
            />
             <GraphicBar
            height = {normalize.setNormalize(30 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {-30* props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(40 * props.scale)}
            color ={Constants.THEME_COLOR.blue}
            padding = {0 * props.scale}
            scale = {props.scale}
            />
             <GraphicBar
            height = {normalize.setNormalize(62 * props.scale)}
            color = {Constants.THEME_COLOR.blue}
            padding = {30* props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(62 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {-30* props.scale}
            scale = {props.scale}
            />
             <GraphicBar
            height = {normalize.setNormalize(70 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {-90* props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {-150* props.scale}
            scale = {props.scale}
            />
             <GraphicBar
            height = {normalize.setNormalize(50 * props.scale)}
            color = {Constants.THEME_COLOR.green}
            padding = {-180* props.scale}
            scale = {props.scale}
            />
            <GraphicBar
            height = {normalize.setNormalize(60 * props.scale)}
            color ={Constants.THEME_COLOR.green}
            padding = {-220* props.scale}
            scale = {props.scale}
            />
        </View>
    )
    
}


export default Graphic;