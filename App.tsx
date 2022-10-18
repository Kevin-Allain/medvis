import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import styled from 'styled-components';

import './src/Styles/App.css'
import LineChart from './src/features/LineChart/LineChart';
// import Slider from './src/Disregarded/Slider';
import DoubleSlider from './src/features/DoubleSlider/DoubleSlider';

import dataGenerated from './data/generated.json'
import {Patient} from './src/interface/Patient'

const patients = dataGenerated as Patient[];


export default function App() {
  const [personIndex, setPersonIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [valueSlider, setValueSlider] = useState(3);
  const [attrList, setattrList] = useState((dataGenerated) ? Object.keys(dataGenerated[0]) : []);
  console.log("In the App");

  // useless for now...?
  useEffect(() => { document.title = `You clicked ${count} times`; }, [count]);

  console.log(dataGenerated);
  console.log(attrList);
  const lastPersonIndex: number = (dataGenerated.length - 1) | 0;
  console.log({ valueSlider })
  console.log({patients})

  return <>
  <Provider store={store}>
    <div className="App">
      <div className="grid-container">
        <div className="item1">
          <p className="font-large">
            Header
          </p>
        </div>
        <div className="item2">
          <h3>Menu</h3>
          <DoubleSlider />
        </div>
        <div className="item3">Main
          <div id="lineCharts">
            <LineChart
              options={undefined}
              numLongitunal={0}
              numLines={lastPersonIndex}
              labels={['1', '2', 3, '4', '5']}
              patients={patients}
              ></LineChart>
          </div>
        </div>
        <div className="item4">Right
          <div id="lineCharts2">
            <LineChart
              options={undefined}
              numLongitunal={0}
              numLines={0}
              labels={['a', 42, 11]}></LineChart>
          </div>
        </div>
        <div className="item5">
          Footer
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      </div>
    </div>
  </Provider>
  </>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
