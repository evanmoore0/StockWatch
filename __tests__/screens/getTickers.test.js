import React from "react";
import renderer from 'react-test-renderer'
import Stocks from "../../screens/stocks";


describe('<Welcome/>', () => {
    it('renders correctly',  () => {
        const tree = renderer.create(<Welcome/>).getInstance();
        const tickers = await tree.children()
        console.log(tickers)
        expect(tree).toMatchSnapshot();
    })
})
