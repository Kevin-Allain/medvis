import {describe, jest, expect, test} from '@jest/globals';

import { Provider, useDispatch, useSelector } from "react-redux";
import {
    render, 
    fireEvent, 
    screen
} from '@testing-library/react'
import '@testing-library/jest-dom'
import Selection from '../Selection/Selection';
import LineChart from '../LineChart/LineChart';
import { store } from '../../app/store';
import FilterMenu from './FilterMenu';
import userEvent from '@testing-library/user-event';

import React from 'react';
import App from '../../../App';

test('All type range input present', () => {
    const component = render(<Provider store={store}>
        <Selection/>,
        <FilterMenu/>
        <LineChart/>
    </Provider>);
    global.ResizeObserver = () => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    });
    const testsNames = ['voluptate', 'aliquip', 'consectetur','laboris'];
    for(let i in testsNames){
        expect(screen.getByTestId('min_range_test_'+testsNames[i])).toBeDefined();
        expect(screen.getByTestId('max_range_test_'+testsNames[i])).toBeDefined();
    }
});

test('Interaction modifies input value', () => {
    const user = userEvent.setup()
    const component = render(<Provider store={store}>
        <App/>
    </Provider>);

    global.ResizeObserver = () => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    });

    expect(screen.getByTestId('min_range_test_voluptate')).toBeDefined();
    expect(screen.getByTestId('max_range_test_voluptate')).toBeDefined();

    // TODO how to interact with the range buttons?
    /* https://testing-library.com/docs/dom-testing-library/api-events/
    We attempted this approach, to no avail.
    fireEvent.change(screen.getByTestId('max_range_test_voluptate'), {target: {value: 0}} )
    **/
    const inputsRangeMin = document.getElementsByClassName('range-min');

    const item3 : HTMLElement = screen.getByTestId('item3');

    const handle: HTMLElement = screen.getByText('Howe Long');
    console.log("item3: ",item3);
    // console.log(Mouse.x)
    const initialVal = parseInt(inputsRangeMin[0].value);
    console.log("initialVal: ",initialVal)
    fireEvent.mouseDown(screen.getByTestId('min_range_test_voluptate'));    
    fireEvent.mouseMove(item3, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(screen.getByTestId('min_range_test_voluptate'));
    const nextVal = parseInt(inputsRangeMin[0].value);
    console.log("nextVal: ",nextVal)
});

