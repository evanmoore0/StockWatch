import React, { useState } from "react";

import GlobalStyles from "../utils/Style/globalStyles";

import { StyleSheet } from "react-native";

const SearchInput = () => {

    const [visible, setVisible] = useState(false)
    return(
        <Animated.View
        style={[GlobalStyles.searchBarContainer, { width: width }]}
      >
        <TextInput
          style={SearchInputStyles.searchInput}
          spellCheck={false}
          placeholderTextColor="white"
          placeholder={"Search"}
          selectionColor="white"
          clearButtonMode="always"
          value={stockSymbol}
          onFocus={() => {
            animate();
          }}
          onChangeText={(val) => {
            setStockSymbol(val);
            setVisible(true);
          }}
        />
      </Animated.View>
    )
}


const SearchInputStyles = StyleSheet.create({
    searchInput : {
        backgroundColor: "gray",
        height: normalize.setNormalize(32),
        width: "100%",
        borderRadius: normalize.setNormalize(10),
        paddingLeft: normalize.setNormalize(20),
        fontSize: normalize.setNormalize(18),
        fontWeight: "bold",
        color: "white",
      },
      cancelContainer: {
        alignItems: "flex-end",
        width: normalize.setNormalize(70),
      },
    
      cancel: {
        color: "gray",
        fontSize: normalize.setNormalize(16),
      }
})

export default SearchInput