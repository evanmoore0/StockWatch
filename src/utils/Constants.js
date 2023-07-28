import normalize from "./Style/normalize"

const Constants = {
    THEME_COLOR:{
        green: '#00D62F',
        blue: '#82C8FB',
        light_gray: "rgba(255,255,255, 0.3)"
    },
    STOCK_NAME_FONT: {
        size: normalize.setNormalize(16),
        weight: '800',
        tickerSize: normalize.setNormalize(15),
        tickerColor: 'gray'
    },
    SEARCHBAR: {
        animatedValue: 99,
    },
    FONT: {
        family: "Helvetica",
        splash_header: normalize.setNormalize(40),
        title: normalize.setNormalize(20)
    },
    BORDER_RADIUS: {
        value: normalize.setNormalize(5)
    },

    STOCK: {
        radius: "5%",
        margin: "1%"
    }
}


export default Constants