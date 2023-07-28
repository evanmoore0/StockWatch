

import {

    View,
    TouchableOpacity,
    Text,
    StyleSheet

} from 'react-native'
import Constants from '../../utils/Constants';

import normalize from '../../utils/Style/normalize';

const KYCButton = ({text, onPress}) => {

    return (
        <View style={KYCButtonStyles.container}>
            <TouchableOpacity
            style= {KYCButtonStyles.buttonContainer}
            onPress = {() => onPress()}
            >
                <Text style={KYCButtonStyles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );

}

const KYCButtonStyles = StyleSheet.create({

    text: {
        fontSize: normalize.setNormalize(20),
        fontWeight: "900",
        color: "black",
        fontFamily: Constants.FONT.family,
        

    },

    buttonContainer: {
        width: normalize.setNormalize(200),
        height: normalize.setNormalize(60),
        marginTop: normalize.setNormalize(20),
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: normalize.setNormalize(20),

        backgroundColor: Constants.THEME_COLOR.green,
    },

    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    }

})

export default KYCButton