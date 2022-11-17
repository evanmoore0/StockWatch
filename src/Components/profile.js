// Card profile component that displays the users name, email, and profile picture. The profile picture is a clickable button that allows the user to change their profile picture. The component also has a button that allows the user to sign out of their account. The component is used in the Profile screen.

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Card, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";
import "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ProfileCard = (props) => {
    return(
        <Card>
            <Card.Title>{props.name}</Card.Title>
            <Card.Divider/>
            <View style={styles.viewStyle}>
                <Image
                    style={styles.imageStyle}
                    source={{uri: props.avatar}}
                />
                <Text style={styles.textStyle}>{props.email}</Text>
            </View>
            <Card.Divider/>
            <Button
                type="outline"
                title="Sign Out"
                onPress={function(){
                    props.logout();
                }}
            />
        </Card>

    )

}

const styles = StyleSheet.create({
    viewStyle: {
        alignItems: "center",
    },
    imageStyle: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    textStyle: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        paddingVertical: 10,
    },
});