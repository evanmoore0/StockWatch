
import React from "react";
import renderer from 'react-test-renderer'
import LoginAndRegisterTitle from "../loginAndRegisterTitle";

describe('<LoginAndRegisterTitle/>', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<LoginAndRegisterTitle/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
