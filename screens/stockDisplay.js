//React imports
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  LogBox,
} from "react-native";

//Victory Native components (Graph)
import {
  VictoryLine,
  createContainer,
  LineSegment,
  VictoryTooltip,
} from "victory-native";

//Config file (API Key)
import config from "../config";

//Linking
import * as Linking from "expo-linking";

//Normailize function
import normalize from "../utils/normalize";

//Icon
import { Ionicons } from "@expo/vector-icons";

//Firebase imports
import { db } from "../utils/firebase-config";

//Components
import Constants from "../Constants";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useStockData } from "../utils/hooks/checkStockData";
import moment from "moment";

function StockDisplay(props) {
  const { stockData, setStockData } = useStockData();

  //Hooks
  //Background color of stock buttons
  const [color, setColor] = useState([
    "#6AB664",
    "black",
    "black",
    "black",
    "black",
  ]);

  //Text color of stock buttons
  const [textColor, setTextColor] = useState([
    "white",
    "#6AB664",
    "#6AB664",
    "#6AB664",
    "#6AB664",
  ]);

  const [render, setRender] = useState(true);

  //Data for the stock from polygon API
  const [infoData, setInfoData] = useState([]);

  //News data for stock
  const [newsData, setNewsData] = useState([]);

  //Open price
  const [open, setOpen] = useState(0);

  //Get the percentChange for the stock if I haven't already gotten it
  const [percentChange, setPercentChange] = useState(0);

  //Update the score for the stock
  const [score, setPropsScore] = useState(0);

  //Whether the component is loading or not
  const [loading, setLoading] = useState(true);

  //Data for the graph
  const [graphData, setGraphData] = useState([]);

  //Data for week/month/year/day -> so I don't have to get the data again if user
  //switches back on graph
  const [weekData, setWeekData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [dayData, setDayData] = useState([]);

  //Container cursor/voronoi container for graph
  const Container = createContainer("voronoi", "cursor");

  //Sets the text color/ background color of a stock button
  const handleColor = (i) => {
    let tempColor = ["black", "black", "black", "black", "black"];
    let tempTextColor = ["#6AB664", "#6AB664", "#6AB664", "#6AB664", "#6AB664"];

    tempColor[i] = "#6AB664";
    tempTextColor[i] = "white";

    setColor(tempColor);
    setTextColor(tempTextColor);
  };

  //Displays add button if supposed to
  const addButton = () => {
    if (!stockData.includes(props.route.params.stock.ticker)) {
      return (
        <TouchableOpacity
          style={{ paddingRight: normalize.setNormalize(16) }}
          onPress={() => {
            //Update the score of the stock when someone adds it to their library
            //Navigate to library page and pass it percent change, ticker, stock name
            props.navigation.navigate("TabStack", {
              screen: "Library",
              params: {
                stock: {
                  sName: props.route.params.stock.sName,
                  ticker: props.route.params.stock.ticker,
                  score: score,
                  percentChange: percentChange,
                },
              },
            });
          }}
        >
          <Ionicons
            name="add"
            size={normalize.setNormalize(30)}
            color="white"
          />
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  };

  //Displays info data
  const infoDataDisplay = (label, index) => {
    return (
      <View style={stockDisplayStyles.infoDataContainer}>
        <Text style={stockDisplayStyles.tableText}>{label + ":"}</Text>
        <Text style={{ color: "white", fontSize: normalize.setNormalize(13) }}>
          {infoData[index] ? infoData[index] : "No Data"}
        </Text>
      </View>
    );
  };

  //Updates the score of the stock
  const setScore = async () => {
    const scoreRef = doc(db, "score", props.route.params.stock.ticker);

    const scoreDoc = await getDoc(scoreRef);

    scoreDoc.exists()
      ? updateDoc(scoreRef, {
          score: scoreDoc.data().score + 1,
        }).then(() => setPropsScore(scoreDoc.data().score))
      : setDoc(scoreRef, {
          score: 1,
          sName: props.route.params.stock.sName,
        }).then(() => setPropsScore(1));
  };

  //Get the stock data from polygon API for the searched stock
  const getData = async () => {
    let tempData = [];

    try {
      await fetch(
        "https://api.polygon.io/v1/meta/symbols/" +
          props.route.params.stock.ticker +
          "/company?apiKey=" +
          config.POLYGON_API_KEY
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //Use one hook to store all data

          tempData = [
            data?.similar,
            data?.description,
            data?.tags,
            data?.ceo,
            data?.hq_state,
            data?.marketcap,
            data?.sector,
            data?.employees,
            data?.url,
            data?.exchangeSymbol,
            data?.phone,
            data?.listdate,
            data?.industry,
          ];

          setInfoData(tempData);

          //Display loading screen when data is loading (Prevent component from updating multiple times)
          setRender(false);
        });
    } catch (error) {
      Alert.alert(
        "Sorry we couldn't get description information for this stock :("
      );
      setRender(false);
    }
  };

  //Only get the percent change if the user didn't click on a trending stock (Already get percent change for trending on stocks page)
  const getPercentChange = async () => {
    //Check to see if stock is coming from trending page -> if not
    if (props.route.params.stock.percentChange == undefined) {
      try {
        await fetch(
          "https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/" +
            props.route.params.stock.ticker +
            "?apiKey=" +
            config.POLYGON_API_KEY
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            setPercentChange(data.ticker.todaysChangePerc);
          });
      } catch (error) {
        //If no data for percent change, set to be 0
        setPercentChange(0);
      }
    } else {
      //If stock is coming from stocks page
      setPercentChange(props.route.params.stock.percentChange);
    }
  };

  //Get news for the searched stock from polygon API
  const getNews = async () => {
    try {
      await fetch(
        "https://api.polygon.io/v2/reference/news?ticker=" +
          props.route.params.stock.ticker +
          "&apiKey=" +
          config.POLYGON_API_KEY
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setNewsData(data.results);
        });
    } catch (error) {
      Alert.alert("Sorry we couldn't get news data for this stock :(");
    }
  };

  //Get the graph data from the start date to the end date
  //timespan: timeperiod for which get data points
  //multiplier: number of data points getting in the time span
  // - example: timespan = "day" multiplier = "1" will get 1 day data point for each day from startDate to endDate
  //period: use to set hooks of day/week/month/year so don't have to make api call everytime user switches between them
  const getGraphData = async (
    startDate,
    endDate,
    timespan,
    multiplier,
    period
  ) => {
    let tempGraphData = [];

    try {
      await fetch(
        "https://api.polygon.io/v2/aggs/ticker/" +
          props.route.params.stock.ticker +
          "/range/" +
          multiplier +
          "/" +
          timespan +
          "/" +
          startDate +
          "/" +
          endDate +
          "?adjusted=true&sort=asc&limit=300&apiKey=" +
          config.POLYGON_API_KEY
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.results) {
            setOpen(data.results[0].h);

            for (let date in data.results) {
              tempGraphData.push({
                x: date,
                y: data.results[date].h,
              });
            }

            setGraphData(tempGraphData);

            if (period == "day") {
              setDayData(tempGraphData);
            } else if (period == "week") {
              setWeekData(tempGraphData);
            } else if (period == "month") {
              setMonthData(tempGraphData);
            } else {
              setYearData(tempGraphData);
            }
          } else {
            setGraphData([{ x: 0, y: 0 }]);
          }
        })
    } catch (error) {
      //Set open and graph data so graph doesn't throw error when calculating percent change
      setOpen(0);
      setGraphData([{ x: 0, y: 0 }]);
    } finally {
      setLoading(false);
    }
  };

  //Call this the first time user presses on week, month, year and the first time the app is loaded
  const getOtherGraphData = (i) => {
    //Get the current date

    let startDate = moment();
    let endDate = moment();

    const dateMilli = new Date(Date.now());

    //If user presses on 1D button
    if (i == 0) {
      startDate.subtract("1", "day");

      if (startDate.day() == 0) {
        startDate.add("1", "day");
      } else if (startDate.day() == 6) {
        startDate.subtract("1", "day");
      }

      if (endDate.day() == 0) {
        endDate.add("1", "day");
      } else if (endDate.day() == 6) {
        endDate.subtract("1", "day");
      }

      let finalStart  = startDate.format("YYYY-MM-DD");
      let finalEnd =  endDate.format("YYYY-MM-DD");


      getGraphData(finalStart, finalEnd, "minute", "1", "day");

      //If user presses on 1W button
    } else if (i == 1) {
      startDate.subtract("7", "days");

      if (startDate.day() == 0) {
        startDate.add("1", "day");
      } else if (startDate.day() == 6) {
        startDate.subtract("1", "day");
      }

      if (endDate.day() == 0) {
        endDate.add("1", "day");
      } else if (endDate.day() == 6) {
        endDate.subtract("1", "day");
      }

      startDate.format("YYYY-MM-DD");
      endDate.format("YYYY-MM-DD");

      let finalStart  = startDate.format("YYYY-MM-DD");
      let finalEnd =  endDate.format("YYYY-MM-DD");

      getGraphData(finalStart, finalEnd, "minute", "1", "week");

      //If user presses 1M
    } else if (i == 2) {
      startDate.subtract("1", "month");

      if (startDate.day() == 0) {
        startDate.add("1", "day");
      } else if (startDate.day() == 6) {
        startDate.subtract("1", "day");
      }

      if (endDate.day() == 0) {
        endDate.add("1", "day");
      } else if (endDate.day() == 6) {
        endDate.subtract("1", "day");
      }

      startDate.format("YYYY-MM-DD");
      endDate.format("YYYY-MM-DD");

      let finalStart  = startDate.format("YYYY-MM-DD");
      let finalEnd =  endDate.format("YYYY-MM-DD");

      getGraphData(finalStart, finalEnd, "day", "1", "month");

      //User presses 1Y
    } else {
      startDate.subtract("1", "year");

      if (startDate.day() == 0) {
        startDate.add("1", "day");
      } else if (startDate.day() == 6) {
        startDate.subtract("1", "day");
      }

      if (endDate.day() == 0) {
        endDate.add("1", "day");
      } else if (endDate.day() == 6) {
        endDate.subtract("1", "day");
      }

      startDate.format("YYYY-MM-DD");
      endDate.format("YYYY-MM-DD");

      let finalStart  = startDate.format("YYYY-MM-DD");
      let finalEnd =  endDate.format("YYYY-MM-DD");

      getGraphData(finalStart, finalEnd, "week", "1", "year");
    }
  };

  //Set the score, get data, get news when the component is mounted
  useEffect(() => {
    LogBox.ignoreAllLogs();

    getData();
    getNews();
    getPercentChange();
    setScore();
    getOtherGraphData(0);

    return () => {
      setDayData([]);
      setWeekData([]);
      setMonthData([]);
      setYearData([]);
    };
  }, [props]);

  const Nav = () => {
    return (
      <View style={stockDisplayStyles.headerContainer}>
        {/* 
                Back button
                */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={normalize.setNormalize(30)}
            color="white"
          />

          <Text
            style={{
              fontSize: normalize.setNormalize(20),
              fontWeight: Constants.STOCK_NAME_FONT.weight,
              color: "gray",
            }}
          >
            {"$" + props.route.params.stock.ticker}
          </Text>
        </TouchableOpacity>

        {addButton()}
      </View>
    );
  };

  const Header = () => {
    return (
      <View style={stockDisplayStyles.titleScoreContainer}>
        <Text
          style={{
            fontSize: normalize.setNormalize(35),
            color: "white",
          }}
        >
          {props.route.params.stock.sName}
        </Text>

        <Text
          style={{
            paddingTop: normalize.setNormalize(10),
            color: Constants.THEME_COLOR.blue,
            fontWeight: "bold",
          }}
        >
          {"Score: " + score}
        </Text>
      </View>
    );
  };

  function HandleNewsDate(date) {
    let current = moment();

    let newsDate = moment(date);

    let dif = current.diff(newsDate, "hours");

    if (current.date() != newsDate.date()) {
      return newsDate.format("ddd, MMM DD");
    } else if (dif <= 1) {
      return "now";
    }

    return `${current.diff(newsDate, "hours")}h ago`;
  }

  //Graph, while data is loading shows activity indicator
  const Graph = () => {
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: normalize.setNormalize(60),
            height: normalize.setNormalize(325),
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    if (!graphData) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: normalize.setNormalize(60),
            height: normalize.setNormalize(325),
          }}
        >
          <Text
            style={{
              fontSize: normalize.setNormalize(25),
              color: "gray",
              fontWeight: "800",
            }}
          >
            No Data
          </Text>
        </View>
      );
    }
    return (
      //Graph
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: normalize.setNormalize(10),
          height: normalize.setNormalize(325),
          display: "flex",
        }}
      >
        <VictoryLine
          data={graphData}
          padding={{ top: normalize.setNormalize(40) }}
          //Sets color of line to be theme green
          style={{
            data: { stroke: Constants.THEME_COLOR.green, strokeWidth: 2 },
          }}
          containerComponent={
            <Container
              //Line that displays percent change
              cursorComponent={
                <LineSegment style={{ stroke: "white", strokeWidth: 1.5 }} />
              }
              //Calculates percent change

              labels={(point) =>
                "% " +
                (
                  Math.round(((point.datum.y - open) / open) * 100 * 100) / 100
                ).toString()
              }
              cursorDimension="x"
              voronoiDimension="x"
              //Displays percent change
              labelComponent={
                <VictoryTooltip
                  style={{
                    fill: ({ datum }) =>
                      datum.y - open > 0
                        ? Constants.THEME_COLOR.green
                        : Constants.THEME_COLOR.blue,
                    fontSize: normalize.setNormalize(13),
                    paddingLeft: normalize.setNormalize(16),
                    fontWeight: "600",
                  }}
                  flyoutStyle={{ fill: "black", strokeWidth: 0 }}
                  center={{
                    x: normalize.setNormalize(30),
                    y: normalize.setNormalize(10),
                  }}
                  pointerLength={0}
                />
              }
            />
          }
        ></VictoryLine>
      </View>
    );
  };

  const News = () => {
    return (
      <>
        <View style={{ paddingVertical: normalize.setNormalize(30) }}>
          <View style={stockDisplayStyles.borderLine}></View>
        </View>

        <Text style={stockDisplayStyles.title}>News</Text>
        {newsData.map((news, index) => (
          <View
            style={{ paddingBottom: normalize.setNormalize(20) }}
            key={index}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: normalize.setNormalize(20),
                justifyContent: "space-evenly",
              }}
              onPress={() => {
                //Open link provided by api
                try {
                  Linking.openURL(news.article_url);
                } catch (error) {
                  Alert.alert("Sorry we could not open up this news link");
                }
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingVertical: normalize.setNormalize(20),
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: normalize.setNormalize(12),
                  }}
                >
                  {news.publisher.name}
                </Text>

                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: normalize.setNormalize(12),
                  }}
                >
                  {HandleNewsDate(news.published_utc)}
                </Text>
              </View>

              <Text
                style={{
                  color: "white",
                  paddingBottom: normalize.setNormalize(15),
                }}
              >
                {news.title}
              </Text>

              <Image
                style={{
                  height: normalize.setNormalize(230),
                  borderRadius: 10,
                }}
                source={{
                  uri: news.image_url,
                }}
              />

              <Text
                numberOfLines={3}
                style={{
                  color: "white",
                  paddingVertical: normalize.setNormalize(15),
                }}
              >
                {news.description}
              </Text>

              {/* <Text style={{color:'white'}}>{item.published_utc}</Text> */}

              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 0.5,
                  top: normalize.setNormalize(20),
                  opacity: 0.3,
                }}
              ></View>
            </TouchableOpacity>
          </View>
        ))}
      </>
    );
  };

  const Info = () => {
    return (
      <>
        <View style={{ paddingBottom: normalize.setNormalize(30) }}>
          <View style={stockDisplayStyles.borderLine}></View>
        </View>

        <Text style={stockDisplayStyles.title}>
          {"About " + props.route.params.stock.sName}
        </Text>

        {infoData[1] ? (
          <View style={stockDisplayStyles.descriptionContainer}>
            <Text style={{ color: "white" }}>{infoData[1]}</Text>
          </View>
        ) : (
          <></>
        )}

        {/**
         * Displays infoData
         */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingTop: normalize.setNormalize(20),
            paddingBottom: normalize.setNormalize(20),
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "33%" }}>
            {infoDataDisplay("CEO", 3)}
            {infoDataDisplay("Employees", 7)}
            {infoDataDisplay("Headquarters", 4)}
          </View>

          <View style={{ width: "34%" }}>
            {infoDataDisplay("Market Cap", 5)}
            {infoDataDisplay("Industry", 12)}
            {infoDataDisplay("Sector", 6)}
          </View>

          <View style={{ width: "30%" }}>
            {infoDataDisplay("Exchange", 9)}
            {infoDataDisplay("List Date", 11)}
            {infoDataDisplay("Phone Number", 10)}
          </View>
        </View>
      </>
    );
  };

  const Tags = () => {
    return (
      <>
        {infoData[2] ? (
          <>
            <View style={{ paddingVertical: normalize.setNormalize(20) }}>
              <View style={stockDisplayStyles.borderLine}></View>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                flexWrap: "wrap",
                marginBottom: normalize.setNormalize(12),
              }}
            >
              {infoData[2].map((item, index) => (
                <View
                  style={{
                    paddingHorizontal: 10,
                    marginBottom: normalize.setNormalize(8),
                  }}
                  key={index}
                >
                  <View
                    style={{
                      borderRadius: 30,
                      backgroundColor: "#3B3939",
                      paddingHorizontal: normalize.setNormalize(10),
                      paddingVertical: normalize.setNormalize(5),
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "white",
                    }}
                  >
                    <Text key={item} style={{ color: "white" }}>
                      {item}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={{ paddingTop: normalize.setNormalize(20) }}></View>
        )}
      </>
    );
  };

  const GraphButtons = () => {
    return (
      <>
        <View style={stockDisplayStyles.allGraphButtonsContainer}>
          <TouchableOpacity
            onPress={() => {
              handleColor(0);
              if (dayData.length > 0) {
                setGraphData(dayData);
              } else {
                getOtherGraphData(0);
              }
            }}
            style={[
              stockDisplayStyles.buttonContainer,
              { backgroundColor: color[0] },
            ]}
          >
            <Text
              style={[stockDisplayStyles.buttonText, { color: textColor[0] }]}
            >
              1D
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleColor(1);
              if (weekData.length > 0) {
                setGraphData(weekData);
              } else {
                getOtherGraphData(1);
              }
            }}
            style={[
              stockDisplayStyles.buttonContainer,
              { backgroundColor: color[1] },
            ]}
          >
            <Text
              style={[stockDisplayStyles.buttonText, { color: textColor[1] }]}
            >
              1W
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleColor(2);

              if (monthData.length > 0) {
                setGraphData(monthData);
              } else {
                getOtherGraphData(2);
              }
            }}
            style={[
              stockDisplayStyles.buttonContainer,
              { backgroundColor: color[2] },
            ]}
          >
            <Text
              style={[stockDisplayStyles.buttonText, { color: textColor[2] }]}
            >
              1M
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleColor(3);

              if (yearData.length > 0) {
                setGraphData(yearData);
              } else {
                getOtherGraphData(3);
              }
            }}
            style={[
              stockDisplayStyles.buttonContainer,
              { backgroundColor: color[3] },
            ]}
          >
            <Text
              style={[stockDisplayStyles.buttonText, { color: textColor[3] }]}
            >
              1Y
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  //While the rest of the data is loading display activity indicator
  if (render) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Constants.THEME_COLOR.blue} />
      </View>
    );
  }
  return (
    //Container for page
    <View style={stockDisplayStyles.pageContainer}>
      {/*
            Allows page to scroll
            */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <Nav />

        <Header />

        <Graph />

        <View style={stockDisplayStyles.restOfPageContainer}>
          <GraphButtons />

          <Tags />

          <Info />

          <News />
        </View>
      </ScrollView>
    </View>
  );
}

const stockDisplayStyles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    flex: 1,
    marginTop: normalize.setNormalize(60),
  },

  headerContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // paddingLeft: normalize.setNormalize(10),
    // paddingTop: normalize.setNormalize(10)
  },

  titleScoreContainer: {
    width: "100%",
    // paddingLeft: normalize.setNormalize(16),
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    paddingBottom: normalize.setNormalize(16),
  },

  tableText: {
    fontSize: normalize.setNormalize(13),
    color: "gray",
    paddingVertical: normalize.setNormalize(10),
  },

  buttonContainer: {
    height: normalize.setNormalize(30),
    width: normalize.setNormalize(60),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
  },

  buttonText: {
    color: "white",
    fontSize: normalize.setNormalize(13),
  },

  title: {
    color: "white",
    fontSize: 20,
    paddingBottom: normalize.setNormalize(20),
  },

  descriptionContainer: {
    width: "100%",
    backgroundColor: "#3B3939",
    borderRadius: normalize.setNormalize(10),
    flex: 1,
    padding: normalize.setNormalize(15),
  },

  infoDataContainer: {
    paddingBottom: normalize.setNormalize(5),
  },

  restOfPageContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: normalize.setNormalize(10),
  },

  allGraphButtonsContainer: {
    width: "100%",
    height: normalize.setNormalize(50),
    paddingTop: normalize.setNormalize(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  borderLine: {
    width: "100%",
    borderWidth: normalize.setNormalize(1),
    borderColor: "white",
    opacity: 0.1,
  },
});

export default StockDisplay;
