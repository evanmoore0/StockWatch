import { Alert } from "react-native"

export default async function getStockProfileData() {

    try {
        await fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/AAPL?apiKey=UUZQB9w93b0BibBDZTnR3lY3qnIWV4u1')
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                console.log(data)
            }
        )
    } catch (err) {
        Alert.alert(err)
    }

}