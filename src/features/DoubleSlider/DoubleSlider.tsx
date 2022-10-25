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

  return (
    <>
      {/* <Input type="range" value={doubleSliderVal} onChange={e => doubleSliderSet(parseInt(e.target.value))} /> <div id="DoubleSliderInfo">The value selected is {doubleSliderVal}</div> */}
      <div className="wrapper">
        {/* minEdge: {minEdge} | maxEdge: {maxEdge} <br/> */}
          minEdge (reducer): {dlSliderAttr.minEdge} | maxEdge (reducer): {dlSliderAttr.maxEdge} <br/>
        {/* <button className='button randomize' aria-label="Randomize name" onClick={() => dispatch(randomize())}>Randomize</button> */}
        <div className = "attrIndic">{dlSliderAttr.valueName}</div>
        <br/>
        <div className="slider">
          <div className="progress"></div>
        </div>
        <div className="range-input">
          <Input type="range" className="range-min" min={String(dlSliderAttr.minEdge)} max={String(dlSliderAttr.maxEdge)} step={String(doubleSliderStep)}
            value={dlSliderAttr.minThreshold}
            onChange={e => 
              // setDoubleSliderMin(Math.min(maxEdge, parseInt(e.target.value)))
              dispatch(changeMinThreshold(parseInt(e.target.value)))
            }
          />
          <Input type="range" className="range-max" min={String(dlSliderAttr.minEdge)} max={String(dlSliderAttr.maxEdge)} step={String(doubleSliderStep)}
            value={dlSliderAttr.maxThreshold}
            onChange={e => 
              // setDoubleSliderMax(Math.max(minEdge, parseInt(e.target.value)))
              dispatch(changeMaxThreshold(parseInt(e.target.value)))
            }
            // onMouseUp={e => console.log("mouse going up, with e: ",e.target.value)} // works, but I suppose wouldn't work with phone applications... I would prefer to avoid using this.
          />
        </div>
        <br/>
        <div className="communicateSlider">
          The double slider selection is {dlSliderAttr.minThreshold} and {dlSliderAttr.maxThreshold}.
        </div>

      </div>
    </>
  );

}

export default DoubleSlider;