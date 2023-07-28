import Layout from "./layout";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";

export default function Email(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function EmailAuth() {

    props.navigation.push("Name", {
        email: email,
        password: password
    })
  };

  return (
    <Layout
    placeholder1 = {"email"}
    keyboardType1 = {"email-address"}
    autoCapitalize1 = {false}
    onChangeText1 = {setEmail}
    route = {"Name"}
    secureTextEntry = {true}
    placeholder2 = {"password"}
    keyboardType2 = {"password"}
    autoCapitalize2 = {false}
    onChangeText2 = {setPassword}
    onRoute = {EmailAuth}
    />
  );
}
