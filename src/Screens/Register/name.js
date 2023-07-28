import { useState } from "react";
import Layout from "./layout";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/Config/firebase-config";

import { Alert } from "react-native";


export default function Name(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function onRoute() {
    await createUserWithEmailAndPassword(auth, props.route.params.email, props.route.params.password)
      .catch((error) => {
        Alert.alert(error.message)
        switch (error.code) {
          
          case "auth/email-already-exists":
            Alert.alert("Username already exists");
            break;
          case "auth/invalid-email":
            Alert.alert("Please remove symbols");
            break;
          case "auth/invalid-password":
            Alert.alert("Please input a valid password");
            break;
          case "auth/email-already-in-use":
            Alert.alert("Username is already in use");
            break;
        }
      });
  }

  return (
    <Layout
      placeholder1={"first name"}
      keyboardType1={"default"}
      autoCapitalize1={false}
      onChangeText1={setFirstName}
      secureTextEntry={false}
      placeholder2={"last name"}
      keyboardType2={"default"}
      autoCapitalize2={false}
      onChangeText2={setLastName}
      onRoute = {onRoute}
    />
  );
}
