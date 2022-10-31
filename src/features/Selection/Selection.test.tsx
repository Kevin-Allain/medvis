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

// import configureStore from 'redux-mock-store'

import Selection from './Selection';
import SelectionSlice from './SelectionSlice';

// ! SETUP THE SPY ON USESELECTOR / USE DISPATCH
// ! WE DO THIS TO BE ABLE TO CHECK IF THE DISPATCH MOCK GOT CALLED AND HOW MANY TIMES
const reactRedux = { useDispatch, useSelector }
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

const mockedSelection = jest.mock('Selection');
const mockedSelectionSlice = jest.mock('SelectionSlice');

// https://jestjs.io/docs/mock-function-api#typescript-usage
test('testing addSelection', (state) => {
         
})