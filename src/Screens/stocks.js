//React Imports
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  RefreshControl,
  Alert,
  StyleSheet,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import normalize from "../utils/Style/normalize";

import Graphic from "../Components/graphic";
import StockContainer from "../Components/stockContainer";
import SearchContainer from "../Components/searchContainer";

import GlobalStyles from "../utils/Style/globalStyles";

import { db } from "../utils/Config/firebase-config";
import config from "../utils/Config/envConfig";
import Constants from "../utils/Constants";
import GraphicUnderlay from "../Components/graphicUnderlay";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import StockBlock from "../Components/stockBlock";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const modalText = (text) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        marginBottom: normalize.setNormalize(35),
      }}
    >
      <EvilIcons name="eye" size={normalize.setNormalize(30)} color="white" />

      <Text style={[stockStyles.modalText]}>{text}</Text>
    </View>
  );
};

function Stocks({ navigation }) {
  const [stockSymbol, setStockSymbol] = useState("");

  const [visible, setVisible] = useState(false);

  const [searchData, setSearchData] = useState([]);
  const [allSearchData, setAllSearchData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);

  const [displayInfoOne, setDisplayInfoOne] = useState(false);

  const animatedValue = useRef(
    new Animated.Value(Constants.SEARCHBAR.animatedValue)
  ).current;

  const [refreshing, setRefreshing] = useState(false);

  const clean = /Brands/g;

  const InfoModal = () => {
    return (
      <Modal
        visible={displayInfoOne}
        presentationStyle="overFullScreen"
        animationType="fade"
      >
        <View style={stockStyles.infoModalBackground}>
          <View style={stockStyles.modalScreenContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={stockStyles.modalText}>
                {"Hello and welcome to"}
              </Text>

              <Text
                style={[
                  stockStyles.modalText,
                  { fontWeight: "800", fontSize: normalize.setNormalize(20) },
                ]}
              >
                Stock Watch!
              </Text>
            </View>

            <View style={stockStyles.modalGraphicContainer}>
              <Graphic scale={0.6} />
            </View>

            <View style={stockStyles.modalTextContainer}>
              {modalText(
                "Keep track of the hottest stocks on the Trending page"
              )}
              {modalText(
                "The number under the stock ticker is the number of times a stock has been searched on the app"
              )}
              {modalText("All data provided is real")}
              {modalText(
                "Add stocks to your library by pressing the plus icon on the stock's display page"
              )}
              {modalText(
                "Remove a stock from your library by swiping left on the stock and pressing the red X"
              )}

              <TouchableOpacity
                style={stockStyles.modalButtonContainer}
                onPress={() => {
                  setDisplayInfoOne(false);
                }}
              >
                <Feather
                  name="thumbs-up"
                  size={normalize.setNormalize(24)}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const Header = () => {
    return (
      <View style={stockStyles.headerContainer}>
        <Text style={GlobalStyles.title}>Trending</Text>

        <View
        style={{flexDirection: "row"}}
        >

          <TouchableOpacity
           onPress={() => {
            setDisplayInfoOne(true);
          }}
          >
            <MaterialIcons
            name="info-outline"
            size={normalize.setNormalize(30)}
            color="white"
            style = {{marginRight: normalize.setNormalize(10)}}
          />
          </TouchableOpacity>


          <TouchableOpacity
          onPress={() => {
            navigation.navigate("KYC");
          }}
          >
            <MaterialIcons
            name = "account-circle"
            size = {normalize.setNormalize(30)}
            color = "white"
            />
          </TouchableOpacity>

          
        </View>
      </View>
    );
  };

  const animate = () => {
    Animated.timing(animatedValue, {
      toValue: 82,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const animateIncreaseWidth = () => {
    Animated.timing(animatedValue, {
      toValue: 99,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTrending();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const StockComponent = () => {
    if (!visible) {
      return (
        <>
          {/* {<FuckMe/>} */}

          {trendingData
            .filter((_, index) => index % 4 == 0)
            .map((_, indexTwo) => (
              // <StockContainer
              //   key={stock.ticker}
              //   sName={stock.sName}
              //   ticker={stock.ticker}
              //   score={stock.score}
              //   percentChange={stock.percentChange.toFixed(2)}
              // />

              <StockBlock
                key={indexTwo}
                stock0={trendingData[indexTwo == 0 ? 0 : indexTwo == 1 ? 4 : indexTwo == 2 ? 8 : 0]}
                stock1={trendingData[indexTwo == 0 ? 1 : indexTwo == 1 ? 5 : indexTwo == 2 ? 9 : 0]}
                stock2={trendingData[indexTwo == 0 ? 2 : indexTwo == 1 ? 6 : indexTwo == 2 ? 10 : 0]}
                stock3={trendingData[indexTwo == 0 ? 3 : indexTwo == 1 ? 7 : indexTwo == 2 ? 11 : 0]}
                switch={true}
              />
            ))}
        </>
      );
    } else {
      return (
        <>
          {searchData.map((stock) => (
            <SearchContainer
              key={stock.Symbol}
              sName={stock.Name}
              ticker={stock.Symbol}
            />
          ))}
        </>
      );
    }
  };

  const getTickers = async () => {
    try {
      await fetch(config.TICKERS_API_URL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setAllSearchData(
            data.filter((value) =>
              value.Name.replace(/Technologies|Technology/g, "")
            )
          );
        });
    } catch (error) {
      Alert.alert(
        "We were unable to get the percent change for the trending stocks, please try restarting the app"
      );
    }
  };

  // const getAlpacaTickers = async () => {
  //   try {
  //     await fetch("https://broker-api.sandbox.alpaca.markets" + "/v1/assets")
  //       .then(function (response) {
  //         return response.json();
  //       })
  //       .then(function (data) {
  //         print("DATA");
  //         print(data);
  //       });
  //   } catch (error) {
  //     alert(error.error);
  //   }
  // };

  const filterTickers = (data) => {
    setSearchData(
      data.filter((value) =>
        value.Name.replace(/Technologies|Technology/g, "").includes(stockSymbol)
      )
    );
  };

  async function getTrending() {
    let tempTrending = [];
    let listStocks = "";

    const trending = query(
      collection(db, "score"),
      orderBy("score", "desc"),
      limit(12)
    );

    const trendingDocs = await getDocs(trending);

    trendingDocs.forEach(function (documentSnapshot) {
      listStocks = listStocks + documentSnapshot.id + ",";

      let cleanedName = documentSnapshot.data().sName.replace(clean, "").trim();

      tempTrending.push({
        ticker: documentSnapshot.id,
        sName: cleanedName,
        score: documentSnapshot.data().score,
        percentChange: 0,
      });
    });

    // setTrendingData(trendingData);
    let temp = [];
    let newsData = []

    try {
      await fetch(
        `${config.POLYGON_API_LINK}v2/snapshot/locale/us/markets/stocks/tickers?tickers=${listStocks}&apiKey=${config.POLYGON_API_KEY}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.tickers) {
            data.tickers.forEach((stock) => {
              tempTrending.forEach((trendingStock) => {
                if (trendingStock.ticker == stock.ticker) {
                  trendingStock.percentChange = stock.todaysChangePerc;
                }
              });
            });
          }
          // setTrendingData(tempTrending);
          return tempTrending;
        })
        .then(async function (trending) {

          for(let i = 0; i < trending.length; i++) {
            await fetch(
              `https://api.polygon.io/v2/reference/news?ticker=${trending[i]["ticker"]}&apiKey=6m0_ilIBV0jaREW2Jd_YNCnYXwB20uKo`
            ).then(function(response) {
              return response.json()
            }).then(function (data) {
              trending[i]["newsTitle"] = data.results[0]["title"];
              trending[i]["imageLink"] = data.results[0]["image_url"];
              trending[i]["newsLink"] = data.results[0]["article_url"];
              temp.push(trending[i]);
              // console.log(data.results.length)
            })
          }
          setTrendingData(temp)
        })

    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    animateIncreaseWidth();
    Keyboard.dismiss();
    setStockSymbol("");
  };

  useEffect(() => {
    getTrending();
    getTickers();
    // getAlpacaTickers();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      animateIncreaseWidth();
      setStockSymbol("");
      setVisible(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    filterTickers(allSearchData);
  }, [stockSymbol]);

  return (
    <KeyboardAvoidingView
      style={GlobalStyles.homePageContainer}
      keyboardVerticalOffset={10}
      behavior="padding"
    >
      <GraphicUnderlay top={60} />

      <ScrollView
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="red"
            title="REFRESHING"
            titleColor="white"
          />
        }
      >
        <InfoModal />
        <Header />

        <View>
          <View style={stockStyles.pageContainer}>
            <Animated.View
              style={[GlobalStyles.searchBarContainer, { width: width }]}
            >
              <TextInput
                style={stockStyles.searchInput}
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

            <TouchableOpacity
              onPress={() => handleCancel()}
              style={stockStyles.cancelContainer}
            >
              <Text style={stockStyles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {trendingData ? <StockComponent /> : <></>}
        {/*         
        <StockBlock
        switch = {false}
        />
        <StockBlock
        switch = {true}
        />
        <StockBlock
        switch = {false}
        />
        <StockBlock
        switch = {true}
        /> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Stocks;

const stockStyles = StyleSheet.create({
  pageContainer: {
    paddingTop: normalize.setNormalize(10),
    paddingBottom: normalize.setNormalize(15),
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
    alignItems: "center",
  },

  modalText: {
    color: "white",
    textAlign: "center",
    fontSize: normalize.setNormalize(18),
    paddingLeft: normalize.setNormalize(10),
    fontWeight: "600",
    textAlign: "left",
    fontFamily: Constants.FONT.family,
  },

  modalButtonContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "gray",
    borderRadius: normalize.setNormalize(30),
    padding: normalize.setNormalize(20),
    width: normalize.setNormalize(80),
    alignSelf: "center",
  },

  infoModalBackground: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },

  modalScreenContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: normalize.setNormalize(50),
    width: "100%",
    justifyContent: "center",
  },

  modalTextContainer: {
    paddingTop: normalize.setNormalize(60),
    flex: 1,
    justifyContent: "center",
    marginHorizontal: normalize.setNormalize(80),
    alignItems: "flex-start",
  },

  modalGraphicContainer: {
    height: normalize.setNormalize(150),
    width: "100%",
    paddingTop: normalize.setNormalize(100),
  },

  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  searchInput: {
    backgroundColor: "gray",
    height: normalize.setNormalize(32),
    width: "100%",
    borderRadius: normalize.setNormalize(10),
    paddingLeft: normalize.setNormalize(20),
    fontSize: normalize.setNormalize(18),
    fontWeight: "bold",
    color: "white",
    fontFamily: Constants.FONT.family,
  },

  cancelContainer: {
    alignItems: "flex-end",
    width: normalize.setNormalize(70),
  },

  cancel: {
    color: "gray",
    fontSize: normalize.setNormalize(16),
    fontFamily: Constants.FONT.family,
  },
});
