import react from "react"

// const StockList = [

//     {
//         ticker: "MMM",
//         sName: "3M"
//     },

//     {
//         ticker: "AOS",
//         sName: "A. O. Smith"
//     },

//     {
//         ticker: "ABT",
//         sName: "Abbott Laboratories"
//     },

//     {
//         ticker: "AAPL",
//         sName: "Apple"
//     },

//     {
//         ticker: "ABBV",
//         sName: "AbbVie"
//     },

//     {
//         ticker: "ABMD",
//         sName: "Abiomed"
//     },

//     {
//         ticker: "ACN",
//         sName: "Accenture"
//     },

//     {
//         ticker: "ATVI",
//         sName: "Activision Blizzard"
//     },

//     {
//         ticker: "ADM",
//         sName: "ADM"
//     },

//     {
//         ticker: "ADBE",
//         sName: "Adobe"
//     },

//     {
//         ticker: "AAP",
//         sName: "Advance Auto Parts"
//     },

//     {
//         ticker: "AMD",
//         sName: "Advanced Micro Devices"
//     },

//     {
//         ticker: "AES",
//         sName: "AES"
//     },

//     {
//         ticker: "AFL",
//         sName: "Aflac"
//     },

//     {
//         ticker: "A",
//         sName: "Agilent Technologies"
//     },

//     {
//         ticker: "APD",
//         sName: "Air Products & Chemicals"
//     },

//     {
//         ticker: "AKAM",
//         sName: "Akamai Technologies"
//     },

//     {
//         ticker: "ALB",
//         sName: "Albemarle"
//     },

//     {
//         ticker: "ALK",
//         sName: "Alaska Air"
//     },

//     {
//         ticker: "ARE",
//         sName: "Alexandria Real Estate"
//     },

//     {
//         ticker: "ALGN",
//         sName: "Align Technology"
//     },

//     {
//         ticker: "ALLE",
//         sName: "Allegion"
//     },

//     {
//         ticker: "LNT",
//         sName: "Alliant Energy"
//     },

//     {
//         ticker: "ALL",
//         sName: "Allstate"
//     },

//     {
//         ticker: "GOOGL",
//         sName: "Google"
//     },

//     {
//         ticker: "MO",
//         sName: "Altria"
//     },

//     {
//         ticker: "AMZN",
//         sName: "Amazon"
//     },

//     {
//         ticker: "AMCR",
//         sName: "Amcor"
//     },

//     {
//         ticker: "AEE",
//         sName: "Ameren"
//     },

//     {
//         ticker: "AAL",
//         sName: "American Airlines"
//     },

//     {
//         ticker: "AEP",
//         sName: "American Electric Power"
//     },

//     {
//         ticker: "AXP",
//         sName: "American Express"
//     },



//     {
//         ticker: "Home Deopt",
//         sName: "HD"
//     },

//     {
//         ticker: "GOOGL",
//         sName: "Google"
//     },

//     {
//         ticker: "Testa",
//         sName: "TSLA"
//     },

//     {
//         ticker: "NVDA",
//         sName: "Nvidia"
//     },

//     {
//         ticker: "JPMorgan",
//         sName: "JPM"
//     },

var Stocks;
// ]

const StockList = async () => {
    if(Stocks != undefined) {
        console.log("in get stocks")


        const response = await fetch('https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/297344d8dc0a9d86b8d107449c851cc8/constituents_json.json')
        // const bruh = await response.json()
        Stocks = await response.json()


    }
    

    return Stocks
}


export default StockList