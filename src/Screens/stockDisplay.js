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
  SafeAreaView,
} from "react-native";

import {
  VictoryLine,
  createContainer,
  LineSegment,
  VictoryTooltip,
  VictoryScatter,
  VictoryLabel,
} from "victory-native";

import config from "../utils/Config/envConfig";

import * as WebBrowser from "expo-web-browser";

import normalize from "../utils/Style/normalize";

import { Ionicons } from "@expo/vector-icons";

import { db } from "../utils/Config/firebase-config";

import Constants from "../utils/Constants";

import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useStockData } from "../utils/hooks/checkStockData";

import moment from "moment";

function StockDisplay(props) {
  const { stockData, setStockData } = useStockData();

  const [render, setRender] = useState(true);
  const [numLines, setNumLines] = useState(5);
  const [colorIndex, setColorIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [infoData, setInfoData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [open, setOpen] = useState(0);
  const [percentChange, setPercentChange] = useState("0");
  const [score, setPropsScore] = useState(0);
  const [websiteURL, setWebsiteURL] = useState("");

  const [graphData, setGraphData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [dayData, setDayData] = useState([]);

  const Container = createContainer("voronoi", "cursor");

  const addButton = () => {
    if (!stockData.includes(props.route.params.stock.ticker)) {
      return (
        <TouchableOpacity
          style={stockDisplayStyles.addButtonContainer}
          onPress={() => {
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
            size={normalize.setNormalize(44)}
            color="white"
          />
        </TouchableOpacity>
      );
    } else {
      return <></>;
    }
  };

  const infoDataDisplay = (label, index) => {
    return (
      <View style={stockDisplayStyles.infoDataContainer}>
        <Text style={stockDisplayStyles.tableText}>{label + ":"}</Text>

        {label === "Website" ? (
          <TouchableOpacity
            onPress={() => {
              try {
                WebBrowser.openBrowserAsync(websiteURL);
              } catch {
                alert("Couldn't open website :(");
              }
            }}
          >
            <Text style={stockDisplayStyles.websiteLink}>
              {props.route.params.stock.sName}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={stockDisplayStyles.infoText} numberOfLines={1}>
            {infoData[index] ? infoData[index] : "No Data"}
          </Text>
        )}
      </View>
    );
  };

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

  const getData = async () => {
    let tempData = [];

    try {
      await fetch(
        `${config.POLYGON_API_LINK}v1/meta/symbols/${props.route.params.stock.ticker}/company?apiKey=${config.POLYGON_API_KEY}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(async function (data) {
          //Use one hook to store all data

          let temp = {};

          await fetch(
            `${config.POLYGON_API_LINK}v3/reference/tickers/${props.route.params.stock.ticker}?apiKey=${config.POLYGON_API_KEY}`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              temp = data.results;
              setWebsiteURL(temp.homepage_url);
            });

          let marketcap =
            Math.abs(temp.market_cap) >= 1.0e12
              ? (Math.abs(temp.market_cap) / 1.0e12).toFixed(2) + "T"
              : Math.abs(temp.market_cap) >= 1.0e9
              ? (Math.abs(temp.market_cap) / 1.0e9).toFixed(2) + "B"
              : Math.abs(temp.market_cap) >= 1.0e6
              ? (Math.abs(temp.market_cap) / 1.0e6).toFixed(2) + "M"
              : Math.abs(temp.market_cap) >= 1.0e3
              ? (Math.abs(temp.market_cap) / 1.0e3).toFixed(2) + "K"
              : Math.abs(temp.market_cap);

          tempData = [
            data?.similar,
            temp.description,
            data?.tags,
            data?.ceo,
            data?.hq_state,
            marketcap,
            data?.sector,
            data?.employees,
            data?.url,
            data?.exchangeSymbol,
            data?.phone,
            data?.listdate,
            data?.industry,
          ];

          setInfoData(tempData);

          setRender(false);
        });
    } catch (error) {
      Alert.alert(
        "Sorry we couldn't get description information for this stock"
      );
      setRender(false);
    }
  };

  const getPercentChange = async () => {
    if (props.route.params.stock.percentChange == undefined) {
      try {
        await fetch(
          `${config.POLYGON_API_LINK}v2/snapshot/locale/us/markets/stocks/tickers/${props.route.params.stock.ticker}?apiKey=${config.POLYGON_API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            setPercentChange(data.ticker.todaysChangePerc.toString());
          });
      } catch (error) {
        setPercentChange("0");
      }
    } else {
      setPercentChange(props.route.params.stock.percentChange);
    }
  };

  const getNews = async () => {
    try {
      await fetch(
        `${config.POLYGON_API_LINK}v2/reference/news?ticker=${props.route.params.stock.ticker}&apiKey=${config.POLYGON_API_KEY}`
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
        `${config.POLYGON_API_LINK}v2/aggs/ticker/${props.route.params.stock.ticker}/range/${multiplier}/${timespan}/${startDate}/${endDate}?adjusted=true&sort=asc&limit=300&apiKey=${config.POLYGON_API_KEY}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.results) {
            setOpen(data.results[0].o);

            for (let date in data.results) {
              tempGraphData.push({
                x: date,
                y: data.results[date].vw,
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
        });
    } catch (error) {
      setOpen(0);
      setGraphData([{ x: 0, y: 0 }]);
    } finally {
      setLoading(false);
    }
  };

  const getOtherGraphData = (i) => {
    let startDate = moment();
    let endDate = moment();

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

      let finalStart = startDate.format("YYYY-MM-DD");
      let finalEnd = endDate.format("YYYY-MM-DD");

      getGraphData(finalStart, finalEnd, "minute", "1", "day");
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

      let finalStart = startDate.format("YYYY-MM-DD");
      let finalEnd = endDate.format("YYYY-MM-DD");

      getGraphData(finalStart, finalEnd, "minute", "1", "week");
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

      let finalStart = startDate.format("YYYY-MM-DD");
      let finalEnd = endDate.format("YYYY-MM-DD");

      getGraphData(finalStart, finalEnd, "day", "1", "month");
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

      let finalStart = startDate.format("YYYY-MM-DD");
      let finalEnd = endDate.format("YYYY-MM-DD");

      getGraphData(finalStart, finalEnd, "week", "1", "year");
    }
  };

  useEffect(() => {
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
        <TouchableOpacity
          style={stockDisplayStyles.backButtonContainer}
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={normalize.setNormalize(30)}
            color="white"
          />

          <Text style={stockDisplayStyles.backButtonTickerText}>
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
        <Text style={stockDisplayStyles.sName}>
          {props.route.params.stock.sName}
        </Text>

        <Text style={stockDisplayStyles.scoreText}>{"Score: " + score}</Text>
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

  const Graph = () => {
    if (loading) {
      return (
        <View style={stockDisplayStyles.graphContainer}>
             <VictoryScatter
            domain={[-10, 10]}
            data={[{ x: 0, y: 0 }]}
            labels={() => ["Loading..."]}
            style={{
              data: { fill: "black" },
            }}
            labelComponent={
              <VictoryLabel
                inline
                style={[
                  {
                    fill: "#4C4E52",
                    fontWeight: "900",
                    fontSize: normalize.setNormalize(30),
                    fontFamily:"Arial"                     
                  },
                ]}
              />
            }
          />
        </View>
      );
    }


    if (!graphData) {
      return (
        <View style={stockDisplayStyles.graphContainer}>
          <VictoryScatter
            domain={[-10, 10]}
            data={[{ x: 0, y: 0 }]}
            labels={() => ["No Data"]}
            style={{
              data: { fill: "black" },
            }}
            labelComponent={
              <VictoryLabel
                inline
                style={[
                  {
                    fill: "#4C4E52",
                    fontWeight: "900",
                    fontSize: normalize.setNormalize(30),
                    fontFamily:"Arial"                     
                  },
                ]}
              />
            }
          />
        </View>
      );
    }
    return (
      //Graph
      <View style={stockDisplayStyles.graphContainer}>
        <VictoryLine
          data={graphData}
          padding={{
            top: normalize.setNormalize(60),
            bottom: normalize.setNormalize(40),
            left: normalize.setNormalize(10),
            right: normalize.setNormalize(10),
          }}
          style={{
            data: { stroke: Constants.THEME_COLOR.green, strokeWidth: 2 },
          }}
          containerComponent={
            <Container
              cursorComponent={
                <LineSegment style={{ stroke: "white", strokeWidth: 1.5 }} />
              }
              labels={(point) =>
                `% ${
                  Math.round(((point.datum.y - open) / open) * 100 * 100) / 100
                }\n$${point.datum.y.toFixed(2)}`
              }
              cursorDimension="x"
              voronoiDimension="x"
              labelComponent={
                <VictoryTooltip
                  style={{
                    fill: ({ datum }) =>
                      datum.y - open > 0
                        ? Constants.THEME_COLOR.green
                        : Constants.THEME_COLOR.blue,
                    fontSize: normalize.setNormalize(14),
                    fontWeight: "600",
                  }}
                  flyoutStyle={{ fill: "black", strokeWidth: 0 }}
                  center={{
                    x: normalize.setNormalize(30),
                    y: normalize.setNormalize(20),
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
        <View style={stockDisplayStyles.borderLine}></View>

        <Text style={stockDisplayStyles.title}>News</Text>
        {newsData.map((news) => (
          <TouchableOpacity
            style={stockDisplayStyles.newsContainer}
            key={news.id}
            onPress={() => {
              try {
                WebBrowser.openBrowserAsync(news.article_url);
              } catch (error) {
                Alert.alert("Sorry we could not open up this news link");
              }
            }}
          >
            <View style={stockDisplayStyles.newsHeader}>
              <Text style={stockDisplayStyles.newsTitle}>
                {news.publisher.name}
              </Text>

              <Text style={stockDisplayStyles.newsPublished}>
                {HandleNewsDate(news.published_utc)}
              </Text>
            </View>

            <Text style={stockDisplayStyles.newsSubtitle}>{news.title}</Text>

            <Image
              style={stockDisplayStyles.newsImage}
              source={{
                uri: news.image_url,
              }}
            />

            <Text numberOfLines={3} style={stockDisplayStyles.newsDescription}>
              {news.description}
            </Text>

            <View style={stockDisplayStyles.newsDivider}></View>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  const Info = () => {
    if (render) {
      return (
        <View
          style={{
            height: normalize.setNormalize(300),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
    return (
      <>
        <View style={stockDisplayStyles.tagBorderLine}></View>

        <Text style={stockDisplayStyles.title}>
          {"About " + props.route.params.stock.sName}
        </Text>

        {infoData[1] ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => (numLines == 5 ? setNumLines(100) : setNumLines(5))}
            style={stockDisplayStyles.descriptionContainer}
          >
            <Text
              numberOfLines={numLines}
              style={{ color: "white", fontSize: normalize.setNormalize(14) }}
            >
              {infoData[1]}
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <View style={stockDisplayStyles.infoContainer}>
          <View style={stockDisplayStyles.infoColumn}>
            {infoDataDisplay("CEO", 3)}
            {infoDataDisplay("Employees", 7)}
            {infoDataDisplay("Headquarters", 4)}
          </View>

          <View style={stockDisplayStyles.infoColumn}>
            {infoDataDisplay("Market Cap", 5)}
            {infoDataDisplay("Industry", 12)}
            {infoDataDisplay("Website", 6)}
          </View>

          <View style={stockDisplayStyles.infoColumn}>
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
            <View style={stockDisplayStyles.tagBorderLine}></View>
            <View style={stockDisplayStyles.tagContainer}>
              {infoData[2].map((item) => (
                <View style={stockDisplayStyles.tag} key={item}>
                  <Text style={stockDisplayStyles.tagText}>{item}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={stockDisplayStyles.noTags}></View>
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
              setColorIndex(0);

              if (dayData.length > 0) {
                setOpen(dayData[0].y);
                setGraphData(dayData);
              } else {
                getOtherGraphData(0);
              }
            }}
            style={[
              stockDisplayStyles.buttonContainer,
              {
                backgroundColor:
                  colorIndex == 0 ? Constants.THEME_COLOR.green : "black",
              },
            ]}
          >
            <Text
              style={[
                stockDisplayStyles.buttonText,
                {
                  color:
                    colorIndex == 0 ? "white" : Constants.THEME_COLOR.green,
                },
              ]}
            >
              1D
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setColorIndex(1);

              if (weekData.length > 0) {
                setOpen(weekData[0].y);
                setGraphData(weekData);
              } else {
                getOtherGraphData(1);
              }
            }}
            style={[
              stockDisplayStyles.buttonContainer,
              {
                backgroundColor:
                  colorIndex == 1 ? Constants.THEME_COLOR.green : "black",
              },
            ]}
          >
            <Text
              style={[
                stockDisplayStyles.buttonText,
                {
                  color:
                    colorIndex == 1 ? "white" : Constants.THEME_COLOR.green,
                },
              ]}
            >
              1W
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setColorIndex(2);

              if (monthData.length > 0) {
                setOpen(monthData[0].y);
                setGraphData(monthData);
              } else {
                getOtherGraphData(2);
              }
            }}
            style={[
              stockDisplayStyles.buttonContainer,
              {
                backgroundColor:
                  colorIndex == 2 ? Constants.THEME_COLOR.green : "black",
              },
            ]}
          >
            <Text
              style={[
                stockDisplayStyles.buttonText,
                {
                  color:
                    colorIndex == 2 ? "white" : Constants.THEME_COLOR.green,
                },
              ]}
            >
              1M
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setColorIndex(3);

              if (yearData.length > 0) {
                setOpen(yearData[0].y);
                setGraphData(yearData);
              } else {
                getOtherGraphData(3);
              }
            }}
            style={[
              stockDisplayStyles.buttonContainer,
              {
                backgroundColor:
                  colorIndex == 3 ? Constants.THEME_COLOR.green : "black",
              },
            ]}
          >
            <Text
              style={[
                stockDisplayStyles.buttonText,
                {
                  color:
                    colorIndex == 3 ? "white" : Constants.THEME_COLOR.green,
                },
              ]}
            >
              1Y
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  // if (render) {
  //   return (
  //     <SafeAreaView style={stockDisplayStyles.pageContainer}>
  //       <ActivityIndicator size="large" color={Constants.THEME_COLOR.blue} />
  //     </SafeAreaView>
  //   );
  // }
  return (
    <SafeAreaView style={stockDisplayStyles.pageContainer}>
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
    </SafeAreaView>
  );
}

const stockDisplayStyles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    flex: 1,
  },

  headerContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  titleScoreContainer: {
    width: "100%",
    paddingLeft: normalize.setNormalize(16),
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    paddingBottom: normalize.setNormalize(16),
  },

  tableText: {
    fontSize: normalize.setNormalize(16),
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
    fontSize: normalize.setNormalize(16),
  },

  title: {
    color: "white",
    fontSize: normalize.setNormalize(18),
    marginVertical: normalize.setNormalize(20),
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
    marginVertical: normalize.setNormalize(30),
  },

  tagBorderLine: {
    width: "100%",
    borderWidth: normalize.setNormalize(1),
    borderColor: "white",
    opacity: 0.1,
    marginVertical: normalize.setNormalize(10),
  },

  addButtonContainer: {
    paddingRight: normalize.setNormalize(16),
  },

  infoText: {
    color: "white",
    fontSize: normalize.setNormalize(14),
  },

  websiteLink: {
    color: "white",
    fontSize: normalize.setNormalize(14),
    textDecorationLine: "underline",
  },
  backButtonContainer: { flexDirection: "row", alignItems: "center" },
  backButtonTickerText: {
    fontSize: normalize.setNormalize(20),
    fontWeight: Constants.STOCK_NAME_FONT.weight,
    color: "gray",
  },
  scoreText: {
    color: Constants.THEME_COLOR.blue,
    fontWeight: "bold",
    fontSize: normalize.setNormalize(16),
  },

  sName: {
    fontSize: normalize.setNormalize(35),
    color: "white",
  },

  graphContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  newsContainer: {
    paddingHorizontal: normalize.setNormalize(20),
    marginBottom: normalize.setNormalize(20),
    justifyContent: "space-evenly",
  },

  newsHeader: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: normalize.setNormalize(20),
    justifyContent: "space-between",
  },

  newsTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: normalize.setNormalize(18),
  },

  newsPublished: {
    color: "white",
    fontWeight: "bold",
    fontSize: normalize.setNormalize(16),
  },

  newsSubtitle: {
    color: "white",
    paddingBottom: normalize.setNormalize(15),
    fontSize: normalize.setNormalize(16),
  },

  newsImage: {
    height: normalize.setNormalize(230),
    borderRadius: 10,
  },

  newsDescription: {
    color: "white",
    paddingVertical: normalize.setNormalize(15),
    fontSize: normalize.setNormalize(14),
  },

  newsDivider: {
    backgroundColor: "white",
    width: "100%",
    height: 0.5,
    top: normalize.setNormalize(20),
    opacity: 0.3,
  },

  infoContainer: {
    flexDirection: "row",
    width: "100%",
    paddingTop: normalize.setNormalize(20),
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoColumn: { width: "33%" },

  tagContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
  },

  tag: {
    borderRadius: 30,
    backgroundColor: "#3B3939",
    paddingHorizontal: normalize.setNormalize(10),
    paddingVertical: normalize.setNormalize(5),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 5,
    marginVertical: 8,
  },

  tagText: {
    color: "white",
    fontSize: normalize.setNormalize(14),
  },

  noTags: { paddingTop: normalize.setNormalize(20) },
});

export default StockDisplay;
