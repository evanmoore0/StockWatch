import React from "react";
import renderer from 'react-test-renderer'

import Graphic from "../../globalComponents/graphic";

jest.useFakeTimers();

describe('<Graphic/>', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Graphic/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
