// /**
//  * To manage tests with dispatch, we intend to use Jest Mock functions
//  * https://jestjs.io/docs/mock-functions
//  */

import {describe, jest, expect, test} from '@jest/globals';
import { Patient } from '../../interface/Patient';
import dataGenerated from '../../../data/generated.json'
const patients = dataGenerated as Patient[];

/**
 * About the set up: we followed the approach suggested for webpacks to ignore certain files, e.g. css
 * More can be read here https://jestjs.io/docs/webpack
 */
// https://jestjs.io/docs/tutorial-react



import { Provider, useDispatch, useSelector } from "react-redux";
import {
    render, 
    fireEvent, 
    screen
} from '@testing-library/react'
import '@testing-library/jest-dom'
import Selection from './Selection';
import LineChart from '../LineChart/LineChart';
import { store } from '../../app/store';

import useResizeObserver from "use-resize-observer";
// ! render is already imported from @testing-library/react. May need to remove this dependency
// ! Officially last support is only React 16... So we should avoid it if possible and try to stick to @react-testing-library
import Enzyme, { shallow, mount } from 'enzyme';
// import Enzyme, { shallow, render, mount } from "enzyme";
import sinon from 'sinon';
import SelectionSlice, { selectSelection } from './SelectionSlice';
import { configureStore } from '@reduxjs/toolkit'
import { selectFilterMenu } from '../FilterMenu/FilterMenuSlice';
import { selectionSlice } from './SelectionSlice';
 import { useAppSelector, useAppDispatch } from '../../app/hooks';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event'
import FilterMenu from '../FilterMenu/FilterMenu';
// import configureStore from 'redux-mock-store'
//  import store from "../../app/store";

// https://redux.js.org/usage/writing-tests#writing-tests

// ! SETUP THE SPY ON USESELECTOR / USE DISPATCH
// ! WE DO THIS TO BE ABLE TO CHECK IF THE DISPATCH MOCK GOT CALLED AND HOW MANY TIMES
const reactRedux = { useDispatch, useSelector }
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

// ! Cannot find module 'Selection' from 'src/features/Selection/Selection.test.tsx'
// const mockedSelection = jest.mock('Selection');
// const mockedSelectionSlice = jest.mock('SelectionSlice');

// ! Approach with the redefinition of ResizeObserver is not working, and we do not truly understand the issues.
// // JSDom (which is used by jest) does not implement layout/rendering.
// // we create this mock to simply simulate a desktop view with a width of 1000
// function ResizeObserver() { return { width: 1000, };  }
// jest.doMock('use-resize-observer', () => ResizeObserver);


// https://jestjs.io/docs/mock-function-api#typescript-usage
// ! Beware, adding the state makes yarn test not finish and thus crash
test('creation', () => {
    // const mockStore = configureStore();
    // const component = renderer.create(<Provider store={store}> <Selection/>, </Provider>);

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

test('no img when setting up program', () => {
    const component = render(<Provider store={store}>
        <Selection/>,
        <LineChart/>
    </Provider>);

    global.ResizeObserver = () => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    });

    const imgs = screen.queryAllByRole('img');
    expect(imgs.length).toBe(0);
});

test('selection of all patients', () => {
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
    // window.ResizeObserver = function () {  return { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn(), };  };
    // // https://stackoverflow.com/questions/68679993/referenceerror-resizeobserver-is-not-defined
    // jest.mock('use-resize-observer', () => ({ __esModule: true, default: jest.fn().mockImplementation(() => ({ observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn(), })), }));
  
    // jest.mock('use-resize-observer', () => { return jest.requireActual('use-resize-observer/polyfilled');  });

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

    const imgs = screen.getAllByRole('img');
    // console.log(imgs)
    // console.log(imgs.length)

    expect(imgs.length).toBeGreaterThan(0);

    // // can't search in the canvas directly...?
    // // expect(screen.getByText(/Patient Howe Long/i)).toBeDefined();

    // // // Unable to find an accessible element with the role "img"
    // // console.log( screen.getAllByRole('img'))
});

test('selection of all patients and removal of all patients', () => {
    const component = render(<Provider store={store}>
        <Selection/>,
        <LineChart/>
    </Provider>);

    global.ResizeObserver = () => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    });

    const buttonAddAllPatients = screen.getByRole(
        'button', 
        { name: /Add all patients/ }
    );
    expect(buttonAddAllPatients).toBeDefined();
    fireEvent.click(buttonAddAllPatients);
    let imgs = screen.getAllByRole('img');
    expect(imgs.length).toBeGreaterThan(0);

    const buttonRemoveAllPatients = screen.getByRole(
        'button', 
        { name: /Remove all patients/ }
    );
    expect(buttonRemoveAllPatients).toBeDefined();
    fireEvent.click(buttonRemoveAllPatients);
    imgs = screen.queryAllByRole('img');
    expect(imgs.length).toBe(0);
})

test('selection and removal of one patient', () => {
    const component = render(<Provider store={store}>
        <Selection/>,
        <LineChart/>
    </Provider>);

    global.ResizeObserver = () => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    });

    let buttonsAddPatient = screen.queryAllByRole(
        'button',
        { name: new RegExp(/Add/i) }
    );
    expect(buttonsAddPatient).toBeDefined();
    // console.log('------ buttonsAddPatient (length and content) ', buttonsAddPatient.length,'--', buttonsAddPatient);

    fireEvent.click(buttonsAddPatient[2]); // could be any number as long as it is lesser or equal to number of patients.
    let imgs = screen.queryAllByRole('img');
    expect(imgs.length).toBe(1);

    let buttonsRemovePatient = screen.queryAllByRole(
        'button', 
        { name: new RegExp(/Remove/i) }
    );
    expect(buttonsRemovePatient).toBeDefined();
    // console.log('------ buttonsRemovePatient (length and content)', buttonsRemovePatient.length,'--', buttonsRemovePatient);

    fireEvent.click(buttonsRemovePatient[1]); // has to be index 1, as the index 0 matches will removal of all patients, and we aim to verify single removal.
    imgs = screen.queryAllByRole('img');    
    expect(imgs.length).toBe(0);
})


test('exploring get with screen', () => {

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


    // TODO get the names of attributes according to global variables
    expect(screen.getByTestId('max_range_test_voluptate')).toBeDefined();

    // TODO how to interact with the range buttons?
    // https://testing-library.com/docs/dom-testing-library/api-events/
    fireEvent.change(screen.getByTestId('max_range_test_voluptate'), {target: {value: 0}} )
    console.log(screen.getByTestId('max_range_test_voluptate') );
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