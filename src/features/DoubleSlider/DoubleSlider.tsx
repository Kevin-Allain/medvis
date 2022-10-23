import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import '../../Styles/DoubleSlider.css'

import {
  decrement, increment, incrementByAmount,
  randomize, selectDoubleSlider,
} from './DoubleSliderSlice';

const Input = styled.input` border-radius: 6px; min: '0' max: '100' -webkit-appearance: none; -moz-appearance: none; `;

interface Props {
  numAttr?: number,
  value?: number,
  valSelecMin?: number | null,
  valSelecMax?: number | null,
  step?: number,
  min?: number,
  max?: number,
  attrName?:string,
  onChange?: (e: any) => void
}

const DoubleSlider: React.FC<Props> = (props) => {
  const [doubleSliderMin, setDoubleSliderMin] = useState( (props.valSelecMin)?props.valSelecMin:0 );
  const [doubleSliderMax, setDoubleSliderMax] = useState( (props.valSelecMax)?props.valSelecMax:1000 );
  const [doubleSliderStep, setDoubleSliderStep] = useState( (props.valSelecMax)?props.valSelecMax:1 );
  const [numAttr, setNumAttr] = useState( (props.valSelecMin)?props.valSelecMin:0 );
  const minEdge:number = (props.min)?props.min:0;
  const maxEdge:number = (props.max)?props.max:1000;

  const dlSliderAttr = useAppSelector(selectDoubleSlider);
  const dispatch = useAppDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2'); // console.log({dlSliderAttr}) // Called all the time you interact with the sliders

  return (
    <>
      {/* <Input type="range" value={doubleSliderVal} onChange={e => doubleSliderSet(parseInt(e.target.value))} /> <div id="DoubleSliderInfo">The value selected is {doubleSliderVal}</div> */}
      <div className="wrapper">
        Value Range: Use slider or enter min and max value
        <br/>The values with reducer are minEdge: 
          {minEdge}, maxEdge: {maxEdge} and 
          attrName: {dlSliderAttr.attrName}. 
          minEdge: {dlSliderAttr.minEdge} <br/>
          Attribute here is: {dlSliderAttr.valueName}
          <br/>
        <button
          className='button randomize'
          aria-label="Randomize name"
          onClick={() => dispatch(randomize())}>Randomize</button>
        <br/><br/>
        <div className = "attrIndic">medTestA<hr/></div>
        <div className="slider">
          <div className="progress"></div>
        </div>
        <div className="range-input">
          <Input type="range" className="range-min" min={String(minEdge)} max={String(maxEdge)} step={String(doubleSliderStep)}
            value={doubleSliderMin}
            onChange={e => 
              setDoubleSliderMin(Math.min(maxEdge, parseInt(e.target.value)))
            }
          />
          <Input type="range" className="range-max" min={String(minEdge)} max={String(maxEdge)} step={String(doubleSliderStep)}
            value={doubleSliderMax}
            onChange={e => 
              setDoubleSliderMax(Math.max(minEdge, parseInt(e.target.value)))
            }
            // onMouseUp={e => console.log("mouse going up, with e: ",e.target.value)} // works, but I suppose wouldn't work with phone applications... I would prefer to avoid using this.
          />
        </div>
        <br/>
        <div className="communicateSlider">
          The double slider selection is {doubleSliderMin} and {doubleSliderMax}.
        </div>

      </div>
    </>
  );

}

export default DoubleSlider;