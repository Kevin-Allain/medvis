import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

import './src/Styles/App.css'
import LineChart from './src/features/LineChart/LineChart';
import Selection from './src/features/Selection/Selection';
import dataGenerated from './data/generated.json'
import FilterMenu from './src/features/FilterMenu/FilterMenu';

export default function App() {
  const [attrList, setattrList] = useState((dataGenerated) ? Object.keys(dataGenerated[0]) : []);

  return <>
  <Provider store={store}>
    <div className="App">
      <div className="grid-container">
        <div className="item2">
          <h3>Menu</h3>
          <div id='selection'>
            <Selection/>
          </div>
          <FilterMenu></FilterMenu>
        </div>
        <div className="item3" data-testid='item3'>
          <div id="lineCharts"> 
            <LineChart></LineChart>
          </div>
        </div>
      </div>
    </div>
  </Provider>
  </>;
}
