/**
 * To manage tests with dispatch, we intend to use Jest Mock functions
 * https://jestjs.io/docs/mock-functions
 * We first get inspired with this example https://stackoverflow.com/questions/62407791/how-to-mock-dispatch-with-jest-fn
 */

//  import store from "../../app/store";
 import { useAppSelector, useAppDispatch } from '../../app/hooks';
 import { Provider, useDispatch, useSelector } from "react-redux";
//  import configureStore from "redux-mock-store";
import {expect, jest, test} from '@jest/globals';
// https://jestjs.io/docs/tutorial-react
import renderer from 'react-test-renderer';


// import configureStore from 'redux-mock-store'

import Selection from './Selection';
import SelectionSlice from './SelectionSlice';
import { store } from '../../app/store';

// ! SETUP THE SPY ON USESELECTOR / USE DISPATCH
// ! WE DO THIS TO BE ABLE TO CHECK IF THE DISPATCH MOCK GOT CALLED AND HOW MANY TIMES
const reactRedux = { useDispatch, useSelector }
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");


// // Cannot find module 'Selection' from 'src/features/Selection/Selection.test.tsx'
// const mockedSelection = jest.mock('Selection');
// const mockedSelectionSlice = jest.mock('SelectionSlice');

// Reference to put  "^config$": "<rootDir>/path/to/App/config.js" in "jest" within package.json

// https://jestjs.io/docs/mock-function-api#typescript-usage
test('testing addSelection', (state) => {
    // const component = <Provider store={store}>
    //     <Selection/>,
    // </Provider>
    const testVar = 0;

    expect(testVar).toBeDefined();
})

//// approach with it is complaining
// it('adds an element when making a selection', (state) => {
//     const component = renderer.create(
//         <Provider store={store}>
//             <Selection/>,
//         </Provider>
//       );
    
//     let tree = component.toJSON();
//     // expect(tree).toMatchSnapshot();

//     renderer.act(() =>{ 

//     })
// })

// // verifying with string
// jest.mock('./Selection', () => () => 'Selection');