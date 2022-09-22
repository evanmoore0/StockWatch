import React, { useEffect } from "react";
import { View} from "react-native";
import { auth } from "../utils/Config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import { MaterialIcons } from "@expo/vector-icons";
import normalize from "../utils/Style/normalize";
import GlobalStyles from "../utils/Style/globalStyles";
import * as SplashScreen from 'expo-splash-screen';



SplashScreen.preventAutoHideAsync();

function Loading(props) {

  async function initApp() {
    checkUserStatus()
    await new Promise(resolve => setTimeout(resolve, 1000))
    SplashScreen.hideAsync()
  }
  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.navigation.replace("TabStack");
      } else {
        props.navigation.replace("Welcome");
      }
    });
  };

  useEffect(() => {

    initApp()

  }, []);

  return (
    <View style={GlobalStyles.fullPageCenterAlign}>
      <MaterialIcons
        name="remove-red-eye"
        color="rgba(82,82,82,0.3)"
        size={normalize.setNormalize(300)}
      />
    </View>
  );
}

export default Loading;
