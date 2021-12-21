
import React from "react";
import renderer from 'react-test-renderer'
import GraphicBar from '../graphicBar'


jest.useFakeTimers();


describe('<GraphicBar/>', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<GraphicBar/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
