// /**
//  * To manage tests with dispatch, we intend to use Jest Mock functions
//  * https://jestjs.io/docs/mock-functions
//  * We first get inspired with this example https://stackoverflow.com/questions/62407791/how-to-mock-dispatch-with-jest-fn
//  */

import {describe, expect, test} from '@jest/globals';
import { Patient } from '../../interface/Patient';
import dataGenerated from '../../../data/generated.json'
const patients = dataGenerated as Patient[];

/**
 * About the set up: we followed the approach suggested for webpacks to ignore certain files, e.g. css
 * More can be read here https://jestjs.io/docs/webpack
 */


//  import store from "../../app/store";
 import { useAppSelector, useAppDispatch } from '../../app/hooks';
 import { Provider, useDispatch, useSelector } from "react-redux";
// https://jestjs.io/docs/tutorial-react
import renderer from 'react-test-renderer';
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'


import Selection from './Selection';
import SelectionSlice, { selectSelection } from './SelectionSlice';
import { store } from '../../app/store';
// import configureStore from 'redux-mock-store'
import { configureStore } from '@reduxjs/toolkit'


import { selectFilterMenu } from '../FilterMenu/FilterMenuSlice';
import { selectionSlice } from './SelectionSlice';


// ! SETUP THE SPY ON USESELECTOR / USE DISPATCH
// ! WE DO THIS TO BE ABLE TO CHECK IF THE DISPATCH MOCK GOT CALLED AND HOW MANY TIMES
const reactRedux = { useDispatch, useSelector }
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");


// ! Cannot find module 'Selection' from 'src/features/Selection/Selection.test.tsx'
// const mockedSelection = jest.mock('Selection');
// const mockedSelectionSlice = jest.mock('SelectionSlice');

// // // Reference to put  "^config$": "<rootDir>/path/to/App/config.js" in "jest" within package.json

// import { configureStore } from '@reduxjs/toolkit/dist/configureStore';



// https://jestjs.io/docs/mock-function-api#typescript-usage
// ! Beware, adding the state makes yarn test not finish and thus crash
test('testing creation', () => {
    // const mockStore = configureStore();
    // const component = renderer.create(<Provider store={store}>
    //     <Selection/>,
    // </Provider>);


    // const selectionAttr = useAppSelector(selectSelection);
    // const dispatch = useAppDispatch();

    const mockDispatch = jest.fn();
    // const mockStore = configureStore();
    
    const component = renderer.create(<Provider store={store}>
        <Selection/>,
    </Provider>);



    let tree = component.toJSON();
    console.log(component);
    console.log(tree);

    // const selecSlice = <Provider store={store}>
    //     <SelectionSlice patients={patients} patientsSelection={[]} ></SelectionSlice>
    // </Provider>

    // https://testing-library.com/docs/queries/about/#screen
    expect(screen.getByText('Selection')).toBeDefined();

    expect(component).toBeDefined();
    expect(tree).toMatchSnapshot();
})

// //// approach with it is complaining
// // it('adds an element when making a selection', (state) => {
// //     const component = renderer.create(
// //         <Provider store={store}>
// //             <Selection/>,
// //         </Provider>
// //       );
    
// //     let tree = component.toJSON();
// //     // expect(tree).toMatchSnapshot();

// //     renderer.act(() =>{ 

// //     })
// // })

// // // verifying with string
// // jest.mock('./Selection', () => () => 'Selection');