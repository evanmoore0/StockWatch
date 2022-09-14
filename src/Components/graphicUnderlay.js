import React from "react";
import { View } from "react-native";
import normalize from "../utils/Style/normalize";
import Graphic from "./graphic";

export default function GraphicUnderlay(props) {
  return (
    <View
      style={{
        position: "absolute",
        top: normalize.setNormalize(props.top),
        width: "100%",
        height: normalize.setNormalize(800),
        opacity: 0.06,
        backgroundColor: "black",
        zIndex: 0,
      }}
    >
      <Graphic scale={1.4} />
    </View>
  );
}
