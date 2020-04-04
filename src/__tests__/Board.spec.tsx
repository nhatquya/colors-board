import React from 'react'
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Board from '../Board';
import BoardSquare from '../BoardSquare';

jest.mock('../BoardSquare', () => (props: any) => <mock-board-square {...props} />);

describe('Board', () => {
    afterAll(() => {
        jest.resetAllMocks();
    })

    it('should render board squares correctly', () => {
        const root = mount(<Board />);
        expect(toJSON(root)).toMatchSnapshot();
    });

    it('should render 64 squares in total', () => {
        const root = mount(<Board />);
        const boardSquares = root.find(BoardSquare);
        expect(boardSquares.length).toEqual(64);
    });

    it('should swap two squares correctly', () => {
        const root = mount(<Board />);
        const boardSquares = root.find(BoardSquare);
        const mockSourcePostition = {
            x: 0,
            y: 0,
        };
        const mockTargetPosition = {
            x: 1,
            y: 2,
        };
        const sourceColor = boardSquares.at(0).props().color;
        const targetColor = boardSquares.at(10).props().color;
        root.find(BoardSquare).at(10).props().swapSquare(mockSourcePostition, mockTargetPosition);
        root.update();
        expect(root.find(BoardSquare).at(0).props().color).toEqual(targetColor);
        expect(root.find(BoardSquare).at(10).props().color).toEqual(sourceColor);
    });
})