import {describe, jest, expect, test} from '@jest/globals';
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
const reactRedux = { useDispatch, useSelector }
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

test('creation', () => {
    const mockDispatch = jest.fn();
    const component = render(<Provider store={store}>
        <Selection/>,
    </Provider>);
    expect(screen.getByText(/Selection/i)).toBeDefined();
    expect(component).toBeDefined();
});

test('no img when setting up program', () => {
    const component = render(<Provider store={store}>
        <Selection/>,
        <LineChart/>
    </Provider>);

    // Visual studio code is complaining but the test passes!
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
    global.ResizeObserver = () => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    });

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
    expect(imgs.length).toBeGreaterThan(0);
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

    fireEvent.click(buttonsAddPatient[2]); // could be any number as long as it is lesser or equal to number of patients.
    let imgs = screen.queryAllByRole('img');
    expect(imgs.length).toBe(1);

    let buttonsRemovePatient = screen.queryAllByRole(
        'button', 
        { name: new RegExp(/Remove/i) }
    );
    expect(buttonsRemovePatient).toBeDefined();
    fireEvent.click(buttonsRemovePatient[1]); // has to be index 1, as the index 0 matches will removal of all patients, and we aim to verify single removal.
    imgs = screen.queryAllByRole('img');    
    expect(imgs.length).toBe(0);
})