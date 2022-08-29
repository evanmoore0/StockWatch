import React, { useEffect } from "react";
import { View } from "react-native";
import { auth } from "../utils/firebase-config";
import Graphic from "../globalComponents/graphic";
import { onAuthStateChanged } from "firebase/auth";

function Loading(props) {
  //Check to see if user is logged in, if so -> stocks screen if not -> welcome screen
  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.navigation.replace("TabStack");
      } else {
        props.navigation.replace("Welcome");
      }
    });
  };

  //Call check user when the component mounts
  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Graphic scale={1} />
    </View>
  );
}

export default Loading;
