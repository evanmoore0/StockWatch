// import React, { useState, useRef } from "react";

// import {
//   Animated,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   KeyboardAvoidingView,
//   ScrollView,
//   RefreshControl,
  
// } from "react-native";

// import GraphicUnderlay from "../Components/graphicUnderlay";

// import Constants from "../utils/Constants";

// import GlobalStyles from "../utils/Style/globalStyles";

// import normalize from "../utils/Style/normalize";

// function Insiders() {
//   const [stockSymbol, setStockSymbol] = useState("");

//   const [visible, setVisible] = useState("false");

//   const animatedValue = useRef(
//     new Animated.Value(Constants.SEARCHBAR.animatedValue)
//   ).current;
//   const animate = () => {
//     Animated.timing(animatedValue, {
//       toValue: 82,
//       duration: 100,
//       useNativeDriver: false,
//     }).start();
//   };

//   const animateIncreaseWidth = () => {
//     Animated.timing(animatedValue, {
//       toValue: 99,
//       duration: 100,
//       useNativeDriver: false,
//     }).start();
//   };

//   const width = animatedValue.interpolate({
//     inputRange: [0, 100],
//     outputRange: ["0%", "100%"],
//   });

//   const handleCancel = () => {
//     setVisible(false);
//     animateIncreaseWidth();
//     Keyboard.dismiss();
//     setStockSymbol("");
//   };

//   const Header = () => {
//     return (
//       <View style={InsiderStyles.headerContainer}>
//         <Text style={GlobalStyles.title}>Trending</Text>

//         <TouchableOpacity
//           onPress={() => {
//             setDisplayInfoOne(true);
//           }}
//         >
//           <MaterialIcons
//             name="info-outline"
//             size={normalize.setNormalize(30)}
//             color="white"
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   };
//   return (
//     <KeyboardAvoidingView
//       style={GlobalStyles.homePageContainer}
//       keyboardVerticalOffset={10}
//       behavior="padding"
//     >
//       <GraphicUnderlay top={60} />

//       <ScrollView
//         stickyHeaderIndices={[2]}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="always"
//         keyboardDismissMode="on-drag"
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             progressBackgroundColor="red"
//             title="REFRESHING"
//             titleColor="white"
//           />
//         }
//       >
//         <InfoModal />
//         <Header />

//         <View>
//           <View style={InsiderStyles.pageContainer}>
//             <Animated.View
//               style={[GlobalStyles.searchBarContainer, { width: width }]}
//             >
//               <TextInput
//                 style={InsiderStyles.searchInput}
//                 spellCheck={false}
//                 placeholderTextColor="white"
//                 placeholder={"Search"}
//                 selectionColor="white"
//                 clearButtonMode="always"
//                 value={stockSymbol}
//                 onFocus={() => {
//                   animate();
//                 }}
//                 onChangeText={(val) => {
//                   setStockSymbol(val);
//                   setVisible(true);
//                 }}
//               />
//             </Animated.View>

//             <TouchableOpacity
//               onPress={() => handleCancel()}
//               style={InsiderStyles.cancelContainer}
//             >
//               <Text style={InsiderStyles.cancel}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* {trendingData ? <StockComponent /> : <></>} */}

//         {/* <StockBlock/> */}
//       </ScrollView>
//     </KeyboardAvoidingView>

//     // <>
//     //     <View>

//     //   <Animated.View
//     //     style={[GlobalStyles.searchBarContainer, { width: width }]}
//     //   >
//     //     <TextInput
//     //       style={InsiderStyles.searchInput}
//     //       spellCheck={false}
//     //       placeholderTextColor="white"
//     //       placeholder={"Search"}
//     //       selectionColor="white"
//     //       clearButtonMode="always"
//     //       value={stockSymbol}
//     //       onFocus={() => {
//     //         animate();
//     //       }}
//     //       onChangeText={(val) => {
//     //         setStockSymbol(val);
//     //         setVisible(true);
//     //       }}
//     //     />
//     //   </Animated.View>

//     //   <TouchableOpacity
//     //           onPress={() => handleCancel()}
//     //           style={InsiderStyles.cancelContainer}
//     //         >
//     //           <Text
//     //             style={InsiderStyles.cancel}
//     //           >
//     //             Cancel
//     //           </Text>
//     //     </TouchableOpacity>
//     //     </View>
//     // </>
//   );
// }

// const InsiderStyles = StyleSheet.create({
//   pageContainer: {
//     paddingTop: normalize.setNormalize(10),
//     paddingBottom: normalize.setNormalize(15),
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   modalText: {
//     color: "white",
//     textAlign: "center",
//     fontSize: normalize.setNormalize(18),
//     paddingLeft: normalize.setNormalize(10),
//     fontWeight: "600",
//     textAlign: "left",
//   },

//   modalButtonContainer: {
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     flexDirection: "row",
//     backgroundColor: "gray",
//     borderRadius: normalize.setNormalize(30),
//     padding: normalize.setNormalize(20),
//     width: normalize.setNormalize(80),
//     alignSelf: "center",
//   },

//   infoModalBackground: {
//     flex: 1,
//     backgroundColor: "black",
//     justifyContent: "center",
//     display: "flex",
//     alignItems: "center",
//   },

//   modalScreenContainer: {
//     flex: 1,
//     alignItems: "center",
//     marginTop: normalize.setNormalize(50),
//     width: "100%",
//     justifyContent: "center",
//   },

//   modalTextContainer: {
//     paddingTop: normalize.setNormalize(60),
//     flex: 1,
//     justifyContent: "center",
//     marginHorizontal: normalize.setNormalize(80),
//     alignItems: "flex-start",
//   },

//   modalGraphicContainer: {
//     height: normalize.setNormalize(150),
//     width: "100%",
//     paddingTop: normalize.setNormalize(100),
//   },

//   headerContainer: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   searchInput: {
//     backgroundColor: "gray",
//     height: normalize.setNormalize(32),
//     width: "100%",
//     borderRadius: normalize.setNormalize(10),
//     paddingLeft: normalize.setNormalize(20),
//     fontSize: normalize.setNormalize(18),
//     fontWeight: "bold",
//     color: "white",
//   },

//   cancelContainer: {
//     alignItems: "flex-end",
//     width: normalize.setNormalize(70),
//   },

//   cancel: {
//     color: "gray",
//     fontSize: normalize.setNormalize(16),
//   },
// });

// export default Insiders;
