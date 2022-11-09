// /**
//  * To manage tests with dispatch, we intend to use Jest Mock functions
//  * https://jestjs.io/docs/mock-functions
//  * We first get inspired with this example https://stackoverflow.com/questions/62407791/how-to-mock-dispatch-with-jest-fn
//  */

import {describe, jest, expect, test} from '@jest/globals';
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
import {
    render, 
    fireEvent, 
    screen
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Selection from './Selection';
import SelectionSlice, { selectSelection } from './SelectionSlice';
import { store } from '../../app/store';
// import configureStore from 'redux-mock-store'
import { configureStore } from '@reduxjs/toolkit'

import { selectFilterMenu } from '../FilterMenu/FilterMenuSlice';
import { selectionSlice } from './SelectionSlice';
import LineChart from '../LineChart/LineChart';


import useResizeObserver from "use-resize-observer";
// ! render is already imported from @testing-library/react. May need to remove this dependency
// ! Officially last support is only React 16... So we should avoid it if possible and try to stick to @react-testing-library
import Enzyme, { shallow, mount } from 'enzyme';
// import Enzyme, { shallow, render, mount } from "enzyme";
import sinon from 'sinon';

// https://redux.js.org/usage/writing-tests#writing-tests

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

// ! Approach with the redefinition of ResizeObserver is not working, and we do not truly understand the issues.
// // JSDom (which is used by jest) does not implement layout/rendering.
// // we create this mock to simply simulate a desktop view with a width of 1000
// function ResizeObserver() {
//   return {
//     width: 1000,
//   };
// }
// jest.doMock('use-resize-observer', () => ResizeObserver);



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

    // different library
    // const component = renderer.create(<Provider store={store}>
    //     <Selection/>,
    // </Provider>);

    // https://testing-library.com/docs/react-testing-library/example-intro
    const component = render(<Provider store={store}>
        <Selection/>,
    </Provider>);

    // toJSON is only for renderer, not for render
    let tree = component.asFragment()
    // console.log(component);
    // console.log(tree);

    const selectionText = screen.getByText('Selection');
    // console.log(selectionText);
    const button = screen.getByText(/Add all patients/i);
    // console.log(button)

    // ! To verify if necessary to put in the package.json.
    // https://stackoverflow.com/questions/71589882/expect-tobeinthedocument-is-not-a-function-after-setting-up

    // const selecSlice = <Provider store={store}>
    //     <SelectionSlice patients={patients} patientsSelection={[]} ></SelectionSlice>
    // </Provider>

    // https://testing-library.com/docs/queries/about/#screen
    expect(screen.getByText(/Selection/i)).toBeDefined();

    expect(component).toBeDefined();
    // expect(tree).toMatchSnapshot();
});



test('testing addition of selection', () => {
    const component = render(<Provider store={store}>
        <Selection/>,
        <LineChart/>
    </Provider>);

    // ! Visual studio code is complaining but the test passes!
    global.ResizeObserver = () => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    });

    // // complaints if using an element based on the jest mock functions...
    // window.ResizeObserver = function () {
    // return {
    //     observe: jest.fn(),
    //     unobserve: jest.fn(),
    //     disconnect: jest.fn(),
    // };
    // };
    // window.ResizeObserver = new ResizeObserver((entried) => { });
      

    // // https://stackoverflow.com/questions/68679993/referenceerror-resizeobserver-is-not-defined
    // jest.mock('use-resize-observer', () => ({
    //     __esModule: true,
    //     default: jest.fn().mockImplementation(() => ({
    //     observe: jest.fn(),
    //     unobserve: jest.fn(),
    //     disconnect: jest.fn(),
    //     })),
    // }));
  
    // jest.mock('use-resize-observer', () => {
    //   return jest.requireActual('use-resize-observer/polyfilled');
    // });

    // // after clicking the 'Fetch user' button, it should now show that it is fetching the user
    // // fireEvent.click(screen.getByRole('button', { name: /Add all patients/i }))

    const buttonAll = screen.getByRole(
        'button', 
        { name: /Add all patients/i }
    )    
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(screen.getByRole(
        'button', 
        { name: /Add all patients/i }
    ))


    // // can't search in the canvas directly...?
    // // expect(screen.getByText(/Patient Howe Long/i)).toBeDefined();

    // // // Unable to find an accessible element with the role "img"
    // // console.log( screen.getAllByRole('img'))

    expect(component).toBeDefined();
});

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