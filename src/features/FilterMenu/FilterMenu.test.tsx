import {describe, jest, expect, test} from '@jest/globals';
import { Patient } from '../../interface/Patient';
import dataGenerated from '../../../data/generated.json'
const patients = dataGenerated as Patient[];

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
import { Mouse } from '@material-ui/icons';

import ReactTestUtils from 'react-dom/test-utils'; // ES6
import React from 'react';
import App from '../../../App';

// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { selectFilterMenu } from './FilterMenuSlice';

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

  
    // ! Can't use useAppSelector or useAppDispatch, it breaks the rules of hooks.
    // const filterMenuAttr = useAppSelector(selectFilterMenu);
    // const dispatch = useAppDispatch();
    // const testsNames = filterMenuAttr.patients[0].medTests.map(mt => mt.testName);
    const testsNames = ['voluptate', 'aliquip', 'consectetur','laboris'];
    
    for(let i in testsNames){
        expect(screen.getByTestId('min_range_test_'+testsNames[i])).toBeDefined();
        expect(screen.getByTestId('max_range_test_'+testsNames[i])).toBeDefined();
    }
})



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

  
    // ! Can't use useAppSelector or useAppDispatch, it breaks the rules of hooks.
    // const filterMenuAttr = useAppSelector(selectFilterMenu);
    // const dispatch = useAppDispatch();
    // const testsNames = filterMenuAttr.patients[0].medTests.map(mt => mt.testName);
    expect(screen.getByTestId('min_range_test_voluptate')).toBeDefined();
    expect(screen.getByTestId('max_range_test_voluptate')).toBeDefined();

    // TODO how to interact with the range buttons?
    // https://testing-library.com/docs/dom-testing-library/api-events/
    // fireEvent.change(screen.getByTestId('max_range_test_voluptate'), {target: {value: 0}} )
    // console.log(screen.getByTestId('max_range_test_voluptate') );

    const inputsRangeMin = document.getElementsByClassName('range-min');

    console.log(inputsRangeMin);
    console.log(inputsRangeMin.length);
    console.log(inputsRangeMin[0])
    console.log(inputsRangeMin[0].value);

    const item3 : HTMLElement = screen.getByTestId('item3');

    const handle: HTMLElement = screen.getByText('Howe Long');
    console.log("item3: ",item3);
    // console.log(Mouse.x)
    const initialVal = parseInt(inputsRangeMin[0].value);
    console.log("initialVal: ",initialVal)
    fireEvent.mouseDown(screen.getByTestId('min_range_test_voluptate'));
    
    fireEvent.mouseMove(item3, { clientX: 100, clientY: 100 });

    // userEvent.keyboard('[ControlLeft>]');
    fireEvent.mouseUp(screen.getByTestId('min_range_test_voluptate'));


    const nextVal = parseInt(inputsRangeMin[0].value);

    console.log("nextVal: ",nextVal)

})

