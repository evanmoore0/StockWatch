import React, { Component } from "react";
import {Text, TextInput} from 'react-native'

class RegistrationEntry extends Component{

    setFocus() {
        if(this.props.number == 1) {
            return true
        } else {
            return false
        }
    }

    render() {

        return(
            <TextInput
            autoFocus = {this.setFocus()}
            style={{backgroundColor: 'red', width: '100%'}}
            onSubmitEditing={()=> 
                {this.textInput.focus()}
            }

            ref = {(input)=> {this.textInput = input}}
            
            />
        )

    }
}

export default RegistrationEntry;