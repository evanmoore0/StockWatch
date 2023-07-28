import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import normalize from "../utils/Style/normalize";
import Constants from "../utils/Constants";

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={InputHeaderStyles.container}>
      <View style={InputHeaderStyles.topContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={normalize.setNormalize(30)}
            color="white"
          />
        </TouchableOpacity>

        <Text style={InputHeaderStyles.title}>{title}</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={normalize.setNormalize(30)}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <MaterialIcons
        name="remove-red-eye"
        color="rgba(82,82,82,0.3)"
        size={normalize.setNormalize(150)}
      />
    </View>
  );
};

const InputHeaderStyles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  titleContainer: {
    display: "flex",
    flexDirection: "column",
  },

  title: {
    color: "white",
    fontFamily: Constants.FONT.family,
    fontSize: normalize.setNormalize(16),
    fontWeight: "900"
  },
});

export default Header;
