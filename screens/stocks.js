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
  LogBox,
} from "react-native";

//Icon imports
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

//Normalize function
import normalize from "../utils/normalize";

//Components
import Graphic from "../globalComponents/graphic";
import StockContainer from "../globalComponents/stockContainer";
import SearchContainer from "../globalComponents/searchContainer";

//Global StyleSheet
import GlobalStyles from "../utils/globalStyles";

//Firebase imports
import { db } from "../utils/firebase-config";
import config from "../config";
import Constants from "../Constants";
import GraphicUnderlay from "../globalComponents/graphicUnderlay";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

//Timer for refreshing
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

//Text displayed when user presses info icon
const modalText = (text) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        marginBottom: normalize.setNormalize(25),
      }}
    >
      <EvilIcons name="eye" size={normalize.setNormalize(24)} color="white" />

      <Text style={[stockStyles.modalText]}>{text}</Text>
    </View>
  );
};

function Stocks({ navigation }) {
  //Hooks
  //Stock symbol that is inputed into search bar
  const [stockSymbol, setStockSymbol] = useState("");

  //Whether search bar components should be shown
  const [visible, setVisible] = useState(false);

  //Data for search/trending
  const [searchData, setSearchData] = useState([]);
  const [allSearchData, setAllSearchData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);

  //Displaying info modal
  const [displayInfoOne, setDisplayInfoOne] = useState(false);

  //Value for animation
  const animatedValue = useRef(
    new Animated.Value(Constants.SEARCHBAR.animatedValue)
  ).current;

  //Whether the user tried refreshing the screen
  const [refreshing, setRefreshing] = useState(false);

  //Regex for cleaning stock name
  const clean = /Brands/g;

  const InfoModal = () => {
    return (
      <Modal
        visible={displayInfoOne}
        presentationStyle="overFullScreen"
        animationType="fade"
      >
        {/*
                    Allows user to press anywhere on the screen to dismiss the modal
                    */}
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <View style={stockStyles.modalScreenContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={stockStyles.modalText}>
                {"Hello and welcome to   "}
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

            <View
              style={{
                paddingTop: normalize.setNormalize(100),
                flex: 1,
                justifyContent: "center",
                marginHorizontal: normalize.setNormalize(80),
                alignItems: "center",
              }}
            >
              {modalText(
                "Keep track of the hottest stocks by visiting the Trending Page."
              )}
              {modalText(
                "The number under the stock ticker is the number of times a stock has been searched on the app."
              )}
              {modalText("All data provided is real.")}
              {modalText(
                "Add stocks to your library by pressing the plus icon on the stock's display page!"
              )}
              {modalText(
                "Remove stocks from your library by swiping left on the stock and pressing the red X."
              )}

              <TouchableOpacity
                style={stockStyles.modalButtonContainer}
                onPress={() => {
                  setDisplayInfoOne(false);
                }}
              >
                <Feather
                  name="thumbs-up"
                  size={normalize.setNormalize(14)}
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
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
 
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: normalize.setNormalize(20)
          }}
        >
          Trending
        </Text>


        <TouchableOpacity
          onPress={() => {
            setDisplayInfoOne(true);
          }}
        >
          <MaterialIcons
            name="info-outline"
            size={normalize.setNormalize(30)}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  };

  //Shrinking animation
  const animate = () => {
    Animated.timing(animatedValue, {
      toValue: 82,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  //Expanding animation
  const animateIncreaseWidth = () => {
    Animated.timing(animatedValue, {
      toValue: 99,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  //Width of the animated searchbox
  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  //Called when user refreshes screen
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTrending();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  //If the user is not searching a stock display the trending page, otherwise
  //display search page
  const StockComponent = () => {
    //If the search bar is not focused
    if (!visible) {
      return (
        <>
          {trendingData.map((stock, index) => (
            <StockContainer
              key={index}
              sName={stock.sName}
              ticker={stock.ticker}
              score={stock.score}
              percentChange={stock.percentChange.toFixed(2)}
            />
          ))}
        </>
      );
    } else {
      //Otherwise return search component
      return (
        <>
          {searchData.map((stock, index) => (
            <SearchContainer
              key={index}
              sName={stock.Name}
              ticker={stock.Symbol}
            />
          ))}
        </>
      );
    }
  };

  //All tickers on the app (just S&P 500 right now)
  const getTickers = async () => {
    try {
      await fetch(config.TICKERS_API_URL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //Update the search data with list of tickers
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

  //Filter throught the full list of stocks
  const filterTickers = (data) => {
    setSearchData(
      data.filter((value) =>
        value.Name.replace(/Technologies|Technology/g, "").includes(stockSymbol)
      )
    );
  };

  //Get top 20 stocks with the highest score
  const getTrending = async () => {
    let tempTrending = [];
    let listStocks = "";

    const trending = query(
      collection(db, "score"),
      orderBy("score", "desc"),
      limit(10)
    );

    const trendingDocs = await getDocs(trending);

    trendingDocs.forEach(function (documentSnapshot) {
      listStocks = listStocks + documentSnapshot.id + ",";

      //Clean the name from the database
      let cleanedName = documentSnapshot.data().sName.replace(clean, "").trim();

      //Store the trending data in a temp variable
      tempTrending.push({
        ticker: documentSnapshot.id,
        sName: cleanedName,
        score: documentSnapshot.data().score,
        percentChange: 0,
      });
    });

    setTrendingData(trendingData);

    try {
      await fetch(
        "https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=" +
          listStocks +
          "&apiKey=" +
          config.POLYGON_API_KEY
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
          setTrendingData(tempTrending);
        });
    } catch (error) {
      Alert.alert("ERROR HERHEH");
    }
  };

  //Called every time the component is mounted
  //Get trending data and all tickers
  useEffect(() => {
    LogBox.ignoreAllLogs();
    getTrending();
    getTickers();
  }, []);

  //When the user leaves the screen clear the search bar, display trending info
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      animateIncreaseWidth();
      setStockSymbol("");
      setVisible(false);
    });
    return unsubscribe;
  }, [navigation]);

  //Called everytime the stockSymbol hook is updated (When the user types in the search bar)
  useEffect(() => {
    filterTickers(allSearchData);
  }, [stockSymbol]);

  return (
    //Container for whole screen
    //Allows user to view full list of data when keyboard is up
    <KeyboardAvoidingView
      style={GlobalStyles.homePageContainer}
      keyboardVerticalOffset={10}
      behavior="padding"
    >
      {/*
            Graphic that is displayed under trending 
             */}

      <GraphicUnderlay top={60} />

      {/*
            Scroll View for the whole page, allows trending title and info icon to scroll.
            StickyHeaderIndices - keeps the search bar at the top of the page when the user scrolls.
            KeyboardSouldPersistTaps - Allows user to press on button when the keyboard is up.
            KeyboardDismissMode - Dismisses keyboard when the user drags
             */}
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
        {/*
                Information page
                */}
        <InfoModal />

        {/*
                Trending title and info button container
                */}
        <Header />

        {/*
                Container for search bar and cancel button (without it sticky header indices messes up)
                */}
        <View>
          {/*
                    Actual container for search bar and cancel button
                    */}
          <View
            style={{
              paddingTop: normalize.setNormalize(10),
              paddingBottom: normalize.setNormalize(15),
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/*
                        Allows me to shirnk/expand the search bar
                        */}
            <Animated.View
              style={[GlobalStyles.searchBarContainer, { width: width }]}
            >
              {/*
                            Search bar
                            */}
              <TextInput
                style={{
                  backgroundColor: "gray",
                  height: normalize.setNormalize(32),
                  width: "100%",
                  borderRadius: normalize.setNormalize(10),
                  paddingLeft: normalize.setNormalize(20),
                  fontSize: normalize.setNormalize(18),
                  fontWeight: "bold",
                  color: "white",
                }}
                spellCheck={false}
                placeholderTextColor="white"
                placeholder={"Search"}
                selectionColor="white"
                clearButtonMode="always"
                value={stockSymbol}
                //When the user clicks on the search bar, show the animation
                onFocus={() => {
                  animate();
                }}
                //Update the stock hook and show the stock page when the user types
                onChangeText={(val) => {
                  setStockSymbol(val);
                  setVisible(true);
                }}
              />
            </Animated.View>

            {/* 
                        Cancel button
                         */}
            <TouchableOpacity
              //When the cancel button is press display the trending page, expand animation, and dismiss the keyboard
              onPress={() => {
                setVisible(false);
                animateIncreaseWidth();
                Keyboard.dismiss();
                setStockSymbol("");
              }}
              style={{
                alignItems: "flex-end",
                width: normalize.setNormalize(70),
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: normalize.setNormalize(16),
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*
               Either trending page or stock page
                */}
        {trendingData ? <StockComponent /> : <></>}

        {/* <StockBlock
        smallImageURL = "https://g.foolcdn.com/editorial/images/698099/person-sitting-at-a-desk-using-a-laptop-and-smiling.jpg"
        bigImageURL = "https://cdn.benzinga.com/files/images/story/2022/08/29/image42.jpg?width=1200&height=800&fit=crop"
        smallTitle = "News title would go here"
        bigTitle = "Should this be over the image?"
        />
        <StockBlock
        smallImageURL = "https://g.foolcdn.com/editorial/images/698509/0x0-supercharger_16.jpg"
        bigImageURL = "https://cdn.benzinga.com/files/images/story/2022/08/29/0x0-powerwall_plus_03.jpg?width=1200&height=800&fit=crop"
        smallTitle = "Elon has a small cock"
        bigTitle = "Wowowowwowowowo"
        />
        <StockBlock
        smallImageURL = "https://cdn.benzinga.com/files/images/story/2022/analyst_ratings_image_25533.jpeg?width=1200&height=800&fit=crop"
        bigImageURL = "https://images.mktw.net/im-612255/social"
        smallTitle = "She couldn't decide of the glass was half empty or half full so she drank it."
        bigTitle = "here aren't enough towels in the world to stop the sewage flowing from his mouth."
        />
        <StockBlock
        smallImageURL = "https://images.mktw.net/im-608368/social"
        bigImageURL = "https://staticx-tuner.zacks.com/images/default_article_images/default9.jpg"
        smallTitle = "The irony of the situation wasn't lost on anyone in the room."
        bigTitle = "Nancy decided to make the porta-potty her home."
        />
        <StockBlock
        smallImageURL = "https://cdn.benzinga.com/files/images/story/2022/08/29/abtech_10.png?width=1200&height=800&fit=crop"
        bigImageURL = "https://staticx-tuner.zacks.com/images/articles/main/53/49.jpg"
        smallTitle = "All randomly generated "
        bigTitle = "Thx for testing"
        /> */}


      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Stocks;

const stockStyles = StyleSheet.create({
  modalText: {
    color: "white",
    textAlign: "center",
    fontSize: normalize.setNormalize(16),
    paddingLeft: normalize.setNormalize(10),
    fontWeight: "600",
  },

  modalButtonContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "gray",
    borderRadius: normalize.setNormalize(30),
    padding: normalize.setNormalize(10),
    width: normalize.setNormalize(40),

    // width: normalize.setNormalize(20)
  },

  modalScreenContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: normalize.setNormalize(50),
    // marginHorizontal: normalize.setNormalize(16),
    width: "100%",
    justifyContent: "center",
  },

  modalGraphicContainer: {
    height: normalize.setNormalize(200),
    width: "100%",
    paddingTop: normalize.setNormalize(100),
  },
});
