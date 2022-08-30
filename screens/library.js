//React imports
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";

//Firebase imports
import { auth, db } from "../utils/firebase-config";

//Components
import StockContainer from "../globalComponents/stockContainer";
import GraphicUnderlay from "../globalComponents/graphicUnderlay";

//Styles
import GlobalStyles from "../utils/globalStyles";

//Normalize function
import normalize from "../utils/normalize";

//Icons
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { Swipeable } from "react-native-gesture-handler";

//Config file
import config from "../config";
import Constants from "../Constants";
import { getDoc, doc, arrayUnion, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useStockData } from "../utils/hooks/checkStockData";

//Timer for refreshing
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function Library(props) {
  const { stockData, setStockData } = useStockData();

  //All/Gainers/Losers buttons
  const [fontWeight, setFontWeight] = useState(["700", "400", "400"]);
  const [lineHeight, setLineHeight] = useState([2, 0.2, 0.2]);

  //Whether modal should be shown
  const [isVisible, setVisible] = useState(false);

  //Todays Gain
  const [toadysGain, setTodaysGain] = useState(0);

  //Data initially fetched from the database for the user
  const [userData, setUserData] = useState([]);

  //Display activity indicator when data is loading in
  const [loading, setLoading] = useState(true);

  const [allStockData, setAllStockData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [filterIndex, setFilterIndex] = useState(0);

  //Todays gain color
  const [color, setColor] = useState("white");

  const Header = () => {
    return (
      <View style={libraryStyles.headerContainer}>
        <View>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Library
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: color,
              fontSize: normalize.setNormalize(12),
              paddingTop: normalize.setNormalize(4),
            }}
          >
            {toadysGain}
          </Text>
        </View>

        {/**
         * Settings icon
         */}
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Ionicons
            name="ios-settings-outline"
            size={normalize.setNormalize(20)}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const SignOutModal = () => {
    return (
      <Modal
        visible={isVisible}
        presentationStyle="overFullScreen"
        transparent={true}
        animationType="slide"
      >
        <View style={libraryStyles.modalScreenContainer}>
          <View style={libraryStyles.modalContainer}>
            <View style={libraryStyles.modalXButtonContainer}>
              <TouchableOpacity
                style={libraryStyles.modalXButton}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <AntDesign
                  name="close"
                  size={normalize.setNormalize(24)}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            <View style={{ paddingBottom: normalize.setNormalize(40) }}>
              <TouchableOpacity
                style={libraryStyles.modalTextContainer}
                onPress={() => {
                  handleSignOut();
                }}
              >
                <Text style={{ color: "white" }}>Sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const AllGainersLosersTitle = () => {
    return (
      <View style={libraryStyles.allGainersLosersBackground}>
        <View style={libraryStyles.allGainersLosersContainer}>
          {allGainersLosers(0, "All")}
          {allGainersLosers(1, "Gainers")}
          {allGainersLosers(2, "Losers")}
        </View>
      </View>
    );
  };

  const allGainersLosers = (index, text) => {
    return (
      <TouchableOpacity
        style={{ width: "34%", alignItems: "center" }}
        onPress={() => {
          handleClick(index);
        }}
      >
        <Text
          style={[
            libraryStyles.allGainersLosersText,
            { fontWeight: fontWeight[index] },
          ]}
        >
          {text}
        </Text>
        <View style={libraryStyles.linePadding}>
          <View
            style={[libraryStyles.line, { height: lineHeight[index] }]}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

  //Show activity indicator when data is loading, display stock containers when done
  const StockContainers = () => {
    if (loading) {
      return (
        <ActivityIndicator color={Constants.THEME_COLOR.blue} size="large" />
      );
    }
    return (
      <>
        {userData.map((stock, index) => (
          <Swipeable key={index} renderRightActions={() => RightActions(stock)}>
            <StockContainer
              ticker={stock.ticker}
              sName={stock.sName}
              percentChange={parseInt(stock.percentChange) ? parseInt(stock.percentChange).toFixed(2) : stock.percentChange}
              score={stock.score}
            />
          </Swipeable>
        ))}
      </>
    );
    // }
  };

  //Red X that is displayed when user swipes on stock container
  const RightActions = (stock) => {
    return (
      <TouchableOpacity
        style={libraryStyles.removeContainer}
        onPress={() => {
          RemoveStock(stock);
        }}
      >
        <FontAwesome
          name="remove"
          size={normalize.setNormalize(24)}
          color="red"
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    let gain = 0;

    userData.forEach((stock) => {
      let percChange = parseInt(stock.percentChange) ? parseInt(stock.percentChange) : stock.percentChange
      gain += percChange;
    });

    gain >= 0
      ? setColor(Constants.THEME_COLOR.green)
      : setColor(Constants.THEME_COLOR.blue);

    userData.length > 0
      ? setTodaysGain(`${(gain / userData.length).toFixed(2)}%`)
      : setTodaysGain("");
  }, [userData]);

  //Updates the title/data
  const handleClick = (a) => {
    let tempWeight = ["400", "400", "400"];
    let tempHeight = [0.2, 0.2, 0.2];
    tempWeight[a] = "700";
    tempHeight[a] = 1;

    setFilterIndex(a);

    setFontWeight(tempWeight);
    setLineHeight(tempHeight);

    if (a == 0) {
      setUserData(allStockData);
    } else if (a == 1) {
      setUserData(allStockData.filter((stock) => stock.percentChange >= 0));
    } else if (a == 2) {
      setUserData(allStockData.filter((stock) => stock.percentChange < 0));
    }
  };

  async function GetStocks() {
    try {
      await getDoc(stockRef).then(function (data) {
        let test = [];
        data.data().stocks.forEach((stock) => {
          test.push(stock.ticker);
        });
        setStockData(test);
        GetPercentChange(data.data().stocks);
      });
    } catch (error) {
      alert(
        "There was an error fetching your stock data please email us at: @"
      );
    }
  }

  //Factor out?
  const stockRef = doc(db, "users", auth.currentUser.uid);

  async function AddStock() {
    try {
      await updateDoc(stockRef, {
        stocks: arrayUnion({
          percentChange: props.route.params.stock.percentChange,
          sName: props.route.params.stock.sName,
          score: props.route.params.stock.score,
          ticker: props.route.params.stock.ticker,
        }),
      });
    } catch (error) {
      alert("There was an error adding your stock please email us at: @");
    } finally {
      switch (filterIndex) {
        case 0:
          setUserData([
            ...userData,
            {
              percentChange: props.route.params.stock.percentChange,
              sName: props.route.params.stock.sName,
              ticker: props.route.params.stock.ticker,
              score: props.route.params.stock.score,
            },
          ]);
        case 1:
          if (props.route.params.stock.percentChange > 0) {
            setUserData([
              ...userData,
              {
                percentChange: props.route.params.stock.percentChange,
                sName: props.route.params.stock.sName,
                ticker: props.route.params.stock.ticker,
                score: props.route.params.stock.score,
              },
            ]);
          }
          break;
        case 2:
          if (props.route.params.stock.percentChange < 0) {
            setUserData([
              ...userData,
              {
                percentChange: props.route.params.stock.percentChange,
                sName: props.route.params.stock.sName,
                ticker: props.route.params.stock.ticker,
                score: props.route.params.stock.score,
              },
            ]);
          }
          break;
      }

      setStockData([...stockData, props.route.params.stock.ticker]);
      setAllStockData([...allStockData, props.route.params.stock]);
    }
  }

  async function RemoveStock(removeStock) {
    let temp = [];
    let updatedStock = userData.filter(
      (stock) => stock.sName != removeStock.sName
    );

    let allUpdatedStock = allStockData.filter(
      (stock) => stock.sName != removeStock.sName
    );
    await updateDoc(stockRef, {
      stocks: updatedStock,
    }).then(() => {
      updatedStock.forEach((stock) => {
        temp.push(stock.ticker);
      });
      setAllStockData(allUpdatedStock);
      setUserData(updatedStock);
      setStockData(temp);
    });
  }

  async function GetPercentChange(sData) {
    let listStocks = "";
    sData.forEach((stock) => {
      listStocks = listStocks + stock.ticker + ",";
    });

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
        .then(async function (data) {
          let scoreRef;

          for (let stock in sData) {
            for (let percentData in data.tickers) {
              scoreRef = doc(db, "score", data.tickers[percentData].ticker);
              if (sData[stock].ticker === data.tickers[percentData].ticker) {
                await getDoc(scoreRef).then((scoreData) => {
                  sData[stock].score = scoreData.data().score;
                  sData[stock].percentChange =
                    data.tickers[percentData].todaysChangePerc;
                });
              }
            }
          }
        });
    } catch (error) {
      alert("Couldn't get percent change :(");
    } finally {
      setLoading(false);

      switch (filterIndex) {
        case 0:
          setUserData(sData);
          break;
        case 1:
          setUserData(sData.filter((stock) => stock.percentChange >= 0));
          break;
        case 2:
          setUserData(sData.filter((stock) => stock.percentChange < 0));
          break;
      }
      setAllStockData(sData);
    }

    return sData;
  }

  //Updates the user's database and signs them out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("We were unable to sign you out, please try again later");
    }
  };

  useEffect(() => {
    GetStocks();
    return () => setUserData([]);
  }, []);

  useEffect(() => {
    if (props.route.params) {
      AddStock();
    }
  }, [props]);

  async function Refresh() {
    setRefreshing(true);
    await GetPercentChange(allStockData);
    setRefreshing(false);
  }

  return (
    //Container for whole screen
    <View style={GlobalStyles.homePageContainer}>
      <GraphicUnderlay top={90} />

      <SignOutModal />

      <ScrollView
        stickyHeaderIndices={[1]}
        style={{ zIndex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => Refresh()}
            progressBackgroundColor="red"
            title="REFRESHING"
            titleColor="white"
          />
        }
      >
        <Header />

        <AllGainersLosersTitle />

        <StockContainers />
      </ScrollView>
    </View>
  );
}

export default Library;

const libraryStyles = StyleSheet.create({
  removeContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: normalize.setNormalize(10),
    paddingBottom: normalize.setNormalize(20),
  },

  headerContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  modalScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    height: normalize.setNormalize(200),
    width: normalize.setNormalize(200),
    backgroundColor: "gray",
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalXButtonContainer: {
    width: "100%",
    paddingLeft: normalize.setNormalize(20),
    paddingTop: normalize.setNormalize(20),
  },

  modalXButton: {
    backgroundColor: "#6AB664",
    borderRadius: 50,
    width: normalize.setNormalize(50),
    height: normalize.setNormalize(50),
    justifyContent: "center",
    alignItems: "center",
  },

  modalTextContainer: {
    backgroundColor: "#6AB664",
    padding: normalize.setNormalize(20),
    borderRadius: 50,
  },

  allGainersLosersBackground: {
    paddingTop: normalize.setNormalize(10),
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: "100%",
    paddingBottom: normalize.setNormalize(15),
  },

  allGainersLosersContainer: {
    flexDirection: "row",
    width: "100%",
  },

  allGainersLosersText: {
    color: "white",
    fontSize: normalize.setNormalize(16),
    paddingRight: normalize.setNormalize(15),
  },

  linePadding: {
    paddingTop: normalize.setNormalize(15),
    width: "100%",
  },

  line: {
    backgroundColor: "white",
    width: "100%",
    opacity: 0.5,
  },
});
