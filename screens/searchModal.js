import React, { useState, useEffect } from "react";
import {View,Text, TouchableOpacity, Modal, KeyboardAvoidingView} from 'react-native';

function SearchModal(props) {

    const [visible, setVisible] = useState(false);

    useEffect(()=> {

        setVisible(true)
        console.log("In search modal")
        
    }, [props])



    return(
        <Modal
                visible = {visible}
                transparent = {true}        
                >
                    <KeyboardAvoidingView style={{ height: '86%', marginTop: 'auto'}}>

                    <TouchableOpacity
                    
                    onPress = {()=>{
                        setVisible(false)
                    }}
                    >
                    
                        <Text style={{ color: 'white'}}
            
                        >{props.search}</Text>
                        {/* <TextInput
                        autoFocus = {true}
                        onFocus = {()=> {

                            ref.current.focus()

                        }}
                        /> */}

                    </TouchableOpacity>

                    </KeyboardAvoidingView>


                </Modal>
    )
}

export default SearchModal;