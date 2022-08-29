import { createContext, useState } from "react";
import { useContext } from "react";


const StockDataContext = createContext()


function StockDataProvider({children}) {

    const [stockData, setStockData] = useState()

    value = {stockData, setStockData}


    return(
        <StockDataContext.Provider
        value={value}
        >

            {children}
        </StockDataContext.Provider>
    )
}


const useStockData = () => useContext(StockDataContext)

export {StockDataProvider, useStockData}