import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import '../../Styles/DoubleSlider.css'

import {
  decrement, increment, incrementByAmount,
  selectDoubleSlider,
  changeMaxEdge, changeMinEdge, 
  changeMaxThreshold, changeMinThreshold
} from './DoubleSliderSlice';

import {
  // decrement, increment, 
  selectFilterMenu,
  incrementByAmountMenu,
  changeMaxEdgeMenu, changeMinEdgeMenu, 
  changeMaxThresholdMenu, changeMinThresholdMenu
} from '../FilterMenu/FilterMenuSlice';



const Input = styled.input` border-radius: 6px; min: '0' max: '100' -webkit-appearance: none; -moz-appearance: none; `;

interface Props {
  // numAttr?: number, // value?: number, // valSelecMin?: number | null, // valSelecMax?: number | null, // min?: number, // max?: number, // attrName?:string, // onChange?: (e: any) => void
  step?: number,
  valueName?:string
}

const DoubleSlider: React.FC<Props> = (props) => {
  // const [incrementAmount, setIncrementAmount] = useState('2'); // console.log({dlSliderAttr}) // Called all the time you interact with the sliders
  const [doubleSliderStep, setDoubleSliderStep] = useState( (props.step)?props.step:1 );
  const dlSliderAttr = useAppSelector(selectDoubleSlider);
  const dispatch = useAppDispatch();

  const filterMenuAttr = useAppSelector(selectFilterMenu);
  const valueName = props.valueName;

  // TODO index needs to adapt according to valueName provided
  const indexName = (valueName==='voluptate')?0:(valueName==='aliquip')?1:(valueName==='consectetur')?2:(valueName==='laboris')?3:-1;

  console.log({valueName,indexName})
  
  return (
    <>
      {/* <Input type="range" value={doubleSliderVal} onChange={e => doubleSliderSet(parseInt(e.target.value))} /> <div id="DoubleSliderInfo">The value selected is {doubleSliderVal}</div> */}
      <div className="wrapper">
          minEdge (reducer): {filterMenuAttr.minEdge[indexName]} | maxEdge (reducer): {filterMenuAttr.maxEdge[indexName]} <br/>
        {/* <button className='button randomize' aria-label="Randomize name" onClick={() => dispatch(randomize())}>Randomize</button> */}
        <div className = "attrIndic">{valueName}</div>
        <br/>
        <div className="slider">
          <div className="progress"></div>
        </div>
        <div className="range-input">
          <Input type="range" className="range-min" min={String(filterMenuAttr.minEdge[indexName])} max={String(filterMenuAttr.maxEdge[indexName])} step={String(doubleSliderStep)}
            value={filterMenuAttr.minThreshold[indexName]}
            onChange={e => 
              // setDoubleSliderMin(Math.min(maxEdge, parseInt(e.target.value)))
              dispatch(changeMinThresholdMenu([parseInt(e.target.value), (valueName)?valueName:''] ))
            }
          />
          <Input type="range" className="range-max" min={String(filterMenuAttr.minEdge[indexName])} max={String(filterMenuAttr.maxEdge[indexName])} step={String(doubleSliderStep)}
            value={filterMenuAttr.maxThreshold[indexName]}
            onChange={e => 
              // setDoubleSliderMax(Math.max(minEdge, parseInt(e.target.value)))
              dispatch(changeMaxThresholdMenu([parseInt(e.target.value), (valueName)?valueName:''] ))
            }
            // onMouseUp={e => console.log("mouse going up, with e: ",e.target.value)} // works, but I suppose wouldn't work with phone applications... I would prefer to avoid using this.
          />
        </div>
        <br/>
        <div className="communicateSlider">
          The double slider selection is {filterMenuAttr.minThreshold[indexName]} and {filterMenuAttr.maxThreshold[indexName]}.
        </div>

      </div>
    </>
  );

}

export default DoubleSlider;